var express = require('express')
, jsdom = require('jsdom')
, request = require('request')
, url = require('url')
, app = express(); 

app.get('/', function(req, res) {
  res.send('hello');
});

var uri = 'http://en.wikipedia.org/w/api.php?action=query&list=allimages&ailimit=5&aifrom=#{id}&aiprop=url&format=json';

var imdb_uri = 'http://www.omdbapi.com/?t=#{title}&y=#{year}'


process.on('uncaughtException', function (exception) {
  console.log("Error");
  console.log(exception);
});


app.get('/search/:title', function(req, res) {
  var title_query = encodeURIComponent(req.params.title);
  console.log(title_query);

  //var year_query = encodeURIComponent(req.params.year);
  //console.log(year_query);

  //imdb_uri = imdb_uri.replace('#{title}', title_query).replace('#{year}', year_query)
  //console.log(imdb_uri);

  uri = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + title_query + '&safe=active';
  console.log(uri);

  request({uri: uri}, function(err, response, body){
    // start writing your custom code!
    var parsed_body = JSON.parse(body);
    url = parsed_body['responseData']['results'][0]['unescapedUrl'];
    console.log(url);
    res.redirect(url);
  });
});


app.listen('8888');
console.log('Server running on port 8888');

