var http = require('http');

var stringToken = {
  token: 'S5sRvIrSAH'
};

var tokenString = JSON.stringify(stringToken);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': tokenString.length
};

var options = {
  host: 'challenge.code2040.org',
  path: '/api/getstring',
  method: 'POST',
  headers: headers
};

var reversedString = '', stringToReverse = '';

// Request string to reverse, and reverse it when request is done
var req = http.request(options, function(res) {
  res.setEncoding('utf-8');

  var responseString = '';

  res.on('data', function(data) {
    responseString += data;
  });

  res.on('end', function() {
    var resultObject = JSON.parse(responseString);
    stringToReverse = resultObject.result;
    reversedString = stringToReverse.split('').reverse().join('');

    // After doing the request and reversing the string,
    // now it is time to send it back

    var  reversedStringAndToken= {
      token: 'S5sRvIrSAH',
      string: reversedString
    };

    var stringToken = JSON.stringify(reversedStringAndToken);

    var headers2 = {
      'Content-Type': 'application/json',
      'Content-Length': stringToken.length
    };

    var options2 = {
      host: 'challenge.code2040.org',
      path: '/api/validatestring',
      method: 'POST',
      headers: headers2
    };

    req2 = http.request(options2, function(res2) {
      res2.setEncoding('utf-8');

      var responseString = '';

      res2.on('data', function(data) {
        responseString += data;
      });

      res2.on('end', function() {
        var resultObject = JSON.parse(responseString);
        console.log(resultObject);
      });
    });

    req2.on('error', function(e) {
      // TODO: handle error.
    });

    req2.write(stringToken);
    req2.end();
  });
});

req.write(tokenString);
req.end();