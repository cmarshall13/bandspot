var DOMEl = {
    startBtn: document.getElementById("spotify"),
    top20Div: document.getElementById("top-20")
}

var apiData = {
    client_id: "e628ac9cc03a4ae7b5791a502a111c7a",
    client_secret: "5f04cafed0f446d8b129f601eb6d81b1",
    redirect_uri: "http://127.0.0.1:5500/index.html"
}

var apiURLs = {
    artists: "https://api.spotify.com/v1/me/top/artists",
    authorize: "https://accounts.spotify.com/authorize",
    token: "https://accounts.spotify.com/api/token"
}

var artists = [];

// get the user to authorize our app to access their spotify account
var requestUserAuthorization = function(){
    var url = apiURLs.authorize;
    url += "?client_id=" + apiData.client_id + "&response_type=code" + "&redirect_uri=" + apiData.redirect_uri + "&show_dialog=true" + "&scope=user-library-read user-top-read";
    window.location.href = url;
}

// get the code that spotify returns in the url
var getAuthCode = function(){
    // check if url bar isnt empty
    if(window.location.search.length > 0){
        var code = null;
        var queryString = window.location.search;
        if(queryString.length > 0){
            // isolate the code parameter in the url that was returned from spotify
            var urlParams = new URLSearchParams(queryString);
            code = urlParams.get("code");
            getAuthorization(code);
            // update the url space to hide the code parameter
            window.history.pushState("", "", apiData.redirect_uri);
        }
        return code;
    }
}

var getAuthorization = function(code){
    var body = "grant_type=authorization_code" + "&code=" + code + "&redirect_uri=" + apiData.redirect_uri + "&client_id=" + apiData.client_id;
    fetch(apiURLs.token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(apiData.client_id + ':' + apiData.client_secret),
        },
        body: body,
    })
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            access_token = response.access_token;
            // localStorage.setItem("access_token", access_token);
            refresh_token = response.refresh_token;
            // localStorage.setItem("refresh_token", refresh_token);
            getAuthCode();
            getTopArtists();
        });
}

// get the spotify users top artists and then call the display function after
var getTopArtists = function(){
    fetch(apiURLs.artists, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
        },
        body: null,
    })
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            displayTopArtists(response.items);
        });
}

// this will be called from the .then statement from the top artists fetch request
var displayTopArtists = function(items){
        for(var i of items){
            // add each artist to the artist array
            artists.push(i.name);
            var artist = document.createElement("p");
            artist.textContent = i.name;
            DOMEl.top20Div.appendChild(artist);
        }
        console.log(artists);
}

// button event listener
DOMEl.startBtn.addEventListener("click", function(event){
    event.preventDefault();
    requestUserAuthorization();
});

try{
    getAuthCode();
}catch(e){
    console.log(e);
}