const fs = require('fs');

module.exports = (req, res) => {
    let u = req.body.Rusername;
    let r = req.body.Rrole;

    fs.readFile('./api/auth/users.json', 'utf8', (err, jsonString) => {
        if (err) throw err;
        let data = JSON.parse(jsonString)

        let i = data.findIndex(user => 
            (user.username == u));
        if (i != -1) {
            console.log("User already exists")
            res.send({ "gen": false })
            return
        }
        
        data[i].role = r;
        
        data = JSON.stringify(data, null, 2)


        fs.writeFile('./api/auth/users.json', data, (err) => {
            if (err) throw err;
            console.log("data written to file");
            res.send({ "gen": true });
        });
    })
}