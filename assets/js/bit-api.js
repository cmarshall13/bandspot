// Placeholder functionality for data fetching

async function loadData() {
   // Artist and month are pre-supplied options, so error-guarding here is unnecessary
   return await (await fetch('https://jsonplaceholder.typicode.com/posts/1/comments')).json();
}

async function displayData() {
   try {
      // Data will be the parsed fetch result once completed
      data = await loadData();

      /* Do stuff with data here
         ...
         ...
      */

   }
   catch (err) {
      alert(`Uh oh, something went wrong: ${err}!`);
   }
};

displayData();

