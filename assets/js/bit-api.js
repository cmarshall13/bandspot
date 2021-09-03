// VARIABLES

let artistQuery = '';
const FETCH_URL_BASE = `https://rest.bandsintown.com/artists/${artistQuery}/events/?app_id=yOUrSuP3r3ven7aPp-id`;

// artist and events queries can be left to default or changed easily with variable re-assignment
// date-time comes with the data response; there can be a function to only show events based on the month matching;


/* FUNCTIONS

1. matchMonthAll() which searches event data for each of the ten bands and returns an array of the events in that month
   -- ie. searches through each artist object's datetime value to see if it matches user filter value; if so, push the event
      data to the event array, and then display the info in another for loop going through the event array

2. matchMonthSingleArtist() which searches event data for the specific artist filtered (this is only if user selects both values to filter)
   -- this will search the datetime of the single artist events and display the shows

3. A fetch function, obviously! The fetch function will be conditional based on user filters:

* CONDITIONS FOR FETCH FUNCTION:

1. No filters chosen; default fetch (all artists stored in an artists array and current month)
-- Get 10 fetches, changing the parameter to the current artist in the array using a for loop
-- Call displayEvents() and pass the data to it

2. Only month chosen, fetch filtered by month value for all artists
-- Default fetch again
-- Call the matchMonthAll() function, passing the response data to it so it can search
-- Call displayEvents and pass the new events array to it

3. Only artist chosen, fetch filtered for current month for specific artist value
-- Fetch based on the single artist query parameter, staying with the current month
4. Both month and artist chosen, fetch filtered for month and artist values
-- Fetch based on changing both parameters

*/



// Placeholder functionality for data fetching

async function loadData() {
   return await (await fetch('http://api.ipstack.com/check?access_key=83efe3074e441fc99a26233154d65f0e')).json();
}

async function displayData() {
   try {
      data = await loadData();
      console.log(data);

   }
   catch (err) {
      alert(`Uh oh, something went wrong: ${err}!`);
   }
};

displayData();
