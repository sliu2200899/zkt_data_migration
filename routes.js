const server = ghrequire('controllers/server');

module.exports = (app) => {
	
	app.get('/', server.dashboard);

	app.get('/iclock/cdata', server.initial);

	app.post('/iclock/cdata', server.dataSync);
};