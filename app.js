const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const resturantRoutes = require('./routes/resturant');
const errorHandler = require('./app/middleware/errorHandler');
const config = require('./config/app');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resturant', resturantRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Auth API is running...');
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

module.exports = app;