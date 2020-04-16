module.exports = function(io) {
  var numServers = 0;
  let connectedServers = {};
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
//   io.on("connection", function(socket) {
//     var addedServer = false;

//     socket.on("message", data => {
//       socket.broadcast.emit("message", {
//         servername: socket.servername,
//         message: data
//       });
//     });
//     app.post(
//       "/serverrequest",
//       passport.authenticate("jwt", { session: false }),
//       (req, res) => {
//         socket.emit("serverrequestbukidnon", "test", function(data) {
//           // if(params.reciever in connectedServers){
//           //   const recieverSocket = connectedServers[params.reciever].id
//           //   socket.to(recieverSocket).emit('serverrequest',params.sender, params);
//           // }
//           res.sendStatus(data);
//         });
//       }
//     );
//     socket.on("serverrequest", function(params) {
//       if (params.reciever in connectedServers) {
//         const recieverSocket = connectedServers[params.reciever].id;
//         socket.to(recieverSocket).emit("serverrequest", params.sender, params);
//       }
//     });

//     socket.on("serverresponse", function(sender, data) {
//       if (sender in connectedServers) {
//         const senderSocket = connectedServers[sender].id;
//         socket.to(senderSocket).emit("serverresponse", data);
//       }
//     });

//     socket.on("checkinserveronline", function(serverid) {
//       if (addedServer) return;

//       socket.servername = serverid;
//       ++numServers;
//       addedServer = true;
//       connectedServers = addServer(connectedServers, socket);
//       console.log(socket.servername + " is ONLINE");
//       socket.emit("login", {
//         numServers: numServers
//       });
//       socket.broadcast.emit("serveronline", {
//         servername: socket.servername,
//         numServers: numServers
//       });
//     });

//     socket.on("disconnect", () => {
//       if (addedServer) {
//         --numServers;
//         console.log(socket.servername + " is OFFLINE");
//         connectedServers = removeServer(connectedServers, socket.servername);
//         socket.broadcast.emit("serveroffline", {
//           servername: socket.servername,
//           numServers: numServers
//         });
//       }
//     });
//   });

  // app.get('/', function (req, res) {
  //   res.sendFile(__dirname + '/index.html');
  // });

  function addServer(serverList, socket) {
    let newList = Object.assign({}, serverList);
    newList[socket.servername] = socket;
    return newList;
  }

  function removeServer(serverList, servername) {
    let newList = Object.assign({}, serverList);
    delete newList[servername];
    return newList;
  }
};

// socket.on('serverrequest', function (reciever, sender, params,fn) {
//   console.log("SERVER");
//   if(reciever in connectedServers){
//     const recieverSocket = connectedServers[reciever].id
//     socket.to(recieverSocket).emit('questionbukidnon', params, function (answer) {
//       fn(answer);
//     });
//   }
// });

// socket.on('serverrequest', function (reciever, sender, params) {
//   if(reciever in connectedServers){
//     const recieverSocket = connectedServers[reciever].id;
//     const newroom = recieverSocket+reciever+sender;
//     socket.join(newroom);
//     socket.to(newroom).emit('serverrequest',sender, params);
//   }
// });

//  socket.on('serverresponse', function (sender, data) {
//   if(sender in connectedServers){
//     const senderSocket = connectedServers[sender].id
//     socket.to(senderSocket).emit('serverresponse', data);
//   }
// });
