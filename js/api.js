var ctx = document.getElementById('canvas-compare').getContext('2d');

var bar1 = {
  xFrom : 100,
  yFrom : 60,
  height : 40,
  colorBar : 'Red',
  xFromText : 10,
  yFromText : 85,
  colorText : 'Black' 
}

var bar2 = {
  xFrom : 100,
  yFrom : 120,
  height : 40,
  colorBar : 'Green',
  xFromText : 10,
  yFromText : 145,
  colorText : 'Black'
}

function getStateName(stateNumber){
  var states = {
    '06' : 'California',
    '12' : 'Florida',
    '15' : 'Hawaii', 
    '20' : 'Kansas',
    '29' : 'Missouri',
    '56' : 'Wyoming'
  };
  return states[stateNumber];
}

function getStateData(state1, state2){
  //console.log('begin getStateData');
  var vKey = '98c792ff74119a20565d7a84335db06fb6e0f679';
  var vGet = 'P0010001';
  var vFor = 'state:' + state1 + ',' + state2;
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
     console.log(result[1][1]);
     // here call the function to draw the two columns
     drawPopBars(result, state1, state2);

  })
  .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
      console.log('in the fail');
      console.log(jqXHR);
  });
}

function setSquareText(font, fillStyle, fillText, x, y){
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.fillText(fillText,x,y);
}

function colorSquare(color, x, y, width, height){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width , height);

}  

function drawPopBars(result,state1,state2){
  var font = '1rem Arial';
  var fillStyle = 'Black';
  var fillText;
      for (value of result){
      if (value[1] == state1 && value[0] != 'P0010001'){
        //console.log('state1 ' + value[1] + 'pop ' + value[0]);
        fillText = getStateName(state1);
        setSquareText(font, fillStyle, fillText,bar1.xFromText,bar1.yFromText);
        color = 'Red';
        colorSquare(bar1.colorBar, bar1.xFrom, bar1.yFrom, Math.round(value[0]/50000), bar1.height);
        fillText = '(Pop: ' + (value[0]/1000000) + ' M)';
        setSquareText(font, fillStyle, fillText,Math.round(value[0]/50000)+110,bar1.yFromText);
      }
      if (value[1] == state2 && value[0] != 'P0010001'){
        //console.log('state2 ' + value[1] + 'pop ' + value[0]);
        fillText = getStateName(state2);
        setSquareText(font, fillStyle, fillText,bar2.xFromText,bar2.yFromText);
        color = 'Green';
        colorSquare(bar2.colorBar, bar2.xFrom, bar2.yFrom, Math.round(value[0]/50000), bar2.height);
        fillText = '(Pop: ' + (value[0]/1000000) + ' M)';
        setSquareText(font, fillStyle, fillText,Math.round(value[0]/50000)+110,bar2.yFromText);
      }
     }

}

$(function(){
 	console.log('ready');
  //console.log(getAjaxRequest());
  var color = '#ECECEC';
  colorSquare(color, 0, 0, 1200, 450);
  var selected1 = $(this).find("select[name='states1']").val();
  var selected2 = $(this).find("select[name='states2']").val();
  getStateData(selected1, selected2);
  // register listener for the submit
  $('.choose-form').submit( function(e){
    e.preventDefault();
    ctx.clearRect(0,0,1000,450);
    colorSquare(color, 0, 0, 1200, 450);
    var selected1 = $(this).find("select[name='states1']").val();
    var selected2 = $(this).find("select[name='states2']").val();
    getStateData(selected1, selected2);
    //console.log('statename ' + getStateName(selected1));
  });
});
