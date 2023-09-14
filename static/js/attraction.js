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
    let scrollIndex = 0;
    document.querySelector(".image-panel__left-button").addEventListener("click", () => {
        let board = document.querySelector(".image-panel__images-group");
        scrollIndex = scrollIndex<=0 ? scrollIndex : scrollIndex-1;
        board.scrollTo({
            left: scrollIndex*board.offsetWidth,
            behavior: "smooth"
        });
    });
    
    document.querySelector(".image-panel__right-button").addEventListener("click", () => {
        let board = document.querySelector(".image-panel__images-group");
        let element = document.querySelectorAll(".images-group__image");
        scrollIndex = scrollIndex>=element.length-1 ? scrollIndex : scrollIndex+1;
        board.scrollTo({
            left: scrollIndex*board.offsetWidth,
            behavior: "smooth"
        });
    });

    // Prevent the image crack
    window.addEventListener("resize", ()=>{
        let board = document.querySelector(".image-panel__images-group");
        board.scrollTo({
            left: scrollIndex*board.offsetWidth,
            behavior: "instant"
        });
    });
}