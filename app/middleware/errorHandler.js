const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Check for specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Default to 500 server error
    res.status(500).json({ error: 'Something went wrong!' });
  };
  
  module.exports = errorHandler;