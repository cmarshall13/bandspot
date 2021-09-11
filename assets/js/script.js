var DOMEl = {
    artSelect: document.getElementById("artists-select"),
    artColumnEl: document.querySelector('.artist-column'),
    monthSelect: document.getElementById("months-select"),
    monthColumnEl: document.querySelector('.months-column'),
    regionSelect: document.getElementById("region-select"),
    regionColumnEl: document.querySelector('.regions-column'),
    spotifyBtn: document.getElementById("spotify"),
    loginDiv: document.querySelector("#login"),
    optionsDiv: document.getElementById("options"),
    cardContainerDiv: document.getElementById("card-container"),
}

var hideLoginDiv = function () {
    DOMEl.loginDiv.classList = "hidden";
}

var showSelectBoxes = function(){
    DOMEl.artColumnEl.classList.remove("hidden");
    DOMEl.monthColumnEl.classList.remove("hidden");
    DOMEl.regionColumnEl.classList.remove("hidden");
    DOMEl.optionsDiv.classList.remove("hidden");
}

var populateRegionSelectBox = function () {
    var opt = document.createElement("option");
    opt.value = userLocation;
    opt.textContent = userLocation;
    DOMEl.regionSelect.appendChild(opt);
    DOMEl.regionSelect.selectedIndex = 1;

    for (var e of eventsArray) {
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

var populateArtistSelectBox = function (artist) {
    hideLoginDiv();

    if (!DOMEl.artSelect.innerHTML.includes(artist)) {
        var opt = document.createElement("option");
        opt.value = artist;
        opt.textContent = artist;
        DOMEl.artSelect.appendChild(opt);
    }
    showSelectBoxes();
}

var displayConcertCards = function(artist, image, show){
    DOMEl.cardContainerDiv.classList.remove("hidden");
    var ticketsAvailable = show.tickets;
    var ticketsBuyLink = show.buyLink;

    // create a new column for the card
    var cardCol = document.createElement("div");
    cardCol.classList = "col s4 m4";

    // create a new card div
    var card = document.createElement("div");
    card.setAttribute("class", "card");

    // card img is the artists image
    var cardImg = document.createElement("div");
    cardImg.classList.add("card-image");

    var img = document.createElement("img");
    img.src = image;

    cardImg.appendChild(img);
    card.appendChild(cardImg);

    // card content contains all the concert information
    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    // card artist is the artists name
    var cardArtist = document.createElement("p");
    cardArtist.textContent = artist;
    cardContent.appendChild(cardArtist);
    
    // card venue is the venue of the concert
    var cardVenue = document.createElement("p");
    cardVenue.textContent = show.venue;
    cardContent.appendChild(cardVenue);

    // card location is the state/region of the concert
    var cardLocation = document.createElement("p");
    cardLocation.textContent = show.location;
    cardContent.appendChild(cardLocation);

    // card date is the date of the concert
    var cardDate = document.createElement("p");
    cardDate.textContent = show.date;
    cardContent.appendChild(cardDate);

    // Create a ticket-buying text-link
    var cardTickets = document.createElement("a");
    cardTickets.classList= "ticket-link";
    cardTickets.target = "_blank";

    if (ticketsAvailable === 'available') {
        cardTickets.textContent = 'BUY TICKETS';
        cardTickets.href = ticketsBuyLink;
        cardTickets.setAttribute("target", "_blank");
    }else{
        cardTickets.textContent = 'TICKETS UNAVAILABLE';
    }
    cardContent.appendChild(cardTickets);

    // append card content div to main card div
    card.appendChild(cardContent);
    // append card to card column div
    cardCol.appendChild(card);

    // append card column to card container div
    DOMEl.cardContainerDiv.appendChild(cardCol);
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
