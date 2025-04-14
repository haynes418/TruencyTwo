// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const mongoose = require('mongoose');

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/testingAgainPt3', {
mongoose.connect('mongodb://199.109.80.16:27017/dataStore', {
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

//Review Section
const reviewSchema = new mongoose.Schema({
    link: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);


app.post('/reviews', async (req, res) => {
    const { link, rating, comment } = req.body;

    if (typeof link !== 'string' || typeof rating !== 'number' || typeof comment !== 'string') {
        return res.status(400).send({ error: 'Invalid input: link (string), rating (number), and comment (string) are required.' });
    }

    try {
        const newReview = new Review({ link, rating, comment });
        await newReview.save();
        res.status(201).send({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to add review' });
    }
});


app.get('/reviews', async (req, res) => {
    try {
        // Get all reviews, sorting by createdAt in descending order
        const reviews = await Review.find().sort({ createdAt: -1 });

        res.status(200).send({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to retrieve reviews' });
    }
});


//Click Tracking
const clickTrackingSchema = new mongoose.Schema({
    link: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 }
});

const ClickTracking = mongoose.model('ClickTracking', clickTrackingSchema);


app.post('/click', async (req, res) => {
    const { link } = req.body;

    if (typeof link !== 'string' || link.trim() === '') {
        return res.status(400).send({ error: 'A valid link must be provided.' });
    }

    try {
        const result = await ClickTracking.findOneAndUpdate(
            { link },
            { $inc: { clicks: 1 } },
            { upsert: true, new: true }
        );

        res.status(200).send({ message: 'Click count updated', tracking: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update click count' });
    }
});

app.get('/clicks', async (req, res) => {
    try {
        const trackingData = await ClickTracking.find().sort({ clicks: -1 });
        res.status(200).send({ tracking: trackingData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to retrieve click tracking data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
