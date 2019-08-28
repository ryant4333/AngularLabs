const fs = require('fs');

module.exports = (req, res) {
    let userobj = {
        "userid": req.body.userid,
        "username": req.body.username,
        "userbirthdate": req.body.userbirthdate,
        "userage": req.body.userage
    }
    let uArray = [];
    fs.readFile('../auth/extendedUsers.json', 'utf8', (err, data) => {
        if (err) throw err;
        uArray = JSON.parse(data);
        uArray.path(userobj);
        console.log(userobj);

        uArrayjson = JSON.stringify(uArray);
        fs.writeFile('../auth/extendedUsers.json', uArrayjson, 'utf-8', (err) => {
            if (err) throw err;
            res.send(uArray);
        });
    });
}