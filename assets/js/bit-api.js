let artistQuery = '';
let showDate = '';
let dateData = '';
let eventsArray = [];
let userMonth = document.querySelector('#artists-select').value;
let userArtist = document.querySelector('#months-select').value;

const API_KEY = '641fbf4191ad9a6cd474d32af802738c';
var FETCH_URL = `https://rest.bandsintown.com/artists/{${artistQuery}}/events/?app_id=${API_KEY}`;

function filterShowLocation(artistEvents) {

   // Go through the events array for the artist and find all events in which match the region data the user location match
   artistEvents.forEach(event => {
      console.log(`Before condition statement: ${event[venue].region} and ${userLocation}`);

      if (event[venue].region === userLocation) {
         // Push into the events array if the locations match
         eventsArray.push(event);
      }

      // Display the shows depending on the condition statement of user value selections
      if (userMonth === 'All' && userArtist === 'All') {
         displayConcertCards(eventsArray);
      }
      else if (!userMonth === 'All' && userArtist === 'All') {
         matchMonthAll(eventsArray);
      }
      else {
         matchMonthAndArtist(eventsArray);
      }
   })
}

async function fetchArtists(artist) {
   // Artist query passed through async for-loop below
   artistQuery = artist;
   console.log(`Before fetch: ${artistQuery}`);
   // This returns the results of a single fetch
   return await (await fetch(FETCH_URL)).json();
}

function artistLoopForFetch(userLocation) {
   try {
      // For each artist in the Spotify array
      topTenArray.forEach(async artist => {
         // Call fetch function
         var artistEvents = await fetchArtists(artist);
         console.log(`After fetch/before push: ${topArtist}`);
         // Match the artist events with the user location
         filterShowLocation(artistEvents, userLocation);
      })
      // Any error in the fetch function or the loop will be caught here
   } catch (err) {
      displayErrorModal();
   }
}

function matchMonthAll(artistEvents) {
   // Search through artist show datetime data to match the user location
   artistEvents.forEach(artist => {
      // Select data from artist object
      dateData = artist[datetime];
      // Get numeric month values from data
      showMonth = dateData.substring(5, 7);
      console.log(`After getting month value from data: ${showMonth}`);
      // If month matches user month selection
      if (showMonth === userMonth) {
         // Display the show
         displayConcertCards(artist, showMonth);
      }
   });
}

function matchMonthAndArtist(artistEvents) {
   // Search for events matching user-chosen artist and month filters
   artistEvents.forEach(show => {
      let artist = artistEvents[artist].name;
      if (formatMonth(artistEvents[datetime]) === userMonth && artist === userArtist)
         // Display the show
         displayConcertCards(artist, show);
   });
}

var concertData = [];

var fetchConcertData = async function(artists){
   for(var i=0; i<artists.length; i++){
      var artist = artists[i];

      FETCH_URL = `https://rest.bandsintown.com/artists/${artist}/events/?app_id=${API_KEY}`;
      try{
         await fetch(FETCH_URL)
         .then(function(response){
            return response.json();
         })
         .then(function(data){
            saveConcertData(artist, data, concertData.length);
         });
      }catch(e){
         console.log(e);
         continue;
      }
   }
}

var saveConcertData = function(artist, data, index){
   concertData.push({artist: artist, shows: []});

   for(var d of data){
      concertData[index].shows.push({date: d.datetime, venue: d.venue.name, location: d.venue.location, region: d.venue.region});
   }
   console.log(concertData);
}