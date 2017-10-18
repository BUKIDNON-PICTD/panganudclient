

var app = require('express')();
var server = require('http').Server(app);
var request = require('request');
var io = require('socket.io')(server);
var iocilent = require('socket.io-client')
var cloud = iocilent.connect('https://tagabukid-panganud-aguilarufino.c9users.io:8080');
var lguid = '059';
server.listen(3000,function(){
	console.log('SERVER RUNNING AT PORT 3000');
	//log in to cloud if online
	cloud.emit('serveronline', '059');

	cloud.on('serverrequest'+lguid, function(data,fn){
		request.post({
			url:'http://localhost:8072/osiris3/json/etracs25/'+data.service+'.'+data.method,
			json:data
		},function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		       console.log(body); 
		       fn(body);
		     }
		});

		
	});


});

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function (socket) {
//   console.log('CONNECTED');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });