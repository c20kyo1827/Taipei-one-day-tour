let page = 0;
let keyword = null;

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
        const board = document.querySelector(".main__mrt-board");
        json.data.forEach(mrt => {
            const container = document.createElement("div");
            container.innerText = mrt;
            container.classList.add("main__mrt-element");
            board.append(container);
        });
    })
    .catch(error => {
        console.log(error);
    })
}

function initializeAttraction(){
    console.log("Pre-fetch and initialize the attractions");
    loadAttraction(page, keyword);
}

// Mrt
function scrollToLeft(){

}

function scrollToRight(){
    
}

function searchForMrt(){
    
}

// Attraction
function loadAttraction(page, keyword){
    let fetchURL = "/api/attractions?page=";
    if(page==null){
        console.log("Error! You should set the page...");
        return ;
    }
    fetchURL += page;
    if(keyword!=null){
        fetchURL += ("&keyword=" + keyword);
    }
    console.log("Fetching the url : " + fetchURL);
    let result;
    fetch(fetchURL)
    .then(response => {
        return response.json();
    })
    .then(json => {
        const board = document.querySelector(".main__attraction-board");
        if(json == null) return;
        json.data.forEach(data => {
            const container = document.createElement("div");
            const img = document.createElement('img');
            const name = document.createElement("div");
            const info = document.createElement("div");
            const infoMrt = document.createElement("div");
            const infoCategory = document.createElement("div");
            img.src = data["images"][0];
            img.classList.add("main__attraction-image");

            name.innerText = data["name"];
            name.classList.add("main__attraction-name");
            info.classList.add("main__attraction-info");
            infoMrt.innerText = data["mrt"];
            infoCategory.innerText = data["category"];
            info.append(infoMrt);
            info.append(infoCategory);

            container.classList.add("main__attraction-element");
            container.append(img);
            container.append(name);
            container.append(info);
            board.append(container);
        });
    })
    .catch(error => {
        console.log(error);
    })
    return result;
}

// main
initializeMrt();
initializeAttraction();

