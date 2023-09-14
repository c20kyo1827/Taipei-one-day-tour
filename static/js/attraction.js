// Wrapping namespace
let attractionNamespace = {};

// Main
window.onload = async function indexLoading(){
    attractionNamespace.loadAttractions();
    attractionNamespace.addElementListener();
}

attractionNamespace.loadAttractions = async function loadAttractions(){
    console.log(window.location.href.split("/"));
    let fetchURL = "/api/attraction/" + window.location.href.split("/").at(-1);
    let response = await fetch(fetchURL);
    let json = await response.json();
    if(json.data.length===0){
        ;
    }
    // TODO
    // After finishing css, create/append the correpsonding element
    console.log(json);
}

// Add listener
attractionNamespace.addElementListener = function addElementListener(){

    // Image scrolling
    let scrollValue = 0;
    document.querySelector(".image-panel__left-button").addEventListener("click", () => {
        let board = document.querySelector(".image-panel__images-group");
        scrollValue = scrollValue<=0 ? scrollValue : scrollValue-board.offsetWidth;
        board.scrollTo({
            left: scrollValue,
            behavior: "smooth"
        });
    });
    
    document.querySelector(".image-panel__right-button").addEventListener("click", () => {
        let board = document.querySelector(".image-panel__images-group");
        let element = document.querySelectorAll(".images-group__image");
        scrollValue = scrollValue>=element[element.length-1].offsetLeft-board.offsetWidth ? scrollValue : scrollValue+board.offsetWidth;
        board.scrollTo({
            left: scrollValue,
            behavior: "smooth"
        });
    });
}