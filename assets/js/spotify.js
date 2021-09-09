var apiData = {
    client_id: "e628ac9cc03a4ae7b5791a502a111c7a",
    client_secret: "5f04cafed0f446d8b129f601eb6d81b1",
    // redirect_uri: "https://trippjoe.github.io/bandspot/",
    redirect_uri: "http://127.0.0.1:5500/index.html",
    access_token: "",
    refresh_token: ""
}

var apiURLs = {
    artists: "https://api.spotify.com/v1/me/top/artists",
    authorize: "https://accounts.spotify.com/authorize",
    token: "https://accounts.spotify.com/api/token"
}

var artists = [];
var english = /^[A-Za-z0-9&.@% ]*$/;

// get the user to authorize our app to access their spotify account
var requestUserAuthorization = function () {
    var url = apiURLs.authorize;
    url += "?client_id=" + apiData.client_id + "&response_type=code" + "&redirect_uri=" + apiData.redirect_uri + "&show_dialog=true" + "&scope=user-library-read user-top-read";
    window.location.href = url;
}

// get the code that spotify returns in the url
var getAuthCode = function () {
    // check if url bar isnt empty
    if (window.location.search.length > 0) {
        var code = null;
        var queryString = window.location.search;
        if (queryString.length > 0) {
            // isolate the code parameter in the url that was returned from spotify
            var urlParams = new URLSearchParams(queryString);
            code = urlParams.get("code");
            getAuthorization(code);
            // update the url space to hide the code parameter
            window.history.pushState("", "", apiData.redirect_uri);
        }
    }
}

var getAuthorization = function (code) {
    var body = "grant_type=authorization_code" + "&code=" + code + "&redirect_uri=" + apiData.redirect_uri + "&client_id=" + apiData.client_id;
    fetch(apiURLs.token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(apiData.client_id + ':' + apiData.client_secret),
        },
        body: body,
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            apiData.access_token = response.access_token;
            apiData.refresh_token = response.refresh_token;
            getTopArtists();
        });
}

// get the spotify users top artists and save to array
var getTopArtists = function () {
    fetch(apiURLs.artists, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiData.access_token,
        },
        body: null,
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            updateArtistsArray(response.items);
        });
}

var checkEnglish = function (name) {
    return english.test(name);
}

var updateArtistsArray = function (items) {
    for (var i of items) {
        if (checkEnglish(i.name)) {
            artists.push(i.name);
        }
    }
    populateArtistSelectBox();
    fetchConcertData(artists);
}

try {
    getAuthCode();
} catch (e) {
    console.log(e);
}
