var http = require('http');
 
var token = 'S5sRvIrSAH'
 
function reverse(str) {
  return str.split('').reverse().join('');
}
 
function createOptions(method, content) {
  return {
    host: 'challenge.code2040.org',
    path: '/api/' + method,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': content.length
    }
  }
}
 
function sendPOST(data, method, callback) {
  var content = JSON.stringify(data);
  var options = createOptions(method, content);
 
  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');
   
    var responseString = '';
    res.on('data', function(data) {
      responseString += data;
    });
   
    res.on('end', function() {
      var resultObject = JSON.parse(responseString);
      callback(resultObject.result);
    });
  });
 
  req.on('error', function(e) {
    console.log(e);
  });
 
  req.write(content);
  req.end();
}
 
// send post request to get the string, after that is finished, reverse the string
// and send another post request to validate the string,
// after that is finished, log the result
sendPOST({ token: token }, 'getstring', function(result) {
  var reversedString = reverse(result);
  sendPOST({ token: token, string: reversedString }, 'validatestring', function(result) {
    console.log(result);
  });
});