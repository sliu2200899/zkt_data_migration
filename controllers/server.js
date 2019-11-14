const response = ghrequire('services/response');

module.exports.dashboard = (req, res) => {
	
    const data = fs.readFileSync("devicelog.txt");
    res.send(data);
};

module.exports.initial = (req, res) => {
	
	const moment = require('moment');

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
TransFlag=TransData AttLog	OpLog	EnrollUser	EnrollFp	ChgUser	ChgFP	AttPhoto	EnrollFACE
Realtime=1
Encrypt=0
TimeZone=-08:00
Timeout=60
SyncTime=0
ServerVer=IIS5+
ATTLOGStamp=0
OPERLOGStamp=0
ATTPHOTOStamp=0
`
    const logLine = `${deviceSerialNumber} initialization...\n`
    fs.appendFile('devicelog.txt', logLine, function (err) {
        if (err) {
            log.println("Error initializing clocks with server: ", err);
            return;
        }
        res.send(responseText.trim())
    });
};

module.exports.dataSync = (req, res) => {
	
	// gh.mongo.collection("GhServer").find().toArray((err, servers) => {
	// 	if(err) {
	// 		response.error(res);
	// 	}
		
	// 	res.render("main/dashboard.html", { servers: servers });
	// });

	logData(req,()=>{
        res.send("OK")
    });
};


const logData = (req, onSuccess)=>{
    const serialNumber  = req.query.SN
    const table = req.query.table
    const dataRow = req.query.Stamp
    const bodyContent = req.body
    //TODO: Extracts parts of the dataRow and save in the database
    
    const logLine = `${serialNumber} ${table} ${dataRow}\n ${bodyContent}\n`

    fs.appendFile('devicelog.txt', logLine, function (err) {
        if (err) {
            log.println("Error logging data: ", err)
            return
        }
        onSuccess();
    });
}
