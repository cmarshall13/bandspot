let userLocation = '';

async function fetchLocation() {
   return await (await fetch('http://api.ipstack.com/check?access_key=83efe3074e441fc99a26233154d65f0e')).json();
}

async function getUserLocation() {
   try {
      response = await fetchLocation();
      console.log(`After fetch: ${response}`);
      // Get state initials from user location
      userLocation = response.region_code;
   }
   catch (err) {
      alert(`Uh oh, something went wrong: ${err}!`);
   }
};

getUserLocation();