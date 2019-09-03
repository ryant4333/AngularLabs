const fs = require('fs');

module.exports = (req, res) => {
    let newChannelName = req.body.channelName;
    let parentGroup = req.body.parentName;
    let newChannel = {
        channelName: newChannelName,
        users: []
    };

    console.log("NEW NAME: " + newChannelName)
    console.log("PARENT: " + parentGroup)

    fs.readFile('./api/auth/groups.json', 'utf8', (err, groupsString) => {
        if (err) throw err;
        let data = JSON.parse(groupsString)

        //Check if group already exists
        let i = data.findIndex(group => 
            (group.groupName == parentGroup));
        if (i == -1) {
            console.log("Group not found")
            res.send({ "gen": false })
            return
        } else {
            console.log(data[i])
            // let k = data[i].findIndex(channel => 
            //     (channel.channelName == newChannelName));
            // if (k != -1) {
            //     console.log("Channel already exists")
            //     res.send({ "gen": false})
            //     return
            // }
        }
        console.log(data[i])

        data[i].channels.push(newChannel)
        
        data = JSON.stringify(data, null, 2)


        fs.writeFile('./api/auth/groups.json', data, (err) => {
            if (err) throw err;
            console.log("New Group added to file");
            res.send({ "gen": true });
        });
    })
}