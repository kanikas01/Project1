
// Wait until DOM is loaded
$(document).ready(function () {

  // Initialize materialize components
  $('.collapsible').collapsible();
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();


  // ---------- Global variables ---------- //

  var isFavoritesVisible = true;


  // ---------- Selectors ---------- //

  selectors = {
    hideFavoritesButton: '#hide-favorites',
    formSubmitButton: '#form-submit'
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
  });


  // ---------- Helpers ---------- //

});