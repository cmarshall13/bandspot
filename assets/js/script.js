var DOMEl = {
    artSelect: document.getElementById("artists-select"),
    monthSelect: document.getElementById("months-select"),
    spotifyBtn: document.getElementById("spotify"),
    loginDiv: document.querySelector("#login"),
    optionsDiv: document.getElementById("options"),
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

var displayConcertCards = function(month, artist){
    console.log(month, artist);
}

DOMEl.spotifyBtn.onclick = function(event){
    event.preventDefault();
    requestUserAuthorization();
}

DOMEl.artSelect.onchange =  function(){
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    displayConcertCards(month, artist);
}

DOMEl.monthSelect.onchange = function(){
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    displayConcertCards(month, artist);
}