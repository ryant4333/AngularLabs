const fs = require('fs');

module.exports = (req, res) => {
    let newUserName = req.body.nUserName;
    let parentChannel = req.body.parentChannel;
    let pGroup = req.body.parentGroup;

    console.log(req.body)
    

    fs.readFile('./api/auth/groups.json', 'utf8', (err, groupsString) => {
        if (err) throw err;
        let data = JSON.parse(groupsString)

        console.log(pGroup)

        
        //Check if group already exists
        let i = data.findIndex(group => 
            (group.groupName == pGroup));
        if (i == -1) {
            console.log("Group not found")
            res.send({ "gen": false })
            return
        }
        
        for (let j=0; j < data[i].channels.length; j++) {
            if (data[i].channels[j].channelName == parentChannel) {
                data[i].channels[j].users.push(newUserName);
                console.log("USER ADDED")
            }
        }

        data = JSON.stringify(data, null, 2)


        fs.writeFile('./api/auth/groups.json', data, (err) => {
            if (err) throw err;
            console.log("New Group added to file");
            res.send({ "gen": true });
        });
    })
}