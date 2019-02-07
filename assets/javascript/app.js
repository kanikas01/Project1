
// Wait until DOM is loaded
$(document).ready(function () {

  // Initialize materialize components
  $('.collapsible').collapsible();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  $('.modal').modal();


  // ---------- Global variables ---------- //

  var isFavoritesVisible = true;
  var weatherAPIkey = "";
  var meetupAPIkey = "";
  var weatherQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?units=imperial';
  var meetupQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/open_events.json?time=,3d';

  // https://api.meetup.com/2/open_events.json?time=,1d&key=API_KEY&zip=90038&category=1
  // https://api.openweathermap.org/data/2.5/forecast?units=imperial&zip=90035,us&appid=API_KEY

  // Regex patterns for validating user input
  patterns = {
    textInput: /\w+/,
    zipInput: /^\d{5}$/
  };


  // ---------- Selectors ---------- //

  selectors = {
    hideFavoritesButton: '#hide-favorites',
    formSubmitButton: '#form-submit',
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
    $("#mylist").toggleClass(classes.scaleOut);
    if (isFavoritesVisible) {
      isFavoritesVisible = false;
      $("#hide-favorites").text("Show Favorites");
    }
    else {
      isFavoritesVisible = true;
      $("#hide-favorites").text("Hide Favorites");
    }
  });

  // Form submit handler
  $(selectors.formSubmitButton).on('click', function (event) {
    event.preventDefault();
    // Get user input
    var name = $(selectors.userName).val().trim();
    var zip = $(selectors.userZipCode).val().trim();
    var category;
    // user must choose a category or the .trim method will throw an error
    // if no value is chosen then category is set to an empty string
    if ($(selectors.chosenCategory).val()) {
      category = $(selectors.chosenCategory).val().trim();
    }
    else {
      category = '';
    }

    // Validate user input
    if (!patterns.textInput.test(name)) {
      $(selectors.modalPara).text('Name field cannot be empty.');
      $(selectors.inputModal).modal('open');
      return;
    }
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

    // console.log(name, zip, category);

    meetupQueryURL = meetupQueryURL + '&key=' + meetupAPIkey + '&zip=' + zip + '&category=' + category;

    // Ajax request
    $.ajax({
      url: meetupQueryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      response.results.forEach(function (element) {
        console.log(element);
        createEventCard(element);
      });
    });
  });


  // ---------- Helpers ---------- //

  function createEventCard(event) {
    console.log('infunction');
    var exteriorDiv = $('<div class="col s12 m6">');
    var interiorDiv = $('<div class="card indigo">');
    var contentDiv1 = $('<div class="card-content white-text">');
    var span = $('<span class="card-title">');
    span.text(event.name);
    var para = $('<p>')
    if (event.hasOwnProperty('venue')) {
      para.html(`${event.venue.name}<br>
                ${event.venue.city}<br>`)
    }
    var contentDiv2 = $('<div class="card-action">');
    var anchor1 = $(`<a href="${event.event_url}">More Info</a>`)
    var anchor2 = $(`<a href="#!">weather conditions</a>`);

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

    // Append card to results div
    $('#results').append(exteriorDiv);
  }
});