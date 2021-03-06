const config = require("./config/config.js");
const express = require("express");
const app = require("./server");
const http = require("http");
const server = http.createServer(app);
// const server = require("http").Server(app);
// const request = require("request");
// const ioreq = require("socket.io-request");
const io = require("socket.io")(server);
require('./socket')(io);
const iocilent = require("socket.io-client");
const lguid = global.gConfig.lguid;
const cloud = iocilent.connect(global.gConfig.panganudcloudurl);
let connected = false;

// const routes = require("./src/routes/routes");
// app.use("/api", routes);

server.listen(
  process.env.PORT || 3000,
  process.env.IP || "0.0.0.0",
  function() {
    var addr = server.address();
    console.log("Panganud Client at ", addr.address + ":" + addr.port);
  }
);

cloud.emit("checkinserveronline", lguid);

cloud.emit("message", "Hello " + lguid);

// cloud.on('serverrequest', (data,fn) => {
// 	console.log(data);
// 	fn(data);
// });
cloud.on("serverrequest", function(data) {
  // console.log(data);
  if (data.reciever === lguid) {
    console.log("PROCESSING REQUEST FROM :" + data.sender);
    request.post(
      {
        url:
          "http://192.168.50.2:8070/osiris3/json/etracs25/" +
          data.servicename +
          "." +
          data.methodname,
        json: data
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("SENDING RESPONSE TO : " + data.sender);
          cloud.emit("serverresponse", {
            sender: lguid,
            reciever: data.sender,
            servicename: data.servicename,
            methodname: data.methodname,
            result: body
          });
          // fn(body);
        }
      }
    );
  } else {
    cloud.emit("serverresponse", data + " from: " + lguid);
    // fn(data + " from: " + lguid);
  }
});

// ioreq(cloud).response("serverrequest", function(data, res){ // method, handler

// 	if(data.reciever === lguid){
// 		console.log("PROCESSING REQUEST FROM :" + data.sender);
// 			request.post({
// 						url:'http://192.168.50.2:8070/osiris3/json/etracs25/' + data.servicename + '.' + data.methodname,
// 						json:data
// 			},function (error, response, body) {
// 					if (!error && response.statusCode == 200) {
// 						console.log('SENDING RESPONSE TO : ' +  data.sender)
// 						res({
// 							reciever : lguid,
// 							result : body
// 						});
// 					}
// 			});
// 	}else{
// 		res(data + " from: " + lguid);
// 		// fn(data + " from: " + lguid);
// 	}
// });

// cloud.on('serverrequestrufy', function (params,fn) {
// 	console.log("PROCESSING REQUEST FROM :" + params.sender);
// 	request.post({
// 		url:'http://192.168.50.2:8070/osiris3/json/etracs25/' + params.servicename + '.' + params.methodname,
// 		json:params
// 	},function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
// 			console.log('SENDING RESPONSE TO : ' +  params.sender)
// 			fn(body);
// 		}
// 	});
// });

// cloud.on('serverrequest', function (sender,params) {
// 	request.post({
// 		url:'http://192.168.50.2:8070/osiris3/json/etracs25/' + params.servicename + '.' + params.methodname,
// 		json:params
// 	},function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
// 			console.log('sending response to : ' +  sender)
// 			cloud.emit('serverresponse',sender,body);
// 		}
// 	});
// });

// setInterval(function(){
// 	request.post({
// 		url:'http://192.168.50.2:8070/osiris3/json/etracs25/FarmerProfileService.dash',
// 		json:[]
// 	},function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
// 				cloud.emit('dash', body);
// 			}
// 	});
// },10000);

cloud.on("login", data => {
  connected = true;
  console.log(data.numServers + " servers online");
});

cloud.on("serveronline", data => {
  console.log(data.servername + " is connected");
});

cloud.on("serveroffline", data => {
  console.log(data.servername + " is disconnected");
});

cloud.on("disconnect", () => {
  console.log("you have been disconnected");
});

cloud.on("message", data => {
  console.log("message from " + data.servername + " : " + data.message);
});

cloud.on("reconnect", () => {
  console.log("you have been reconnected");
  if (lguid) {
    cloud.emit("checkinserveronline", lguid);
  }
});

cloud.on("reconnect_error", () => {
  console.log("attempt to reconnect has failed");
});
// cloud.emit('serverrequest', 'bukidnon', {
// 	servicename	: 'FarmerProfileService',
// 	methodname	: 'getFarmersList',
// 	params		: {
// 		_start : 0,
// 		_limit : 1
// 	}
// },function(data){
// 	console.log(data);
// });

// cloud.on('remotecall', (data,fn) => {
// 	console.log(data);
// 	fn("TEST");
// });

//log in to cloud if online
// cloud.emit('checkinserveronline', lguid);

// cloud.on('requestdata'+lguid, function(data,fn){
// 	request.post({
// 		url:'http://192.168.50.2:8070/osiris3/json/etracs25/TagabukidHRMISDashReportService.getCountByQuery',
// 		json:data
// 	},function (error, response, body) {
// 	    if (!error && response.statusCode == 200) {
// 	       console.log(body);
// 	       fn(body);
// 	     }
// 	});
// });

// cloud.on('servertestdata'+lguid, function(data,fn){
// 	console.log("FETCH DATA FROM "+ lguid +" USING SAMPLE PARAMETER = " + data.sampleparam);
//     console.log('SENDING DATA BACK TO PANGANUD SERVER');
// 	var sampledata = "HELLO " + data.sampleparam;
// 	fn(sampledata);
// });

// setInterval(function(){
// 	request.post({
// 		url:'http://192.168.50.2:8070/osiris3/json/etracs25/TagabukidHRMISDashReportService.getCountByQuery',
// 		json:[]
// 	},function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
// 				// console.log(body);
// 				// console.log(body[0].code);
// 				cloud.emit('Message', body);
// 			}
// 	});
// },10000);

// cloud.on('serverrequest'+lguid, function(data,fn){
// 	request.post({
// 		url:'http://192.168.50.2:8070/osiris3/json/etracs25/'+data.service+'.'+data.method,
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
