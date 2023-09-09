// Function definition
// Initialization
function initializeMrt(){
    console.log("Pre-fetch and initialize the mrts");
    let fetchURL ="/api/mrts";
    fetch(fetchURL)
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.data);
        const board = document.querySelector(".main__mrt-board");
        json.data.forEach(mrt => {
            console.log(mrt);
            const container = document.createElement("div");
            container.classList.add("main__mrt-element");
            container.innerText = mrt;
            board.append(container);
        });
    })
    .catch(error => {
        console.log(error);
    })
}

function initializeAttraction(){
    console.log("Pre-fetch and initialize the attractions");
    let fetchURL ="/api/attractions?page=0";
    fetch(fetchURL)
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json.data);
        const board = document.querySelector(".main__attraction-board");
        console.log(board.nextPage);
        json.data.forEach(info => {
            console.log(info);
        });
    })
    .catch(error => {
        console.log(error);
    })
}

// Mrt
function scrollToLeft(){

}

function scrollToRight(){
    
}

function searchForMrt(){
    
}

// Attraction
function loadingNextPage(){

}

// main
initializeMrt();
initializeAttraction();

