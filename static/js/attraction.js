// Wrapping namespace
let attractionNamespace = {};

// Main
window.onload = async function indexLoading(){
    await attractionNamespace.loadAttractions();
    attractionNamespace.addElementListener();
}

attractionNamespace.loadAttractions = async function loadAttractions(){
    let fetchURL = "/api/attraction/" + window.location.href.split("/").at(-1);
    let response = await fetch(fetchURL);
    let json = await response.json();
    if(json.data.length===0){
        ;
    }
    // Images
    const boardImages = document.querySelector(".image-panel__images-group");
    const boardDot = document.querySelector(".image-panel__dot-group");
    let idCnt = 0;
    json.data.images.forEach(element => {
        const image = document.createElement("img");
        image.src = element;
        image.classList.add("images-group__image");
        boardImages.append(image);

        const dot = document.createElement("div");
        dot.classList.add("dot-group__dot");
        dot.id = idCnt;
        if(idCnt===0){
            dot.classList.add("dot-group__dot-current");
        }
        else{
            dot.classList.add("dot-group__dot-other");
        }
        idCnt++;
        boardDot.append(dot);
    });

    // Profile
    const boardProfile = document.querySelector(".profile");
    const name = document.createElement("div");
    const catAndMrt = document.createElement("div");
    name.innerText = json.data.name;
    name.classList.add("profile__name");
    let mrt_name = json.data.mrt==null ? "" : " at " + json.data.mrt;
    catAndMrt.innerText = json.data.category + mrt_name;
    catAndMrt.classList.add("profile__cat-mrt");
    boardProfile.prepend(catAndMrt, boardProfile.firstElementChild);
    boardProfile.prepend(name, boardProfile.firstElementChild);

    // Info
    const boardInfo = document.querySelector(".info");
    const description = document.createElement("div");
    const address = document.createElement("div");
    const transport = document.createElement("div");
    description.innerText = json.data.description;
    description.classList.add("info__content");
    address.innerText = json.data.address;
    address.classList.add("info__content");
    transport.innerText = json.data.transport;
    transport.classList.add("info__content");
    boardInfo.firstElementChild.after(address);
    boardInfo.lastElementChild.after(transport);
    boardInfo.prepend(description, boardInfo.firstElementChild);
}

// Add listener
attractionNamespace.addElementListener = function addElementListener(){
    // Utility
    let scrollIndex = 0;
    function moveCurrentDot(preIndex){
        let dot = document.querySelector("#" + CSS.escape(preIndex)+".dot-group__dot");
        dot.classList.remove("dot-group__dot-current");
        dot = document.querySelector("#" + CSS.escape(scrollIndex)+".dot-group__dot");
        dot.classList.remove("dot-group__dot-other");
        dot.classList.add("dot-group__dot-current");
    }

    // Order time
    document.querySelector("input[value=first-half-day]").addEventListener("click", () => {
        const money = document.querySelector("#money-selector");
        money.innerText = 2000;
    });
    document.querySelector("input[value=second-half-day]").addEventListener("click", () => {
        const money = document.querySelector("#money-selector");
        money.innerText = 2500;
    });

    // Image scrolling
    document.querySelector(".image-panel__left-button").addEventListener("click", () => {
        let board = document.querySelector(".image-panel__images-group");
        let element = document.querySelectorAll(".images-group__image");
        let oldIndex = scrollIndex;
        scrollIndex--;
        scrollIndex = scrollIndex<0 ? scrollIndex+element.length : scrollIndex;
        moveCurrentDot(oldIndex);
        board.scrollTo({
            left: scrollIndex*board.offsetWidth,
            behavior: "smooth"
        });
    });
    
    document.querySelector(".image-panel__right-button").addEventListener("click", () => {
        let board = document.querySelector(".image-panel__images-group");
        let element = document.querySelectorAll(".images-group__image");
        let oldIndex = scrollIndex;
        scrollIndex++;
        scrollIndex = scrollIndex%element.length;
        moveCurrentDot(oldIndex);
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

    // Carousel
    let dots = document.querySelectorAll(".dot-group__dot");
    [].forEach.call(dots, function(dot){
        dot.addEventListener("click", () => {
            let board = document.querySelector(".image-panel__images-group");
            let oldIndex = scrollIndex;
            scrollIndex = dot.id;
            moveCurrentDot(oldIndex);
            board.scrollTo({
                left: dot.id*board.offsetWidth,
                behavior: "smooth"
            });
        });
    });

    // document.querySelector("image-panel__images-group").addEventListener("mouseover", ()=>{
    //     setInterval(()=>{
    //         let board = document.querySelector(".image-panel__images-group");
    //         let element = document.querySelectorAll(".images-group__image");
    //         let oldIndex = scrollIndex;
    //         scrollIndex++;
    //         scrollIndex = scrollIndex%element.length;
    //         moveCurrentDot(oldIndex);
    //         board.scrollTo({
    //             left: scrollIndex*board.offsetWidth,
    //             behavior: "smooth"
    //         });
    //     }, 3000);
    // });
}