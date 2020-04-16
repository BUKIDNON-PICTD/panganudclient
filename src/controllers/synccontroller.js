var request = require("request");
const apiurl = global.gConfig.etracsserver + "/osiris3/json/etracs25/";

exports.serverrequest = (req, res) => {
  console.log(req.body);
  if (req.body.requesttype === "post") {
    request.post(
      {
        url: apiurl + req.body.servicename + "." + req.body.methodname,
        json: req.body.params
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if (typeof body === "object" && body !== null) {
            return res.status(200).json({
              data: body
            });
          } else {
            console.log("Error in Parsing Response");
            return res.status(500).send(body)
          }
        } else {
          console.log("Error in Parsing Response");
          return res.status(500).send(body)
        }
      }
    );
  } else {
    request.get(
      {
        url: apiurl + req.body.servicename + "." + req.body.methodname,
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if (typeof body === "object" && body !== null && body !== undefined) {
            return res.status(200).json({
              data: body
            });
          } else {
            console.log("Error in Parsing Response");
            return res.status(500).send(body)
          }
          // try {
          //   console.log(body);
          //   result = JSON.parse(body);
          //   return res.status(200).json({
          //      data: body
          //   });
          // } catch(e) {
          //   console.log("Error in Parsing Response");
          //   return null;
          // }
        } else {
          console.log("Error in Parsing Response");
          return res.status(500).send(body)
        }
      }
    );
  }
};

exports.getmasterfiles = (req, res) => {
  console.log(req.body);
  if (req.body.requesttype === "post") {
    request.post(
      {
        url: apiurl + req.body.servicename + "." + req.body.methodname,
        json: req.body.params
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if (typeof body === "object" && body !== null) {
            return res.status(200).json({
              data: body
            });
          } else {
            console.log("Error in Parsing Response");
            return res.status(500).send(body)
          }
        } else {
          console.log("Error in Parsing Response");
          return res.status(500).send(body)
        }
      }
    );
  } else {
    request.get(
      {
        url: apiurl + req.body.servicename + "." + req.body.methodname,
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if (typeof body === "object" && body !== null && body !== undefined) {
            return res.status(200).json({
              data: body
            });
          } else {
            console.log("Error in Parsing Response");
            return res.status(500).send(body)
          }
          // try {
          //   console.log(body);
          //   result = JSON.parse(body);
          //   return res.status(200).json({
          //      data: body
          //   });
          // } catch(e) {
          //   console.log("Error in Parsing Response");
          //   return null;
          // }
        } else {
          console.log("Error in Parsing Response");
          return res.status(500).send(body)
        }
      }
    );
  }
};
