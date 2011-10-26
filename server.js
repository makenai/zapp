/*

  Z A P = Zappos Api Proxy Pipelien
  
*/

var express = require('express'),
  http = require('http'),
  app = express.createServer();


API_KEY = 'a24b50f373803eb6b205cf89eee94df8e427ef49'
    
// Image proxy thing    
app.get('/img/:styleId-:type-:recipe', function(req, res){

  var uri = {
    host: 'api.zappos.com',
    port: 80,
    path: '/Image?key=' + API_KEY + '&styleId=' + req.params.styleId + '&type=' + req.params.type + '&recipe=' + req.params.recipe
  };

  var data = '';
  http.get(uri, function(get_res) {
    get_res.on('data', function(chunk) {
      data += chunk;
    }).on('error', function(e) {
      console.log( "Got error: " + e.message );
    }).on('end', function(chunk) {
      var images = JSON.parse( data );
      var image = images[ req.params.styleId ][0].filename;
      if ( image ) {
        res.redirect( image );
      }
    });
  });

});

app.listen(80);
console.log('Express server started on port %s', app.address().port);