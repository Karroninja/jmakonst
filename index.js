"use strict";

const express = require('express');
const bodyParser = require("body-parser")
// Create our express app
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route
// const api = require("./routes/api.js");
const api = require(path.join(__dirname, 'routes', 'api.js'));
app.use(api);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Create a route to serve the index.html file
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create a route to serve the about.html file
app.get('/about', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Create a route to serve the press.html file
app.get('/press', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'press.html'));
});

// Create a route to serve the 404.html file
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404-page.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})