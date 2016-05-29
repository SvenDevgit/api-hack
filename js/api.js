//$(document).ready(function(){}); 
//var request = require('superagent');
/*
var request = {};

var clientID = '41160e94459ee82b5116',
    clientSecret = '7a0f6a60ad9f0aea01e95ad648c41404',
    apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
    xappToken;

request
  .post(apiUrl)
  .send({ client_id: clientID, client_secret: clientSecret })
  .end(function(res) {
    xappToken = res.body.token; 
    console.log(xappToken);
  });
*/

var ctx = document.getElementById('compare-canvas').getContext('2d');

function getAjaxRequest(){
  console.log('begin getAjaxRequest');
  var vKey = '98c792ff74119a20565d7a84335db06fb6e0f679';
  //var vGet = 'PCT012A015,PCT012A119'; 
  var vGet = 'P0010001';
  var vFor = 'state:01, 02';
  var apiUrl = 'http://api.census.gov/data/2010/sf1'

  $.ajax({
    url: apiUrl,
    data: ({ key: vKey, get: vGet , for: vFor }),
    //dataType: 'json',//use jsonp to avoid cross origin issues
    type: 'GET'
    })
  .done(function(result){ //tis waits for the ajax to return with a succesful promise object
     console.log('in the done');
     console.log(result);
  })
  .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
      console.log('in the fail');
      console.log(jqXHR);
  });

  console.log('end getAjaxRequest');
}

function colorSquare(){
  ctx.fillStyle = 'Red';
  ctx.fillRect(10, 10, 100 , 100);
}  

$(function(){
 	console.log('ready');
    console.log(getAjaxRequest());
    colorSquare();
    

});
