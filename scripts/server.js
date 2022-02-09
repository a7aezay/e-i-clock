const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use('/', express.static(path.join(__dirname, '..')));
app.listen(process.env.port || 3300);

console.log('Running at Port 3300');