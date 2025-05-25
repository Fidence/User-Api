const express = require('express');
const bodyParser = require('body-parser');
const { notFoundHandler, errorHandler } = require('./middleware');
const router = require('./route'); // Assuming route.js exports the router



const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});