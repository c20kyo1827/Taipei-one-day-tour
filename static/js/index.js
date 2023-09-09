// Main
document.addEventListener("DOMContentLoaded", async() => {
    this.page = 0;
    this.keyword = null;
    this.deletFlag = false;
    await initializeMrt();
    await initializeAttraction();
    addElementListener();
    addObserver();
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
    this.deletFlag = true;
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
    if(this.page==null){
        return ;
    }
    fetchURL += this.page;
    if(this.keyword!=null){
        fetchURL += ("&keyword=" + this.keyword);
    }
    let response = await fetch(fetchURL);
    let json = await response.json();
    const board = document.querySelector(".main__attraction-board");
    if(json.data.length===0){
        const container = document.createElement("div");
        const info = document.createElement("div");
        info.classList.add("main__attraction-info");
        info.innerText = "查無結果";
        if(this.keyword!=null){
            info.innerText = "找不到和查詢的" + this.keyword + "相符的結果";
        }
        info.style.height = "100%";
        info.style.justifyContent = "center";

        container.classList.add("main__attraction-element");
        container.append(info);
        board.append(container);
    }
    json.data.forEach(data => {
        const container = document.createElement("div");
        const img = document.createElement("img");
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
}

// Add listener
function addElementListener(){
    document.querySelector(".header__navigation-left").addEventListener("click", () => {
        window.location.href = "/";
    });
    
    document.querySelector(".hero-image__search-button").addEventListener("click", () => {
        searchForMrt();
    });

    document.querySelector(".hero-image__search-input").addEventListener("keyup", (event) => {
        if(event.isComposing) return;
        if(event.key === "Enter"){
            searchForMrt();
        }
    });
    
    // Mrt scrolling operation
    let scrollValue = 0;
    document.querySelector(".main__mrt-left-button").addEventListener("click", () => {
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
    
    document.querySelector(".main__mrt-right-button").addEventListener("click", () => {
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
        mrt.addEventListener("click", () => {
            document.querySelector(".hero-image__search-input").value = mrt.innerText;
            searchForMrt();
        });
    });
}

// Add observer
function addObserver(){
    const callback = (entries) => {
        if(entries[0].isIntersecting && !this.deletFlag){
            loadAttraction();
        }
        this.deletFlag = false;
    };
    const observer = new IntersectionObserver(callback);
    observer.observe(document.querySelector(".footer"));
}