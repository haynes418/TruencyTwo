// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testingAgainPt3', {
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

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Data Storage App!');
});

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        let jsonData;

        if (req.body && Array.isArray(req.body.data)) {
            jsonData = req.body.data;
        } else {
            return res.status(400).send({ error: 'Please upload an Excel file or provide valid JSON data.' });
        }

        // Replace existing data
        await DataModel.findOneAndUpdate(
            {}, // Filter: empty object = first document found
            { data: jsonData }, // Replace data field
            { upsert: true, new: true } // Create if not found
        );

        res.status(201).send({
            message: 'Data replaced successfully',
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

app.get('/health', async (req, res) => {
    const mongoState = mongoose.connection.readyState;
    const isConnected = mongoState === 1; // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting

    res.status(200).send({
        server: 'ok',
        db: isConnected ? 'connected' : 'disconnected',
        dbStatusCode: mongoState,
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
