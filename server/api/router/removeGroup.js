const fs = require('fs');

module.exports = (req, res) => {
    let delGroupName = req.body.groupName;
    

    fs.readFile('./api/auth/groups.json', 'utf8', (err, groupsString) => {
        if (err) throw err;
        let data = JSON.parse(groupsString)
        console.log("INITIAL: \n")
        console.log(data)

        //Check if group already exists
        let i = data.findIndex(group => 
            (group.groupName == delGroupName));
        if (i == -1) {
            console.log("Group does not exist")
            res.send({ "gen": false })
            return
        } else {
            data.splice(i, 1);
        }
        
        console.log("AFTER: \n");
        console.log(data)
        
        data = JSON.stringify(data, null, 2)


        fs.writeFile('./api/auth/groups.json', data, (err) => {
            if (err) throw err;
            console.log("New Group added to file");
            res.send({ "gen": true });
        });
    })
}