var express = require('express');
var http = require('http');
var philipsHueID = '/api/newdeveloper/lights/';

var server = express();
server.use('/', express.static(__dirname + '/'));

server.get('/switch', function(req, res, next) {

	var givenAmt = req.query.amount;
	var hueCode = 100000;
	
	console.log("Validated the amount");
	
	if(givenAmt){
		console.log("Inside block : Validated the amount " + givenAmt);
		debugger;
		if(givenAmt <= 100){
			hueCode = 10000;
		}
		else if(givenAmt <= 10000){
			hueCode = 35136;
		}
		else if(givenAmt <= 100000){
			hueCode = 65136;
		}
	}
	else{
		console.log("Null Value");
	}

	var querystring = require('querystring');
    var data = '{"on":'+req.query.toggle+', "hue" : '+hueCode+'}';
	var options = {
		host: 'localhost',
		port: 8000,
		path: philipsHueID+req.query.id+'/state',
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(data)
		}
	};

	var hueReq = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log("body: " + chunk);
		});
	});
	hueReq.write(data);
	hueReq.end();
	res.sendStatus(200)
});

server.listen(3000, function () {
  console.log('Server is listening on port 3000.')
})
