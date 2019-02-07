// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxo9EOirclA50VrESmMeFTJ_njc-V1UzE",
    authDomain: "project1-d737f.firebaseapp.com",
    databaseURL: "https://project1-d737f.firebaseio.com",
    projectId: "project1-d737f",
    storageBucket: "",
    messagingSenderId: "511988499457"
  };
  firebase.initializeApp(config);

  var map;

  function initMap() {
    var la = new google.maps.LatLng(34.0522, -118.2437);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
        document.getElementById('map'), {center: la, zoom: 15});
  }
  infowindow.open(map, this);

 

