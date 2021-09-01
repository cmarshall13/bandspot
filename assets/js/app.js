var start = document.getElementById("spotify");
var topArtists = document.getElementById("artists");
var top20 = document.getElementById("top-20");

var redirect_uri = "http://127.0.0.1:5500/index.html";

var client_id = "e628ac9cc03a4ae7b5791a502a111c7a";
var client_secret = "5f04cafed0f446d8b129f601eb6d81b1";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const ARTISTS = "https://api.spotify.com/v1/me/top/artists"


var requestAuthorization = function(){
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-library-read user-top-read";
    window.location.href = url;
}

var getCode = function(){
    if(window.location.search.length > 0){
        let code = null;
        const queryString = window.location.search;
        if(queryString.length > 0){
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get("code");
            // console.log(code);
            fetchAccessToken(code);
            window.history.pushState("", "", redirect_uri);
        }
        return code;
    }
}

var handleAuthorizationResponse = function(){
    if(this.status == 200){
        var data = JSON.parse(this.responseText);
        // console.log(data);
        var data = JSON.parse(this.responseText);
        if(data.access_token != undefined){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if(data.refresh_token != undefined){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        getCode();
        getTopArtists();
    }else{
        // console.log(this.responseText);
    }
}

var callAuthorizationApi = function(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

var fetchAccessToken = function(code){
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

var callApi = function(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

var handleArtistsResponse = function(){
    if(this.status == 200){
        var data = Array.from(JSON.parse(this.responseText).items);
        // console.log(data);

        for(var d of data){
            console.log(d.name);
            var artist = document.createElement("p");
            artist.textContent = d.name;
            top20.appendChild(artist);
        }
        
    }else{
        console.log("didnt return 200");
    }
}

var getTopArtists = function(){
    callApi("GET", ARTISTS, null, handleArtistsResponse)
}

// button event listener
start.addEventListener("click", function(event){
    event.preventDefault();
    requestAuthorization();
});

getCode();