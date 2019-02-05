
// starter JS


  var $parameters = {
    urlname: "nystartrek",
    width: 225,
    height:570,
    _name: "Meetup Group Stats",
    _description: "Shows basic stats on your favorite Meetup group."
  };
  var $queries = {
    groups: function() {
      return mup_widget.api_call("/2/groups", {group_urlname: $parameters.urlname});
    },
    events: function() {
      return mup_widget.api_call("/2/events", {group_urlname: $parameters.urlname, page: '1'});
    }
  };



	mup_widget.with_jquery(function($, ctx) {
		var	group = '',
				months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
				addLink = function(content, link) {
						return '<a target="_top" href="' + link + '">' + content + '</a>';
	      },
        addImage = function(src, alt) {
           return src == "" ? '' : '<div class="mup-img-wrap"><img src="'+src+'" width="'+($parameters.width - 50)+'" alt="'+alt+'" class="mup-img"/></div>';
        },
               
				addLeadingZero = function( num ) {
						return (num < 10) ? ('0' + num) : num;
					},
				getFormattedDate = function( millis ) {
						var date = new Date( millis );
						return  months[date.getMonth()] + ' ' + addLeadingZero( date.getDate() ) + ', ' + date.getFullYear().toString();
					},
				getFormattedTime = function( millis ) {
						var	time = new Date( millis ),
								hours = time.getHours(),
								min = time.getMinutes(),
								ampm = (hours > 11) ? 'PM' : 'AM';
						min = (min < 10) ? ('0' + min) : min;
						hours = (hours == 0) ? 1 : hours;
						hours = (hours > 12) ? hours-12 : hours;
						return hours + ':' + min + ' ' + ampm;
					},
				numberFormat = function(nStr){
					  nStr += '';
					  x = nStr.split('.');
					  x1 = x[0];
					  x2 = x.length > 1 ? '.' + x[1] : '';
					  var rgx = /(\d+)(\d{3})/;
					  while (rgx.test(x1))
					    x1 = x1.replace(rgx, '$1' + ',' + '$2');
					  return x1 + x2;
					};
		$.getJSON($queries.groups(), function(data) {
	    if (data.results.length == 0) {
		  	$('.mug-badge', ctx).width($parameters.width);
				$('.mug-badge', ctx).append(
					'<div class="mup-widget error">\
							<div class="errorMsg">Oops. No results for "' + $parameters.urlname + '"</div>\
					</div>');
	    }
			else {
			group = data.results[0];
			$('.mug-badge', ctx).width($parameters.width);
			$('.mug-badge', ctx).append(
				'<div class="mup-widget">\
					<div class="mup-bd">\
						<h3>' + addLink(group.name, group.link) + '</h3>\
            <h4> <div style="padding-top:5px;"><span class="mup-tlabel">EST. '+ getFormattedDate(group.created)+'</span></div></h4>\
						<span class="mup-stats">' + addImage(group["group_photo"] ? group.group_photo.photo_link : "", group.name) + numberFormat(group.members) + '<span class="mup-tlabel"> '+ group.who+'</span></span>\
            <span class="mup-stats"><div class="next-event"></div></span>\
            <h4><span class="mup-button">'+ addLink('JOIN',group.link)+'</span></h4>\
					</div>\
					<div class="mup-ft">\
						<div class="mup-logo"><div style="float:left;">'+addLink('<img src="https://a248.e.akamai.net/secure.meetupstatic.com/img/84869143793177372874/birddog/everywhere_widget.png">','http://www.meetup.com')+'</div><div style="float:right;"><div style="float:right;">'+addStarRating(group.rating)+'</div><br><div style="float:right;"><span class="mup-tlabel">Group Rating</span></div></div></div>\
						<div class="mup-getwdgt">' + addLink('ADD THIS TO YOUR SITE', 'http://www.meetup.com/meetup_api/foundry/#'+$parameters._name.toLowerCase().replace(/ /g,"-")) + '</div>\
					</div>\
				</div>'
				);

	      $.getJSON($queries.events(), function(data) {
	        if (data.status && data.status.match(/^200/) == null) {
	          alert(data.status + ": " + data.details);
	        } else {
	            if (data.results.length == 0) {
		             $('.next-event', ctx).append('<span class="mup-tlabel">'+addLink('Suggest new ideas for Meetups!',group.link)+'</span>');
	            } else {
                    var event = data.results[0];
                    console.log(event);
                    var venue = event.venue;
                    console.log(venue);
                    var city;
                    if (!venue || !venue.city) {
                        city = group.city;
                    } else {
                        city = venue.city;
                    }
                    var state_country;
                    if (!venue || !venue.state) {
                        if (group.state == "") {
                            state_country = group.country.toUpperCase();
                        } else {
                            state_country = group.state;
                        }
                    } else {
                        state_country = venue.state;
                    }
                    var venue_addr;
                    if (venue) {
                        if (venue.name !== undefined) {
                            venue_addr = venue.name  + " - ";
                        } else if (venue.address_1 !== undefined) {
                            venue_addr = venue.address_1 + " - ";
                        } else {
                            venue_addr = "";
                        }
                    } else {
                       venue_addr = "";
                    }
                    var location = venue_addr + city + ", " + state_country;
                    $('.next-event', ctx).append('<h4><div class="mup-tlabel">'+getFormattedDate(event.time) + '   |   ' + getFormattedTime(event.time) + "</div>" + addLink(event.name, event.event_url)+'<div class="mup-tlabel">' + location + "</div></h4>");
                }
            }
            });
	    }
	  });
	});





