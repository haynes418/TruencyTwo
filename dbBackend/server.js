// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017', {
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

const DataModel = mongoose.model('Data', dataSchema);

const app = express();
const port = 3000;

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

// Ensure the 'uploads' directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Data Storage App!');
});

// Route to store Excel file and save data to MongoDB
app.post('/upload', upload.single('file'), (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).send({ error: 'Please upload a file.' });
    }

    // Get the file path
    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    // Read the uploaded Excel file
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Read the first sheet
        const sheet = workbook.Sheets[sheetName];

        // Convert the Excel sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Store the parsed data in MongoDB
        const newData = new DataModel({
            data: jsonData
        });

        newData.save()
            .then(() => {
                // Optionally, you can delete the uploaded file after processing
                fs.unlinkSync(filePath);
                res.status(201).send({
                    message: 'File uploaded and data stored successfully',
                    data: jsonData
                });
            })
            .catch((error) => {
                res.status(500).send({ error: 'Failed to store data in MongoDB' });
            });
    } catch (error) {
        res.status(500).send({ error: 'Failed to process Excel file' });
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
