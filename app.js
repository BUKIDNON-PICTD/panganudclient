
var app = require('express')();
var server = require('http').Server(app);
var request = require('request');
var io = require('socket.io')(server);
var iocilent = require('socket.io-client');
var lguid = 'bukidnon';
var cloud = iocilent.connect('https://tagabukid-panganud-aguilarufino.c9users.io:8080');

server.listen(3000,function(){
	console.log('SERVER RUNNING AT PORT 3000 WITH LGUID = ' + lguid);
	//log in to cloud if online
	cloud.emit('serveronline', lguid);

	cloud.on('serverrequest'+lguid, function(data,fn){
		request.post({
			url:'http://localhost:8072/osiris3/json/etracs25/TagabukidHRMISDashReportService.getCountByQuery',
			json:data
		},function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		       console.log(body); 
		       fn(body);
		     }
		});
	});
	
	cloud.on('servertestdata'+lguid, function(data,fn){
		console.log("FETCH DATA FROM "+ lguid +" USING SAMPLE PARAMETER = " + data.sampleparam);
	    console.log('SENDING DATA BACK TO PANGANUD SERVER');
		var sampledata = "HELLO " + data.sampleparam;
		fn(sampledata);
	});

	setInterval(function(){
		request.post({
			url:'http://localhost:8072/osiris3/json/etracs25/TagabukidHRMISDashReportService.getCountByQuery',
			json:[]
		},function (error, response, body) {
			if (!error && response.statusCode == 200) {
					// console.log(body); 
					// console.log(body[0].code);
					cloud.emit('Message', body);
				}
		});
	},10000);

	cloud.on('Message', (data) => {
		console.log('receive : ' + data);
	});

});

	// cloud.on('serverrequest'+lguid, function(data,fn){
	// 	request.post({
	// 		url:'http://localhost:8072/osiris3/json/etracs25/'+data.service+'.'+data.method,
	// 		json:data
	// 	},function (error, response, body) {
	// 	    if (!error && response.statusCode == 200) {
	// 	       console.log(body); 
	// 	       fn(body);
	// 	     }
	// 	});

		
	// });

	// cloud.on('serverrequest'+lguid, function(data,fn){
	// 	console.log("FETCH DATA FROM "+ lguid +" USING SAMPLE PARAMETER = " + data.sampleparam);
	//  console.log('SENDING DATA BACK TO PANGANUD SERVER');
	// 	var sampledata = "HELLO " + data.sampleparam;
	// 	fn(sampledata);
	// });


// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function (socket) {
//   console.log('CONNECTED');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });