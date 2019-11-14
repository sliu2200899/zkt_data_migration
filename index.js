const express = require('express')
const app = express()
const port = 4000

require(__dirname + '/bootstrap')(app, express);

const routes = ghrequire('routes')(app);

const http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket) {
    console.log("connected");
    gh.io_socket = socket;
});

MongoClient.connect(config.get('mongodb.url'), (err, client) => {
    if(err) {
        console.log("Mongodb connection failed");
        return;
    }

    gh.mongo = client.db(config.get('mongodb.dbname'));

    http.listen(3000, () => {
        console.log("Server running on port 3000");
    });
});















const fs = require('fs');

const bodyParser = require('body-parser')

//set all responses to text/plain
app.use(function (req, res, next) {
    res.type("text/plain")
    next()
})
app.use(bodyParser.text());




//TODO: device polls the server for commands
app.get("/iclock/getrequest", (req, res)=>{
    const serialNumber = req.query.SN; 
    //DUMMY for now
    res.send("C::")
})

//TODO: Device reports the result of a command to the server
app.post("/iclock/devicecmd", (req, res)=>{
    const serialNumber = req.query.SN; 
    //DUMMY for now
    res.send("C::")
})



app.listen(port, ()=>console.log(`Server started on port ${port}`));
