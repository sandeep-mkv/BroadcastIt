/**
 * Module dependencies.
 */

var express = require('express');
var io = require('socket.io');

var app = module.exports = express.createServer();

var io = io.listen(app);

var browsers = [];
// Configuration

io.set('log level', 1);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 1); 
});

// Turn off annoying polling
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});
// Routes

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

var port = process.env.PORT || 4000;
app.listen(port);

io.sockets.on('connection', function(socket) {
	socket.on('client_connected', function(browser) {
	              browser.id = socket.id;
	              browsers.push(browser);
                      console.log('connected'+browser.id);
	              socket.emit("accepted", browser);
	});
	
	socket.on('broadcast', function(url) {
                      console.log('broadcast'+url);
	              socket.broadcast.emit("open_url", url);
	});

});
