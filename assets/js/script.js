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
    DOMEl.artSelect.style.display = "initial";
    DOMEl.artLabel.style.display = "initial";
}