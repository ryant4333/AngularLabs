const fs = require('fs');

module.exports = (req, res) => {

    fs.readFile('./api/auth/groups.json', 'utf8', (err, groupString) => {
        if (err) throw err;
        groupJson = JSON.parse(groupString)
        res.send({"groupsData":groupJson})
    })
}