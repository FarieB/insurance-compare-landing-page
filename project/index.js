const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use routes
const insuranceRoutes = require('./routes/insuranceRoutes');
const authRoutes = require('./routes/auth');
const preferencesRoutes = require('./routes/preferences');
const protectedRoutes = require('./routes/protected'); // Import protected routes

// Use routes
app.use('/api/insurance', insuranceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/protected', protectedRoutes); // Mount protected routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// 404 Not Found middleware
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

