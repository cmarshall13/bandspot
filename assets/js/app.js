var start = document.getElementById("spotify");
var topArtists = document.getElementById("artists");
var top20 = document.getElementById("top-20");

var redirect_uri = "http://127.0.0.1:5500/index.html";

var client_id = "e628ac9cc03a4ae7b5791a502a111c7a";
var client_secret = "5f04cafed0f446d8b129f601eb6d81b1";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const ARTISTS = "https://api.spotify.com/v1/me/top/artists"


// get the user to authorize our app to access their spotify account
var requestUserAuthorization = function(){
    var url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + redirect_uri;
    url += "&show_dialog=true";
    url += "&scope=user-library-read user-top-read";
    window.location.href = url;
}

// get the code that spotify returns in the url
var getCode = function(){
    // check if url bar isnt empty
    if(window.location.search.length > 0){
        var code = null;
        var queryString = window.location.search;
        if(queryString.length > 0){
            // isolate the code parameter in the url that was returned from spotify
            var urlParams = new URLSearchParams(queryString);
            code = urlParams.get("code");
            fetchAccessToken(code);
            // update the url space to hide the code parameter
            window.history.pushState("", "", redirect_uri);
        }
        return code;
    }
}

var getAuthorization = function(body){
    fetch(TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
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
            getCode();
            getTopArtists();
        });
}

var fetchAccessToken = function(code){
    var body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + redirect_uri;
    body += "&client_id=" + client_id;
    // callAuthorizationApi(body);
    getAuthorization(body);
}

// get the spotify users top artists and then call the display function after
var getTopArtists = function(){
    fetch(ARTISTS, {
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
            console.log(i.name);
            var artist = document.createElement("p");
            artist.textContent = i.name;
            top20.appendChild(artist);
        }
}

// button event listener
start.addEventListener("click", function(event){
    event.preventDefault();
    requestUserAuthorization();
});

getCode();