
// Wait until DOM is loaded
$(document).ready(function () {

  // Initialize materialize components
  $('.collapsible').collapsible();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
  $('.modal').modal();


  // ---------- Global variables ---------- //

  var isFavoritesVisible = true;

  // Regex patterns for validating user input
  patterns = {
    textInput: /\w+/
  };


  // ---------- Selectors ---------- //

  selectors = {
    hideFavoritesButton: '#hide-favorites',
    formSubmitButton: '#form-submit',
    userName: '#name',
    userCity: '#city',
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
    var city = $(selectors.userCity).val().trim();
    var category; 
    // user must choose a category or the .trim method will throw an error
    // if no value is chosen then category is set to an empty string
    if ( $(selectors.chosenCategory).val() ) {
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
    if (!patterns.textInput.test(city)) {
      $(selectors.modalPara).text('City field cannot be empty.');
      $(selectors.inputModal).modal('open');
      return;
    }
    if (!patterns.textInput.test(category)) {
      $(selectors.modalPara).text('You must choose a category.');
      $(selectors.inputModal).modal('open');
      return;
    }

    console.log(name, city, category);
  });


  // ---------- Helpers ---------- //

});