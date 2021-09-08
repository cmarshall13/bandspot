let userLocation = '';
const apiURL = 'http://api.ipstack.com/check?access_key=83efe3074e441fc99a26233154d65f0e';

var fetchLocation = function(){
   fetch(apiURL)
      .then(function(response){
         return response.json();
      })
      .then(function(data){
         userLocation = data.region_code;
         localStorage.setItem('userLocation', userLocation);
      });
}

if(localStorage.getItem("userLocation") != null){
   userLocation = localStorage.getItem("userLocation");
}else{
   fetchLocation();
}