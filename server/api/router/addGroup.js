const fs = require('fs');

module.exports = (req, res) => {
    let newGroupName = req.body.groupName;
    let newGroup = {
        groupName: newGroupName,
        channels: []
    };

    console.log(newGroup);

    fs.readFile('./api/auth/groups.json', 'utf8', (err, groupsString) => {
        if (err) throw err;
        let data = JSON.parse(groupsString)

        //Check if group already exists
        let i = data.findIndex(group => 
            (group.groupName == newGroupName));
        if (i != -1) {
            console.log("Group already exists")
            res.send({ "gen": false })
            return
        }
        
        data.push(newGroup)
        
        data = JSON.stringify(data, null, 2)


        fs.writeFile('./api/auth/groups.json', data, (err) => {
            if (err) throw err;
            console.log("New Group added to file");
            res.send({ "gen": true });
        });
    })
}