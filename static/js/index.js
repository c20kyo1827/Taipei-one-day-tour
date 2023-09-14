// Wrapping namespace
let indexNamespace = {};

// Main
// document.addEventListener("DOMContentLoaded", async() => {
    // console.log("DOMContentLoaded index");
    // indexNamespace.page = 0;
    // indexNamespace.keyword = null;
    // indexNamespace.isDeleting = false;
    // indexNamespace.isObserverCalling = false;
    // await indexNamespace.initializeMrt();
    // await indexNamespace.initializeAttraction();
    // indexNamespace.addElementListener();
    // indexNamespace.addObserver();
// });
window.onload = async function indexLoading(){
    indexNamespace.page = 0;
    indexNamespace.keyword = null;
    indexNamespace.isDeleting = false;
    indexNamespace.isObserverCalling = false;
    await indexNamespace.initializeMrt();
    await indexNamespace.initializeAttraction();
    indexNamespace.addElementListener();
    indexNamespace.addObserver();
}

// Function definition
// Initialization
indexNamespace.initializeMrt = async function initializeMrt(){
    console.log("Pre-fetch and initialize the mrts");
    let fetchURL ="/api/mrts";
    response = await fetch(fetchURL);
    json = await response.json();
    const board = document.querySelector(".mrt__list");
    json.data.forEach(mrt => {
        const container = document.createElement("div");
        container.innerText = mrt;
        container.classList.add("mrt__element");
        board.append(container);
    });
}

indexNamespace.initializeAttraction = async function initializeAttraction(){
    console.log("Pre-fetch and initialize the attractions");
    await indexNamespace.loadAttractions(); // await would make function execute totally
}

indexNamespace.loadAttractions = async function loadAttractions(){
    let fetchURL = "/api/attractions?page=";
    let attractionURL = "/attraction/";
    if(indexNamespace.page==null){
        return ;
    }
    fetchURL += indexNamespace.page;
    if(indexNamespace.keyword!=null){
        fetchURL += ("&keyword=" + indexNamespace.keyword);
    }
    let response = await fetch(fetchURL);
    let json = await response.json();
    const board = document.querySelector(".attraction__board");
    if(json.data.length===0){
        const container = document.createElement("div");
        const info = document.createElement("div");
        info.classList.add("attraction__element-info");
        info.innerText = "查無結果";
        if(indexNamespace.keyword!=null){
            info.innerText = "找不到和查詢的" + indexNamespace.keyword + "相符的結果";
        }
        info.style.height = "100%";
        info.style.justifyContent = "center";

        container.classList.add("attraction__element");
        container.append(info);
        board.append(container);
    }
    json.data.forEach(data => {
        const container = document.createElement("div");
        const hyperlink = document.createElement("a");
        const img = document.createElement("img");
        const name = document.createElement("div");
        const info = document.createElement("div");
        const infoMrt = document.createElement("div");
        const infoCategory = document.createElement("div");
        hyperlink.classList.add("attraction__element-image");
        hyperlink.href = attractionURL + data["id"];
        img.src = data["images"][0];
        img.classList.add("attraction__element-image");
        hyperlink.append(img);

        name.innerText = data["name"];
        name.classList.add("attraction__element-name");
        info.classList.add("attraction__element-info");
        infoMrt.innerText = data["mrt"];
        infoCategory.innerText = data["category"];
        info.append(infoMrt);
        info.append(infoCategory);

        container.classList.add("attraction__element");
        container.append(hyperlink);
        container.append(name);
        container.append(info);
        board.append(container);
    });
    indexNamespace.page = json.nextPage;
}

// Add listener
indexNamespace.addElementListener = function addElementListener(){
    // Utility
    function clearAttraction(){
        const board = document.querySelector(".attraction__board");
        while(board.firstChild){
            board.removeChild(board.firstChild);
        }
    }

    function searchForMrt(){
        indexNamespace.isDeleting = true;
        indexNamespace.page = 0;
        indexNamespace.keyword = document.querySelector(".hero-image__search-input").value;
        clearAttraction();
        indexNamespace.loadAttractions();
        setTimeout(() => {
            indexNamespace.isDeleting = false;
        }, 1000);
    }

    console.log("Add event listener");
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
    document.querySelector(".mrt__left-button").addEventListener("click", () => {
        let board = document.querySelector(".mrt__list")
        let element = document.querySelectorAll(".mrt__element");
        let cnt = 0;
        let total = 0;
        console.log("board : " + board.offsetWidth);
        console.log("current value : " + scrollValue);
        for(const e of element.values()){
            console.log("total : " + total);
            console.log("cnt : " + cnt);
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
    
    document.querySelector(".mrt__right-button").addEventListener("click", () => {
        let board = document.querySelector(".mrt__list")
        let element = document.querySelectorAll(".mrt__element");
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

    let mrts = document.querySelectorAll(".mrt__element");
    [].forEach.call(mrts, function(mrt){
        mrt.addEventListener("click", () => {
            document.querySelector(".hero-image__search-input").value = mrt.innerText;
            searchForMrt();
        });
    });
}

// Add observer
indexNamespace.addObserver = function addObserver(){
    console.log("Add observer");
    const callback = (entries) => {
        if(entries[0].isIntersecting && !indexNamespace.isDeleting && !indexNamespace.isObserverCalling){
            indexNamespace.isObserverCalling = true;
            indexNamespace.loadAttractions();
            setTimeout(() => {
                indexNamespace.isObserverCalling = false;
            }, 1000);
        }
    };
    const observer = new IntersectionObserver(callback);
    observer.observe(document.querySelector(".footer"));
}