var express = require('express')
, jsdom = require('jsdom')
, request = require('request')
, url = require('url')
, app = express(); 

app.get('/', function(req, res) {
  res.send('hello');
});

var uri = 'http://en.wikipedia.org/w/api.php?action=query&list=allimages&ailimit=5&aifrom=#{id}&aiprop=url&format=json';
app.get('/search/:search', function(req, res) {
  var search_query = req.params.search;
  request({uri: uri.replace('#{id}', search_query)}, function(err, response, body){
    // start writing your custom code!
    var parsed_body = JSON.parse(body);
    url = parsed_body["query"]["allimages"][0]["url"];
    console.log(url);
    res.redirect(url);
  });
});


app.listen('8888');
console.log('Server running on port 8888');
