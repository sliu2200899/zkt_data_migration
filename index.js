const express = require('express')
const app = express()
const port = 4000

const moment = require('moment')

const fs = require('fs');


//set all responses to text/plain
app.use(function (req, res, next) {
    console.log("Request: ", req)
    res.type("text/plain")
    next()
})

app.get("/", (req, res)=> {
    const data = fs.readFileSync("devicelog.txt")
    res.send(data)
})

//Load device settings from the server
app.get("/iclock/cdata", (req, res)=>{
    const deviceSerialNumber = req.query['SN'];
    const optionType = req.query['type'];

    if(optionType === 'time'){
        const timeString = moment().format('YYYY-MM-DDThh:mm:ssZ');
        const responseText = `Time=${timeString}`
        res.send(responseText);
        return;
    }

    //some dummy response for now
    const responseText = `
GET OPTION FROM:${deviceSerialNumber}
ErrorDelay=60
Delay=30
TransTimes=00:00;14:05
TransInterval=1
TransFlag=TransData AttLog	OpLog	EnrollUser	EnrollFP	ChgUser	ChgFP	AttPhoto	EnrollFACE
Realtime=1
Encrypt=0
TimeZone=-05:00
Timeout=60
SyncTime=0
ServerVer=IIS5+
ATTLOGStamp=0
OPERLOGStamp=0
ATTPHOTOStamp=0`
    fs.appendFile('registerlog.txt', responseText, function (err) {
        if (err) {
            log.println("Error register logging data: ", err)
            return
        }
        onSuccess();
    });
    res.send(responseText.trim())
})

//Device logs data in the server
app.post("/iclock/cdata", (req, res)=>{
    logData(req,()=>{
        res.send("OK")
    })
    //for now console log
})

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




const logData = (req, onSuccess)=>{
    const serialNumber  = req.query.SN
    const table = req.query.table
    const dataRow = req.query.Stamp
    //TODO: Extracts parts of the dataRow and save in the database
    
    const logLine = `${serialNumber} ${table} ${dataRow}\n`
    console.log(logLine);


    fs.appendFile('devicelog.txt', logLine, function (err) {
        if (err) {
            log.println("Error logging data: ", err)
            return
        }
        onSuccess();
    });

}

app.listen(port, ()=>console.log(`Server started on port ${port}`));
