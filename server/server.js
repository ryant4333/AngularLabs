const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '../dist/week4/')));
console.log(__dirname);

const http = require("http").Server(app);

const server = http.listen(3000, () => {
    console.log("server on port: 3k");
});

app.post('/login', require('./api/router/postLogin'));
app.post('/addUser', require('./api/router/addUser'));