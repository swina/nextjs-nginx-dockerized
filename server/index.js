const express = require('express');
const path = require('path');
let cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

const routes = require('./routes');


app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(port, '0.0.0.0', (err) => {
  err ? console.log(err) : console.log(`Server is listening on port ${port}`);
})