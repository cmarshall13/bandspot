let artistQuery = '';
let artistsArray = [];
let eventsArray = [];
const FETCH_URL_BASE = `https://rest.bandsintown.com/artists/${artistQuery}/events/?app_id=yOUrSuP3r3ven7aPp-id`;

async function fetchArtists(artist) {

   // Artist query passed through async for-loop below
   artistQuery = artist;
   console.log(`Before fetch: ${artistQuery}`);
   // This returns the results of a single fetch
   return await (await fetch(FETCH_URL_BASE)).json();
}

function artistsLoopForFetch() {
   try {
      // For each artist in the Spotify array
      top20Array.forEach(async artist => {
         // Call fetch function
         var topArtist = await fetchArtists(artist)
         // Push artist data into artist object array
         console.log(`After fetch/before push: ${topArtist}`);
         eventsArray.push(topArtist);
      })
      // Any error in the fetch function or the loop will be caught here
   } catch (err) {
      alert(`Uh oh, something went wrong! ${err}`);
   }
}

// function formatMonth(showDate) {
//    showDate = moment().format('MMMM');
//    return showDate;
// }

// function filterShowLocation(eventsArray, userLocation) {


// }


// function matchMonthAll(artistList, userLocation) {
//    let dateData = '';
//    let showDate = '';

//    // Search through artist show datetime data to match the user location
//    artistsArray.forEach(artist => {
//       // Select data from artist object
//       dateData = artist[datetime];
//       // Store formatted date in variable
//       showDate = formatMonth(dateData);

//    });

// }

// function matchMonthSingleArtist(artist) {

// }
