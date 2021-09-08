var DOMEl = {
    artSelect: document.getElementById("artists-select"),
    monthSelect: document.getElementById("months-select"),
    regionSelect: document.getElementById("region-select"),
    spotifyBtn: document.getElementById("spotify"),
    loginDiv: document.querySelector("#login"),
    optionsDiv: document.getElementById("options"),
    cardContainerDiv: document.getElementById("card-container"),
}

var hideLoginDiv = function () {
    DOMEl.loginDiv.classList = "hidden";
}

var populateArtistSelectBox = function () {
    hideLoginDiv();

    for (var a of artists) {
        var opt = document.createElement("option");
        opt.value = a;
        opt.textContent = a;
        DOMEl.artSelect.appendChild(opt);
    }
    DOMEl.optionsDiv.removeAttribute("class", "hidden");
}

var displayConcertCards = function (artist, show) {
    // show the card container div
    DOMEl.cardContainerDiv.removeAttribute("class", "hidden");

    var venue = show.venue;
    var date = show.date;
    var location = show.location;

    var card = document.createElement("a");
    card.href = "";

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card small col s4");
    cardDiv.style.backgroundImage = 'url("https://wallpapertag.com/wallpaper/full/c/1/c/113242-light-gray-background-2560x1440-full-hd.jpg")';

    var cardContentDiv = document.createElement("div");

    var cardArtist = document.createElement("h4");
    cardArtist.textContent = artist;

    var cardDate = document.createElement("h5");
    cardDate.textContent = date;

    var cardVenue = document.createElement("h5");
    cardVenue.textContent = "Venue: " + venue;

    var cardLocation = document.createElement("h5");
    cardLocation.textContent = location;

    // append concert data to content div
    cardContentDiv.appendChild(cardArtist);
    cardContentDiv.appendChild(cardDate);
    cardContentDiv.appendChild(cardVenue);
    cardContentDiv.appendChild(cardLocation);

    // append content div to card div
    cardDiv.appendChild(cardContentDiv);

    card.appendChild(cardDiv);

    // append card to container div
    DOMEl.cardContainerDiv.append(card);
}

var filterLocation = function () {
    // empty the card container div
    DOMEl.cardContainerDiv.innerHTML = "";
    for (var events of eventsArray) {
        var artist = events.artist;
        // loop thru the shows array
        for (var show of events.shows) {
            var location = show.region;
            if (location === userLocation) {
                displayConcertCards(artist, show);
            }
        }
    }
}

var filter = function (artistFilter, monthFilter) {
    // empty the card container div
    DOMEl.cardContainerDiv.innerHTML = "";

    for (var events of eventsArray) {
        var artist = events.artist;
        // check if this artist has any shows
        if (events.shows.length > 0) {
            // loop thru the shows array
            for (var show of events.shows) {
                var month = show.date.substring(5, 7);
                if (artistFilter === "All" && monthFilter === "All") {
                    displayConcertCards(artist, show);
                } else if (artistFilter === "All" && month === monthFilter) {
                    displayConcertCards(artist, show);
                } else if (artist === artistFilter && monthFilter === "All") {
                    displayConcertCards(artist, show);
                } else if (artist === artistFilter && month === monthFilter) {
                    displayConcertCards(artist, show);
                }
            }
        }
    }
}

DOMEl.spotifyBtn.onclick = function (event) {
    event.preventDefault();
    requestUserAuthorization();
}

DOMEl.artSelect.onchange = function () {
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    filter(artist, month);
}

DOMEl.monthSelect.onchange = function () {
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    filter(artist, month);
}

DOMEl.regionSelect.onchange = function () {
    var region = DOMEl.regionSelect.value;
    // send the region value to the filter
}

// Modal function
function displayErrorModal() {
    const errorModalEl = document.querySelector('.modal');
    M.Modal.init(errorModalEl, {
        opacity: 0.6,
        dismissible: true,
        preventScrolling: true,
    });

    const instance = M.Modal.getInstance(errorModalEl);
    instance.open();
}


