var http = require('http');

var user = {
  github: 'https://github.com/Enriqe/API-Challenge',
  email: 'enrique.marr@gmail.com',
};

var userString = JSON.stringify(user);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': userString.length
};

var options = {
  host: 'challenge.code2040.org',
  path: '/api/register',
  method: 'POST',
  headers: headers
};

// Setup the request.  The options parameter is
// the object we defined above.
var req = http.request(options, function(res) {
  res.setEncoding('utf-8');

  var responseString = '';

  res.on('data', function(data) {
    responseString += data;
  });

  res.on('end', function() {
    console.log(responseString);
    //{"result":"S5sRvIrSAH"}
  });
});

req.on('error', function(e) {
  // TODO: handle error.
});

req.write(userString);
req.end();