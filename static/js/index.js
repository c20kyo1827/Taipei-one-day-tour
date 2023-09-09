// Main

document.addEventListener("DOMContentLoaded", async() => {
    this.page = 0;
    this.keyword = null;
    await initializeMrt();
    await initializeAttraction();
    addElementListener();
    console.log("initialize page : " + this.page);
});

// Function definition
// Initialization
async function initializeMrt(){
    console.log("Pre-fetch and initialize the mrts");
    let fetchURL ="/api/mrts";
    response = await fetch(fetchURL);
    json = await response.json();
    const board = document.querySelector(".main__mrt-board");
    json.data.forEach(mrt => {
        const container = document.createElement("div");
        container.innerText = mrt;
        container.classList.add("main__mrt-element");
        board.append(container);
    });
}

async function initializeAttraction(){
    console.log("Pre-fetch and initialize the attractions");
    await loadAttraction(); // await would make function execute totally
}

// Utility
function searchForMrt(){
    this.page = 0;
    this.keyword = document.querySelector(".hero-image__search-input").value;
    clearAttraction();
    loadAttraction();
}

function clearAttraction(){
    const board = document.querySelector(".main__attraction-board");
    while(board.firstChild){
        board.removeChild(board.firstChild);
    }
}

async function loadAttraction(){
    let fetchURL = "/api/attractions?page=";
    console.log("load page : " + this.page);
    if(this.page==null){
        console.log("Error! You should set the page...");
        return ;
    }
    fetchURL += this.page;
    if(this.keyword!=null){
        fetchURL += ("&keyword=" + this.keyword);
    }
    console.log("Fetching the url : " + fetchURL);
    let response = await fetch(fetchURL);
    let json = await response.json();
    const board = document.querySelector(".main__attraction-board");
    await json.data.forEach(data => {
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
    this.page = json.nextPage;
    console.log("json page : " + this.page);
}

// Add listener
function addElementListener(){
    document.querySelector(".header__navigation-left").addEventListener('click', () => {
        window.location.href = "/";
    });
    
    document.querySelector(".hero-image__search-button").addEventListener('click', () => {
        searchForMrt();
    });
    
    // Mrt scrolling operation
    let scrollValue = 0;
    document.querySelector(".main__mrt-left-button").addEventListener('click', () => {
        let board = document.querySelector(".main__mrt-board")
        let element = document.querySelectorAll(".main__mrt-element");
        let cnt = 0;
        let total = 0;
        for(const e of element.values()){
            total += e.offsetWidth;
            if(total-scrollValue >= board.offsetWidth){
                break;
            }
            cnt++;
        }
        scrollValue = scrollValue==0 ? scrollValue : scrollValue-element[cnt].offsetWidth;
        board.scrollTo({
            left: scrollValue,
            behavior: "smooth"
        });
    });
    
    document.querySelector(".main__mrt-right-button").addEventListener('click', () => {
        let board = document.querySelector(".main__mrt-board")
        let element = document.querySelectorAll(".main__mrt-element");
        let cnt = 0;
        let total = 0;
        for(const e of element.values()){
            total += e.offsetWidth;
            if(total-scrollValue >= board.offsetWidth){
                break;
            }
            cnt++;
        }
        scrollValue = cnt+1>=element.length ? scrollValue : scrollValue+element[cnt+1].offsetWidth;
        board.scrollTo({
            left: scrollValue,
            behavior: "smooth"
        });
    });

    let mrts = document.querySelectorAll(".main__mrt-element");
    [].forEach.call(mrts, function(mrt){
        mrt.addEventListener('click', () => {
            document.querySelector(".hero-image__search-input").value = mrt.innerText;
            searchForMrt();
        });
    });
}