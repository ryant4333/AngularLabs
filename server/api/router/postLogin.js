const fs = require('fs');

module.exports = (req, res) => {
    let u = req.body.username;
    let p = req.body.pwd;

    fs.readFile('./api/auth/users.json', 'utf8', (err, data) => {
        if (err) throw err;
        let userArray = JSON.parse(data);

        
        let i = userArray.findIndex(user => 
            ((user.username == u) && (user.pwd == p)));
        if (i == -1) {
            console.log("NOT MATCHING!");
            res.send({ "ok": false })
        } else {
            res.send({ "ok": true, "role": userArray[i].role });
        }
    });
}