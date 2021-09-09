var DOMEl = {
    artSelect: document.getElementById("artists-select"),
    artColumnEl: document.querySelector('.artist-column'),
    monthSelect: document.getElementById("months-select"),
    monthColumnEl: document.querySelector('.months-column'),
    regionSelect: document.getElementById("region-select"),
    regionColumnEl: document.querySelector('.regions-column'),
    spotifyBtn: document.getElementById("spotify"),
    loginDiv: document.querySelector("#login"),
    searchPageText: document.querySelector('.search-page-text'),
    spotifySpan: document.querySelector('.spotify-username'),
    optionsDiv: document.getElementById("options"),
    cardContainerDiv: document.getElementById("card-container"),
}

var hideLoginDiv = function () {
    DOMEl.loginDiv.classList = "hidden";
}

var populateArtistSelectBox = function () {
    hideLoginDiv();

    // Show welcome text at drop-down page
    DOMEl.searchPageText.removeAttribute("class", "hidden");
    DOMEl.searchPageText.setAttribute("class", "center-align");
    // ADD SPOTIFY USERNAME TO SPAN!
    // TODO: Get username and store it in spotifyUser variable
    // spotifySpan.textContent = spotifyUser;

    for (var a of artists) {
        var opt = document.createElement("option");
        opt.value = a;
        opt.textContent = a;
        DOMEl.artSelect.appendChild(opt);
    }

    DOMEl.artColumnEl.removeAttribute("class", "hidden");
    DOMEl.monthColumnEl.removeAttribute("class", "hidden");
    DOMEl.regionColumnEl.removeAttribute("class", "hidden");
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
    card.setAttribute("class", "card small col s4");
    //cardDiv.style.backgroundImage = 'url("https://wallpapertag.com/wallpaper/full/c/1/c/113242-light-gray-background-2560x1440-full-hd.jpg")';

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
function displayErrorModal(str) {
    const errorModalEl = document.querySelector('.modal');
    M.Modal.init(errorModalEl, {
        opacity: 0.6,
        dismissible: true,
        preventScrolling: true,
    });

    let modalContent = document.querySelector('.modal-content');
    console.log(modalContent);
    let modalText = document.createElement('h4');
    console.log(modalText);
    modalText.textContent = 'Uh oh, something went wrong!' + str;
    modalContent.appendChild(modalText);
    console.log(modalContent);
    const instance = M.Modal.getInstance(errorModalEl);
    instance.open();
}

displayErrorModal('hi');

