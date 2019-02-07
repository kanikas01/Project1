
    function weather(){
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=62e39ed385655db26c691f27728043b0";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
    
    }

    function meetUp(){
        var queryURL = "http://api.meetup.com/2/cities?&api_key=111d4e70325b70196712106e49262757";

        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response) {
            console.log(response);
        });
    }
    