{/* comments */}


{/* Request URL
https://api.meetup.com/find/locations?&sign=true&photo-host=public */}


{/* This one can be plugged directly into a browsers search and returns list of locations, no event info */}
{/* Signed URL
https://api.meetup.com/find/locations?photo-host=public&sig_id=273582893&sig=6dc1959ef0709eec1a6d9b925ee0d5ecb6d000f3
 */}

{/* Request URL
https://api.meetup.com/2/categories?&sign=true&photo-host=public&page=3

Returns 3pages of event category info
Signed URL
https://api.meetup.com/2/categories?offset=0&format=json&photo-host=public&page=3&order=shortname&desc=false&sig_id=273582893&sig=9c49aae6befe965a16bb2ec7517e652da5b9f421 */}


{/* Request URL
https://api.meetup.com/los-Angeles-JavaScript-and-Node-js/events?&sign=true&photo-host=public&page=3

Must have a specific group URL - This can be worked around by using a set of function that grabs and passes data
in a set order - for example, location and current date, query groups in location, capture URL of these groups
from return data, query events using aforementioned URLs

Signed URL

https://api.meetup.com/los-Angeles-JavaScript-and-Node-js/events?photo-host=public&page=3&sig_id=273582893&sig=704c97dd7216bf65df275d5ea468c107464083cc */}


{/* https://api.meetup.com//find/upcoming_events */}





// Get browsers location and user permission
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        var x = document.getElementById("location");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
// Pass location data to API
function showPosition(position) {
    var x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    var latlon = position.coords.latitude + "," + position.coords.longitude;


    $.ajax({
      type:"GET",
      url:"<script async defer src="https://maps.googleapis.com/maps/api/js?client=667254331664-rnjrjqmcmc4hvkpfafs9o6vg1ddsjm15.apps.googleusercontent.com&v=quarterly&callback=initMap"></script>"+latlon,
      async:true,
      dataType: "json",
      success: function(json) {
                  console.log(json);
                  var e = document.getElementById("events");
                  e.innerHTML = json.page.totalElements + " events found.";
                  showEvents(json);
                  initMap(position, json);
               },
      error: function(xhr, status, err) {
                  console.log(err);
               }
    });

}
// Process API Response
function showEvents(json) {
    for(var i=0; i<json.page.size; i++) {
      $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
    }
  }
  
  
  function initMap(position, json) {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
      center: {lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 10
    });
    for(var i=0; i<json.page.size; i++) {
      addMarker(map, json._embedded.events[i]);
    }
  }
  
  function addMarker(map, event) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
      map: map
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    console.log(marker);
  }


//   google:
//   client ID = 667254331664-rnjrjqmcmc4hvkpfafs9o6vg1ddsjm15.apps.googleusercontent.com
//   Secret = hpq7g6vu6puGq3nohdTCvMDm
// Meetup
// https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&sig_id=273582893&sig=d8ce4bfe33f441366d2f32924b8c26b6a2541b2d