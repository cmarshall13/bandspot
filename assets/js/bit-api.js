var eventsArray = [];
var FETCH_URL = '';
const API_KEY = '641fbf4191ad9a6cd474d32af802738c';

var fetchConcertData = async function(artists){
   for(var artist of artists){
      FETCH_URL = `https://rest.bandsintown.com/artists/${artist}/events/?app_id=${API_KEY}`;
      try{
         await fetch(FETCH_URL)
         .then(function(response){
            return response.json();
         })
         .then(function(data){
            saveConcertData(artist, data, eventsArray.length);
         });
      }catch(e){
         console.log(e);
         continue;
      }
   }
   filterLocation();
}

var saveConcertData = function(artist, data, index){
   eventsArray.push({artist: artist, shows: []});

   for(var d of data){
      eventsArray[index].shows.push({date: d.datetime, venue: d.venue.name, location: d.venue.location, region: d.venue.region});
   }
}