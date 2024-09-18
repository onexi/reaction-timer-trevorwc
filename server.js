const express = require('express');
const bodyParser = require('body-parser');
const escape = require('escape-html');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;

let users = [];

// Serve static files (like app.js) from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.json());

// Serve the web page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/input', function (req, res) {
    const name = escape(req.body.name);
    const time = escape(req.body.time);

    // Add the user's result (you could save this to a database or file later)
    users.push({ name: name, time: time });
    
    // Send the updated list back as JSON
    res.json(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/users', (req, res) => {
    res.json(users);
});