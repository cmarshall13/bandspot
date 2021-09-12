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
         displayErrorModal(e);
         continue;
      }
   }
   filterLocation();
   populateRegionSelectBox();
}

var saveConcertData = function (artist, data, index) {
   // Get the band image from the first event in the data
   if (data.length > 0) {
      populateArtistSelectBox(artist);
      bandImage = data[0].artist.image_url;
      eventsArray.push({ artist: artist, image: bandImage, shows: [] });

   }
   // Build event data object
   for (var d of data) {
      // Split datetime into two strings representing date and time
      var date = d.datetime.split('T')[0];
      var time = d.datetime.split('T')[1];
      // Format date as MM/DD/YY for card display
      date = `${date.substring(5, 7)}/${date.substring(8, 10)}/${date.substring(0, 4)}`;
      // Format time as HH:MM for card display (removing seconds)
      time = time.substring(0, 5);
      // Get ticketing data
      if(d.offers[0].status){
         var ticketStatus = d.offers[0].status;
      }else{
         var ticketStatus = "unavailable";
      }
      if(d.offers[0].url){
         var ticketUrl = d.offers[0].url;
      }else{
         var ticketUrl = "";
      }

      eventsArray[index].shows.push({ date: date, time: time, venue: d.venue.name, location: d.venue.location, region: d.venue.region, tickets: ticketStatus, buyLink: ticketUrl });

   }
}