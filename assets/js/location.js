let userLocation = '';
const LOCATION_FETCH_URL = 'https://ipapi.co/json';

var fetchLocation = function () {
   try {
      fetch(LOCATION_FETCH_URL)
         .then(function (response) {
            return response.json();
         })
         .then(function (data) {
            userLocation = data.region_code;
            localStorage.setItem('userLocation', userLocation);
         });
   } catch (e) {
      displayErrorModal();
   }
}

if (localStorage.getItem("userLocation")) {
   userLocation = localStorage.getItem("userLocation");
} else {
   fetchLocation();
}