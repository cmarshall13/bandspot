let artistQuery = '';
let showDate = '';
let eventsArray = [];
const FETCH_URL = `https://rest.bandsintown.com/artists/${artistQuery}/events/?app_id=yOUrSuP3r3ven7aPp-id`;

function filterShowLocation(artistEvents, userLocation) {

   // Go through the events array for the artist and find all events in which match the region data the user location match
   artistEvents.forEach(event => {
      console.log(`Before condition statement: ${event[venue].region} and ${userLocation}`);
      if (event[venue].region === userLocation) {
         // Push into the events array if the locations match
         eventsArray.push(event);
      }
      // Otherwise, don't push and go to the next iteration
      continue;
   });

}

async function fetchArtists(artist) {
   // Artist query passed through async for-loop below
   artistQuery = artist;
   console.log(`Before fetch: ${artistQuery}`);
   // This returns the results of a single fetch
   return await (await fetch(FETCH_URL)).json();
}

function artistsLoopForFetch() {
   try {
      // For each artist in the Spotify array
      topTenArray.forEach(async artist => {
         // Call fetch function
         var artistEvents = await fetchArtists(artist)
         console.log(`After fetch/before push: ${topArtist}`);
         // Match the artist events with the user location
         filterShowLocation(artistEvents, userLocation);
      })
      // Any error in the fetch function or the loop will be caught here
   } catch (err) {
      //TODO: This will be a modal instead of an alert
      alert(`Uh oh, something went wrong! ${err}`);
   }
}

function formatMonth(showDate) {
   showDate = moment().format('MMMM');
   console.log(`After format, before return: ${showDate}`);
   return showDate;
}

function matchMonthAll(artistEvents) {
   let dateData = '';
   let showDate = '';

   // Search through artist show datetime data to match the user location
   artistEvents.forEach(artist => {
      // Select data from artist object
      dateData = artist[datetime];
      // Store formatted date in variable
      showDate = formatMonth(dateData);
      // If formatted month matches user month selection
      if (showDate === userMonth) {
         // Display the show
         displayShows(showDate);
      }
   });
}

function matchMonthAndArtist(artistEvents) {
   // Search for events matching user-chosen artist and month filters
   artistEvents.forEach(show => {
      if (formatMonth(artistEvents[datetime]) === userMonth && artistEvents[artist].name === userArtist)
         // Display the show
         displayShows(show);
   });
}