var ctx = document.getElementById('compare-canvas').getContext('2d');

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
  console.log('begin getStateData');
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

  console.log('end getStateData');
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
  var color;
  var font = '1rem Arial';
  var fillStyle = 'Black';
  var fillText;
      for (value of result){
      if (value[1] == state1 && value[0] != 'P0010001'){
        console.log('state1 ' + value[1] + 'pop ' + value[0]);
        fillText = getStateName(state1);
        setSquareText(font, fillStyle, fillText,10,25);
        color = 'Red';
        colorSquare(color, 100, 10, Math.round(value[0]/50000), 20);
      }
      if (value[1] == state2 && value[0] != 'P0010001'){
        console.log('state2 ' + value[1] + 'pop ' + value[0]);
        fillText = getStateName(state2);
        setSquareText(font, fillStyle, fillText,10,65);
        color = 'Green';
        colorSquare(color, 100, 50, Math.round(value[0]/50000), 20);
      }
     }

}




$(function(){
 	console.log('ready');
  //console.log(getAjaxRequest());
  colorSquare();
  // register listener for the submit
  $('.choose-form').submit( function(e){
    e.preventDefault();
    ctx.clearRect(0,0,1000,450);
    // zero out results if previous search has run
    //$('.results').html('');
    // get the value of the tags the user submitted
   //$("input[type='radio'][name='question']:checked").prop('checked', false);

    var selected1 = $(this).find("select[name='states1']").val();
    var selected2 = $(this).find("select[name='states2']").val();
    getStateData(selected1, selected2);
    console.log('statename ' + getStateName(selected1));

  });
    

});
