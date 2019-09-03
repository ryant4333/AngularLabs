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
app.post('/getUsers', require('./api/router/getUsers'));
app.post('/getGroups', require('./api/router/getGroups'));
app.post('/addGroup', require('./api/router/addGroup'));
app.post('/removeGroup', require('./api/router/removeGroup'));
app.post('/addChannel', require('./api/router/addChannel'));
app.post('/channelAddUser', require('./api/router/channelAddUser'));

app.post('/changeRole', require('./api/router/changeRole'));