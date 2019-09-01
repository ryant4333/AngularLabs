const fs = require('fs');

module.exports = (req, res) => {
    let u = req.body.username;
    let p = req.body.pwd;
    c = u + p;
    console.log(c);

    fs.readFile('./api/auth/users.json', 'utf8', (err, data) => {
        if (err) throw err;
        let userArray = JSON.parse(data);
        console.log(userArray);
        let i = userArray.findIndex(user => 
            ((user.username == u) && (user.pwd == p)));
        if (i == -1) {
            console.log("NOT MATCHING!");
            res.send({ "ok": false })
        } else {
            console.log(userArray[i]);
            res.send({ "ok": true });
        }
    });
}