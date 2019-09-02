const fs = require('fs');

module.exports = (req, res) => {
    let u = req.body.username;
    let e = req.body.email;
    let p = req.body.pwd;
    let newUser = {
        username: u,
        email: e,
        pwd: p
    };

    let data = JSON.stringify(newUser);
    fs.writeFile('./api/auth/users.json', data, (err) => {
        if (err) throw err;
        console.log("data written to file");
        res.send({ "gen": true });
    });
}