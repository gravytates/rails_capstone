
var loadData = function(){
  $.ajax({
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    url: '/parks',
    dataType: 'json',
    success: function(data){
      drawBarPlot(data);
    },
    failure: function(result){
      error();
    }
  });
};

function drawBarPlot(data){
  console.log('did it get this far?');
  alert(data);
}

function error() {
    console.log("Something went wrong!");
}

// fetch data on page load
$(document).ready(function(){
  console.log('load?');
  loadData();
});
