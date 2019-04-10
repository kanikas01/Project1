
// Wait until DOM is loaded
$(document).ready(function () {

  // ---------- Initialize materialize components ---------- //

  $('.collapsible').collapsible();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  $('.modal').modal();


  // ---------- Global variables ---------- //

  var isFavoritesVisible = true;
  var weatherAPIkey = "1d82f9065f21fd5c97b741bc40699053";
  var meetupAPIkey = "34755e7077f1951b231b5a72276260";
  var weatherQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?units=imperial';
  var meetupQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/open_events.json?time=,5d';

  // ---------- Regex patterns for validating user input ---------- //
  patterns = {
    textInput: /\w+/,
    zipInput: /^\d{5}$/
  };


  // ---------- Selectors ---------- //

  selectors = {
    hideFavoritesButton: '#hide-favorites',
    formSubmitButton: '#form-submit',
    clearResultsButton: '#clear-results',
    meetupResults: '#meetup-results',
    weatherResults: '#weather-results',
    userName: '#name',
    userZipCode: '#zip',
    chosenCategory: '#category',
    inputModal: "#input-modal",
    modalPara: ".modal-content > p"
  };


  // ---------- Classes ---------- //

  classes = {
    scaleOut: "scale-out"
  };


  // ---------- Events ---------- //

  // Click button to hide or show favorites section
  $(selectors.hideFavoritesButton).on('click', function (event) {
    event.preventDefault();
    $(selectors.weatherResults).toggleClass(classes.scaleOut);
    if (isFavoritesVisible) {
      isFavoritesVisible = false;
      $("#hide-favorites").text("Show Favorites");
    }
    else {
      isFavoritesVisible = true;
      $("#hide-favorites").text("Hide Favorites");
    }
  });

  // Click button to clear page results
  $(selectors.clearResultsButton).on('click', function (event) {
    event.preventDefault();
    clearResults();
  });

  // Form submit handler
  $(selectors.formSubmitButton).on('click', function (event) {
    event.preventDefault();
    // Clear current page results
    clearResults();
    // Get user input
    // var name = $(selectors.userName).val().trim();
    var zip = $(selectors.userZipCode).val().trim();
    var category;
    // User must choose a category or the .trim method will throw an error
    // If no value is chosen then category is set to an empty string
    if ($(selectors.chosenCategory).val()) {
      category = $(selectors.chosenCategory).val().trim();
    }
    else {
      category = '';
    }

    // Validate user input
    // if (!patterns.textInput.test(name)) {
    //   $(selectors.modalPara).text('Name field cannot be empty.');
    //   $(selectors.inputModal).modal('open');
    //   return;
    // }
    if (!patterns.zipInput.test(zip)) {
      $(selectors.modalPara).text('Zip code must be 5 digits');
      $(selectors.inputModal).modal('open');
      return;
    }
    if (!patterns.textInput.test(category)) {
      $(selectors.modalPara).text('You must choose a category.');
      $(selectors.inputModal).modal('open');
      return;
    }

    // Create query urls
    meetupQueryURL = meetupQueryURL + '&key=' + meetupAPIkey + '&zip=' + zip + '&category=' + category;
    weatherQueryURL = weatherQueryURL + '&zip=' + zip + ',us&appid=' + weatherAPIkey;

    // Meetup ajax request
    $.ajax({
      url: meetupQueryURL,
      method: "GET",
    }).then(function (response) {
      response.results.forEach(function (element) {
        createEventCard(element);
      });
    });

    // Weather ajax request
    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (response) {
      response.list.forEach(function (element) {
        if (element.dt_txt.endsWith('00:00:00')) {
          weatherInfo = {
            temp: element.main.temp,
            description: element.weather[0].main,
            date: element.dt
          }

          // Add entry to weather results div
          createWeatherEntry(weatherInfo);
        }
      });
      // Make weather results div visible
      $(selectors.weatherResults).css('display', 'block');
    });
  });


  // ---------- Helpers ---------- //

  // Creates a card using event info and appends that card to the meetup results div
  function createEventCard(event) {

    // Declare DOM element variables
    var exteriorDiv = $('<div class="col s12 m6">');
    var interiorDiv = $('<div class="card indigo">');
    var contentDiv1 = $('<div class="card-content white-text">');
    var span = $('<span class="card-title">');
    span.text(event.name);
    var para = $('<p>');

    // If the event has a venue listed, use it
    if (event.hasOwnProperty('venue')) {
      para.html(`${event.venue.name}<br>
                ${event.venue.city}<br>`);
    }

    var eventTime = moment(event.time, 'x').format('ddd MMM D, h:mm a');
    var contentDiv2 = $('<div class="card-action">');
    var anchor1 = $(`<a href="${event.event_url}" target="_blank" rel="noopener noreferrer">More Info</a>`)
    var anchor2 = $(`<a href="${event.event_url}" target="_blank" rel="noopener noreferrer"></a>`);
    anchor2.text(eventTime);

    // Assemble content divs
    contentDiv1.append(span);
    contentDiv1.append(para);
    contentDiv2.append(anchor1);
    contentDiv2.append(anchor2);

    //Assemble interior div
    interiorDiv.append(contentDiv1);
    interiorDiv.append(contentDiv2);

    // Assemble exterior div
    exteriorDiv.append(interiorDiv);

    // Append card to meetup results div
    $(selectors.meetupResults).append(exteriorDiv);
  }

  // Takes an object with weather data and creates a list item
  // with that data then appends it to the weather results div
  function createWeatherEntry(weather) {

    // Declare DOM element variables
    var listItem = $('<li>');
    var headerDiv = $('<div class="collapsible-header">');
    var bodyDiv = $('<div class="collapsible-body white">');
    var image = $('<i class="material-icons">');
    var span = $('<span>');
    var dateDiv = $('<div>');
    var parsedDescription = '';

    // Set icon and descriptive text based on weather.description
    if (weather.description === 'Clouds') {
      image.text('filter_drama');
      parsedDescription = 'Cloudy';
    }
    else if (weather.description === 'Clear') {
      image.text('wb_sunny');
      parsedDescription = 'Sunny';
    }
    else if (weather.description === 'Rain') {
      image.text('opacity');
      parsedDescription = 'Showers';
    }
    else {
      image.text('wb_sunny');
    }

    // Set text/html for appropriate tags
    span.html(parsedDescription + ', high of ' + weather.temp.toFixed() + '&deg;');
    dateDiv.text(moment(weather.date, 'X').format('dddd, MMMM Do, YYYY'));

    // Assemble list item
    headerDiv.append(image);
    headerDiv.append(dateDiv);
    bodyDiv.append(span);
    listItem.append(headerDiv);
    listItem.append(bodyDiv);

    // Append list item to weather results div
    listItem.appendTo(selectors.weatherResults);
  }

  function clearResults() {
    $(selectors.meetupResults).empty();
    $(selectors.weatherResults).empty();
    $(selectors.weatherResults).css('display', 'none');
  }

});