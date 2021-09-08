var DOMEl = {
    artSelect: document.getElementById("artists-select"),
    monthSelect: document.getElementById("months-select"),
    spotifyBtn: document.getElementById("spotify"),
    loginDiv: document.querySelector("#login"),
    optionsDiv: document.getElementById("options"),
    cardContainerDiv: document.getElementById("card-container"),
}

var hideLoginDiv = function(){
    DOMEl.loginDiv.classList = "hidden";
}

var populateSelectBox = function(){
    hideLoginDiv();

    for(var a of artists){
        var opt = document.createElement("option");
        opt.value = a;
        opt.textContent = a;
        DOMEl.artSelect.appendChild(opt);
    }
    DOMEl.optionsDiv.removeAttribute("class", "hidden");
}

var primeConcertData = function(){
    DOMEl.cardContainerDiv.removeAttribute("class", "hidden");

    for(var events of eventsArray){
        var artist = events.artist;
        for(var show of events.shows){
            // console.log(show);
            var venue = show.venue;
            var date = show.date;
            var region = show.region;
            var location = show.location;

            if(userLocation === region){
                console.log(artist);
                console.log(show);

                var card = document.createElement("div");
                card.setAttribute("class", "card-small");

                var cardImageDiv = document.createElement("div");

                var cardContentDiv = document.createElement("div");

                var cardActionDiv = document.createElement("div");


                card.appendChild(cardImageDiv);
                card.appendChild(cardContentDiv);
                card.appendChild(cardActionDiv);
                DOMEl.cardContainerDiv.append(card);
            }
        }
    }
}

var displayConcertCards = function(month, artist){
    // do something
}

function filterShowLocation(artistEvents) {
// Go through the events array for the artist and find all events in which match the region data the user location match
artistEvents.forEach(event => {
    console.log(`Before condition statement: ${event[venue].region} and ${userLocation}`);

    if (event[venue].region === userLocation) {
        // Push into the events array if the locations match
        eventsArray.push(event);
    }

    // Display the shows depending on the condition statement of user value selections
    if (userMonth === 'All' && userArtist === 'All') {
        displayConcertCards(eventsArray);
    }
    else if (!userMonth === 'All' && userArtist === 'All') {
        matchMonthAll(eventsArray);
    }
    else {
        matchMonthAndArtist(eventsArray);
    }
});
}

function artistLoopForFetch(userLocation) {
    try {
    // For each artist in the Spotify array
    topTenArray.forEach(async artist => {
        var artistEvents = await fetchArtists(artist);
        console.log(`After fetch/before push: ${topArtist}`);
        // Match the artist events with the user location
        filterShowLocation(artistEvents, userLocation);
    })
    // Any error in the fetch function or the loop will be caught here
    } catch (err) {
        displayErrorModal();
    }
}

function matchMonthAll(artistEvents) {
// Search through artist show datetime data to match the user location
artistEvents.forEach(artist => {
    // Select data from artist object
    dateData = artist[datetime];
    // Get numeric month values from data
    showMonth = dateData.substring(5, 7);
    console.log(`After getting month value from data: ${showMonth}`);
    // If month matches user month selection
    if (showMonth === userMonth) {
        // Display the show
        displayConcertCards(artist, showMonth);
    }
});
}

function matchMonthAndArtist(artistEvents) {
    // Search for events matching user-chosen artist and month filters
    artistEvents.forEach(show => {
        let artist = artistEvents[artist].name;
        if (formatMonth(artistEvents[datetime]) === userMonth && artist === userArtist)
            // Display the show
            displayConcertCards(artist, show);
    });
}

DOMEl.spotifyBtn.onclick = function(event){
    event.preventDefault();
    requestUserAuthorization();
}

DOMEl.artSelect.onchange =  function(){
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    // displayConcertCards(month, artist);
    primeConcertData();
}

DOMEl.monthSelect.onchange = function(){
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    // displayConcertCards(month, artist);
    primeConcertData();
}

// Modal function
function displayErrorModal() {
    const errorModalEl = document.querySelector('.modal');
    M.Modal.init(errorModalEl, {});
}