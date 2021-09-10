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


var populateRegionSelectBox = function () {
    var opt = document.createElement("option");
    opt.value = userLocation;
    opt.textContent = userLocation;
    DOMEl.regionSelect.appendChild(opt);
    DOMEl.regionSelect.selectedIndex = 1;

    for (var e of eventsArray) {
        // check if that event object has any shows
        if (e.shows.length > 0) {
            var region = e.shows[0].region;
            // If the current region does not match any of the options
            if (!DOMEl.regionSelect.innerHTML.includes(region)) {
                // Create and append the new region to the select box
                var opt = document.createElement("option");
                opt.value = region;
                opt.textContent = region;
                DOMEl.regionSelect.appendChild(opt);
            }
        }
    }
}

var populateArtistSelectBox = function (artist) {
    hideLoginDiv();

    // Show welcome text at drop-down page
    DOMEl.searchPageText.removeAttribute("class", "hidden");
    DOMEl.searchPageText.setAttribute("class", "center-align");

    if (!DOMEl.artSelect.innerHTML.includes(artist)) {
        var opt = document.createElement("option");
        opt.value = artist;
        opt.textContent = artist;
        DOMEl.artSelect.appendChild(opt);
    }

    DOMEl.artColumnEl.removeAttribute("class", "hidden");
    DOMEl.monthColumnEl.removeAttribute("class", "hidden");
    DOMEl.regionColumnEl.removeAttribute("class", "hidden");
    DOMEl.optionsDiv.removeAttribute("class", "hidden");
}

var displayConcertCards = function (artist, image, show) {
    // show the card container div
    DOMEl.cardContainerDiv.removeAttribute("class", "hidden");

    var venue = show.venue;
    var date = show.date;
    var time = show.time;
    var location = show.location;
    var ticketsAvailable = show.tickets;
    var ticketsBuyLink = show.buyLink;

    var card = document.createElement("div");
    card.setAttribute("class", "card small col s4");
    card.style.backgroundImage = 'url(' + image + ')';

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card-content-container");

    var cardContentDiv = document.createElement("div");
    cardContentDiv.setAttribute("class", "card-content");

    var cardArtist = document.createElement("h4");
    cardArtist.textContent = artist;

    // Create a ticket-buying text-link
    var cardTickets = document.createElement("a");
    cardTickets.setAttribute("class", "ticket-link");
    cardTickets.setAttribute("target", "_blank");

    if (ticketsAvailable === 'available') {
        cardTickets.textContent = 'BUY TICKETS';
        cardTickets.href = ticketsBuyLink;
        cardTickets.setAttribute("target", "_blank");
    }
    else {
        cardTickets.textContent = 'TICKETS UNAVAILABLE';
    }

    var cardDate = document.createElement("h5");
    cardDate.textContent = date;

    var cardTime = document.createElement("h5");
    cardTime.textContent = time;

    var cardVenue = document.createElement("h5");
    cardVenue.textContent = venue;

    var cardLocation = document.createElement("h5");
    cardLocation.textContent = location;

    // append concert data to content div
    cardContentDiv.appendChild(cardArtist);
    cardContentDiv.appendChild(cardDate);
    cardContentDiv.appendChild(cardTickets);
    cardContentDiv.appendChild(cardTime);
    // cardContentDiv.appendChild(cardVenue);
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
        var image = events.image;
        // loop thru the shows array
        for (var show of events.shows) {
            var location = show.region;
            if (location === userLocation) {
                displayConcertCards(artist, image, show);
            }
        }
    }
}

var filter = function (artistFilter, monthFilter, regionFilter) {
    // empty the card container div
    DOMEl.cardContainerDiv.innerHTML = "";

    for (var events of eventsArray) {
        var artist = events.artist;
        var image = events.image;
        // check if this artist has any shows
        if (events.shows.length > 0) {
            // loop thru the shows array
            for (var show of events.shows) {
                var month = show.date.substring(0, 2);
                var region = show.region;
                // check if all filters are "All"
                if (artistFilter === "All" && monthFilter === "All" && regionFilter === "All") {
                    displayConcertCards(artist, image, show);
                    // check if artist & region are "All"
                } else if (artistFilter === "All" && month === monthFilter && regionFilter === "All") {
                    displayConcertCards(artist, image, show);
                    // check if month & region are "All"
                } else if (artist === artistFilter && monthFilter === "All" && regionFilter === "All") {
                    displayConcertCards(artist, image, show);
                    // check if artist & month are "All"
                } else if (artistFilter === "All" && monthFilter === "All" && region === regionFilter) {
                    displayConcertCards(artist, image, show);
                    // check if all are variable
                } else if (artist === artistFilter && month === monthFilter && region === regionFilter) {
                    displayConcertCards(artist, image, show);
                    // check if month "All"
                } else if (artist === artistFilter && monthFilter === "All" && region === regionFilter) {
                    displayConcertCards(artist, image, show);
                    // check if region is "All"
                } else if (artist === artistFilter && month === monthFilter && regionFilter === "All") {
                    displayConcertCards(artist, image, show);
                } else if (artistFilter === "All" && month === monthFilter && region === regionFilter) {
                    displayConcertCards(artist, image, show);
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
    var region = DOMEl.regionSelect.value;
    filter(artist, month, region);
}

DOMEl.monthSelect.onchange = function () {
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    var region = DOMEl.regionSelect.value;
    filter(artist, month, region);
}

DOMEl.regionSelect.onchange = function () {
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    var region = DOMEl.regionSelect.value;
    filter(artist, month, region);
}

// Modal function
function displayErrorModal(error) {
    const errorModalEl = document.querySelector('.modal');
    M.Modal.init(errorModalEl, {
        opacity: 0.6,
        dismissible: true,
        preventScrolling: true,
    });

    // Select the modal
    let modalContent = document.querySelector('.modal-content');
    // Create an h4 element with the error displayed
    let modalText = document.createElement('h4');
    modalText.textContent = 'Uh oh, something went wrong! ' + error + '.';
    // Append to modal
    modalContent.appendChild(modalText);
    // Open the modal
    const instance = M.Modal.getInstance(errorModalEl);
    instance.open();
}
