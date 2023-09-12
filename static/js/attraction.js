// Wrapping namespace
let attractionNamespace = {};

// Main
window.onload = async function indexLoading(){
    attractionNamespace.loadAttractions();
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