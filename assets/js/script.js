var DOMEl = {
    artSelect: document.getElementById("artists-select"),
    monthSelect: document.getElementById("months-select")
}

var hideLoginDiv = function(){
    DOMEl.loginDiv.style.display = "none";
}

var populateSelectBox = function(){
    hideLoginDiv();

    for(var a of artists){
        var opt = document.createElement("option");
        opt.value = a;
        opt.textContent = a;
        DOMEl.artSelect.appendChild(opt);
    }
    DOMEl.optionsDiv.style.display = "flex";
}

var displayConcertCards = function(month, artist){
    console.log(month, artist);
}

DOMEl.artSelect.addEventListener("change", function(){
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    displayConcertCards(month, artist);
})

DOMEl.monthSelect.addEventListener("change", function(){
    var month = DOMEl.monthSelect.value;
    var artist = DOMEl.artSelect.value;
    displayConcertCards(month, artist);
})