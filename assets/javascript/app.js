
// Wait until DOM is loaded
$(document).ready(function () {

  // Initialize materialize components
  $('.collapsible').collapsible();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();


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
    chosenCategory: '#category'
  };


  // ---------- Classes ---------- //

  classes = {};


  // ---------- Events ---------- //

  // Click button to hide or show favorites section
  $(selectors.hideFavoritesButton).on('click', function (event) {
    event.preventDefault();
    $("#mylist").toggleClass("scale-out");
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

    if (!patterns.textInput.test(name)) {
      // $(selectors.modalBody).text('Train Name must not be empty.');
      // $(selectors.modalAlert).modal('show');
      console.log('Name field cannot be empty.')
      return;
    }
    if (!patterns.textInput.test(city)) {
      console.log('City field cannot be empty.')
      return;
    }
    if (!patterns.textInput.test(category)) {
      console.log('You must choose a category.')
      return;
    }

    console.log(name, city, category);
  });


  // ---------- Helpers ---------- //

});