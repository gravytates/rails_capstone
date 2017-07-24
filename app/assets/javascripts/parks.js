// ajax call to fetch json
var loadData = function(){
                $.ajax({
                  type: 'GET',
                  contentType: 'app/views/parks/park_data.json; charset=utf-8',
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

// draw bar plot
function drawBarPlot(data){};

// fetch data on page load
$(document).ready(function(){
  loadData();
});
