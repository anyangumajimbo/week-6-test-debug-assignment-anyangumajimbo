const express = require('express');
const app = express();

app.use(express.json());

// Basic routes for testing
app.get('/api/posts', (req, res) => {
    res.json([]);
});

app.post('/api/posts', (req, res) => {
    res.status(201).json({ _id: 'test-id', ...req.body });
});

app.get('/api/posts/:id', (req, res) => {
    res.json({ _id: req.params.id, title: 'Test Post' });
});

app.put('/api/posts/:id', (req, res) => {
    res.json({ _id: req.params.id, ...req.body });
});

module.exports = app; 