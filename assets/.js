
    function weather(){
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?zip=94040,us&APPID=62e39ed385655db26c691f27728043b0";
        
    $.ajax({
        url: queryURL,
        method: "GET"
      });
    
    forecast.time.from
    //Beginning of the period of data forecasted
    forecast.time.to 
    //End of the period of data forecasted
    
    }

    function meetUp(){
        var queryURL = "http://api.meetup.com/2/categories?&api_key=53222f3025755b257e7c559075286a";

        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response) {
            console.log(response);
        });
    }

