// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testingAgain', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define a schema and model for storing data
const dataSchema = new mongoose.Schema({
    data: Array,  // Stores the parsed Excel data
    uploadedAt: { type: Date, default: Date.now },
});

const DataModel = mongoose.model('resourceData', dataSchema);

const app = express();
const port = 3000;

// ADD THIS
var cors = require('cors');
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set up storage for multer (store files in the 'uploads' folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    }
});

const upload = multer({ storage: storage });

// // Ensure the 'uploads' directory exists
// if (!fs.existsSync('uploads')) {
//     fs.mkdirSync('uploads');
// }

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Data Storage App!');
});

// Route to store Excel file OR raw JSON data in MongoDB
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        let jsonData;

        // Case 1: File upload
        if (req.file) {
            // const filePath = path.join(__dirname, 'uploads', req.file.filename);
            // const workbook = XLSX.readFile(filePath);
            // const sheetName = workbook.SheetNames[0]; // Read the first sheet
            // const sheet = workbook.Sheets[sheetName];

            // jsonData = XLSX.utils.sheet_to_json(sheet);

            // // Clean up uploaded file
            // fs.unlinkSync(filePath);
        }
        // Case 2: Raw JSON data in request body
        else if (req.body && Array.isArray(req.body.data)) {
            jsonData = req.body.data;
        }
        else {
            return res.status(400).send({ error: 'Please upload an Excel file or provide valid JSON data.' });
        }

        // Store the parsed or provided data in MongoDB
        const newData = new DataModel({ data: jsonData });
        await newData.save();

        res.status(201).send({
            message: 'Data stored successfully',
            data: jsonData
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to process data.' });
    }
});


// Route to retrieve stored data from MongoDB
app.get('/data', (req, res) => {
    DataModel.find()
        .then((data) => {
            return res.status(200).send({ data: data });
        })
        .catch((error) => {
            return res.status(500).send({ error: 'Failed to retrieve data from MongoDB' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
