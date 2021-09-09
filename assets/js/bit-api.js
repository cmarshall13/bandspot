var eventsArray = [];
var FETCH_URL = '';
const API_KEY = '641fbf4191ad9a6cd474d32af802738c';

var fetchConcertData = async function (artists) {
   for (var artist of artists) {
      FETCH_URL = `https://rest.bandsintown.com/artists/${artist}/events/?app_id=${API_KEY}`;
      try {
         await fetch(FETCH_URL)
            .then(function (response) {
               return response.json();
            })
            .then(function (data) {
               saveConcertData(artist, data, eventsArray.length);
            });
      } catch (e) {
         displayErrorModal();
         continue;
      }
   }
   filterLocation();
}

var saveConcertData = function (artist, data, index) {
   // Get the band image from the first event in the data
   bandImage = data[0].artist.image_url;
   eventsArray.push({ artist: artist, shows: [] });
   // Build event data object
   for (var d of data) {
      // Split into array of two strings representing date and time
      dateTimeString = data.datetime.split('T');
      // Format date as MM/DD/YY for card display
      showDate = `${dateTimeString[0].substring(5, 7)}/${dateTimeString.substring(8, 10)}/${dateTimeString.substring(0, 4)}`;
      // Format time as HH:MM for card display (removing seconds)
      showTime = dateTimeString[1].substring(0, 5);
      eventsArray[index].shows.push({ date: showDate, time: showTime, venue: d.venue.name, location: d.venue.location, region: d.venue.region, image: bandImage });
   }
}