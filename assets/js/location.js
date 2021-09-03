
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