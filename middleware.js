function notFoundHandler(req, res, next) {
    res.status(404).json({ error: 'Route not found' });
  }
  
  function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
  module.exports = {
    notFoundHandler,
    errorHandler
  };
  