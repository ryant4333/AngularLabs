const fs = require('fs');

module.exports = (req, res) => {

    fs.readFile('./api/auth/users.json', 'utf8', (err, jsonString) => {
        if (err) throw err;
        jsonParse = JSON.parse(jsonString)
        res.send({"data": jsonParse})
    })
}

