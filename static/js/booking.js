// Wrapping namespace
let bookNamespace = {};
bookNamespace.isLogin = false;

// Main
window.onload = async function indexLoading(){
    bookNamespace.initialization();
    bookNamespace.addElementListener();
}

bookNamespace.initialization = function initialization(){
    // Check authorization => return
    baseNamespace.checkSignState()
        .then((isLogin) => {
            if(!isLogin)
                window.location.href = "/";
            else{
                // User
                bookNamespace.createUserInfo();
                // Book
                bookNamespace.getBooking()
                .then((bookingData) => {
                    bookNamespace.createBookInfo(bookingData);
                })
            }
        })
    
}

bookNamespace.addElementListener = function addElementListener(){
    // Delete
    // document.querySelector(".book-panel__group-delete-icon").addEventListener("click", () => {
        
    // });
    // Book
    // document.querySelector(".book-panel__button").addEventListener("click", () => {
    //     // TODO
    //     // Make the order based on the book info
    // });
}

// Utility
bookNamespace.createUserInfo = function createUserInfo(){
    baseNamespace.getAuthorization()
    .then((userInfo) => {
        const titleRow = document.createElement("div");
        titleRow.classList.add("book-panel__title");
        const titleInfo = document.createElement("div");
        titleInfo.classList.add("book-panel__text--title");
        titleInfo.classList.add("book-panel__title--top");
        titleInfo.innerText = "您好，" + userInfo.data.name + "，待預訂的行程如下:";
        titleRow.appendChild(titleInfo);

        const boardProfile = document.querySelector(".main");
        boardProfile.appendChild(titleRow);
    })
}

// TODO
// Support the multiple booking order
bookNamespace.createBookInfo = function createBookInfo(bookingData){
    console.log(bookingData);
    // Empty
    if(bookingData.data === null){
        const emptyRow = document.createElement("div");
        emptyRow.classList.add("book-panel__title");
        emptyRow.classList.add("book-panel__text--small");
        
        const emptyInfo = document.createElement("div");
        emptyInfo.classList.add("book-panel__title--top");
        emptyInfo.innerText = "目前沒有任何待預訂的行程";
        emptyRow.appendChild(emptyInfo);

        const boardProfile = document.querySelector(".main");
        boardProfile.appendChild(emptyRow);
    }
    bookNamespace.createBookginAttraction(bookingData);
    bookNamespace.createContactInfo(bookingData);
    bookNamespace.createPayInfo(bookingData);
}

bookNamespace.createBookginAttraction = function createBookginAttraction(bookingData){
    const bookGroup = document.createElement("div");
    bookGroup.classList.add("book-panel__group");

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(bookGroup);
}

bookNamespace.createContactInfo = function createContactInfo(bookingData){
    const hLine = document.createElement("hr");
    hLine.classList.add("horizontal-line--middle-setting");

    const titleRow = document.createElement("div");
    titleRow.classList.add("book-panel__title");
    const titleInfo = document.createElement("div");
    titleInfo.classList.add("book-panel__text--title");
    titleInfo.classList.add("book-panel__title--other");
    titleInfo.innerText = "您的連絡資訊";
    titleRow.appendChild(titleInfo);

    const bookGroup = document.createElement("div");
    bookGroup.classList.add("book-panel__group");
    bookGroup.classList.add("book-panel__group--setting-gap");
    const text = ["聯絡姓名\u00A0:\u00A0", "聯絡信箱\u00A0:\u00A0", "手機號碼\u00A0:\u00A0"];
    const name = ["book-name", "book-email", "book-cellphone"];
    for(let i=0 ; i<text.length ; i++){
        const inputRow = document.createElement("div");
        inputRow.classList.add("book-panel__input-row");
        inputRow.classList.add("book-panel__text--small");
        const label = document.createElement("label");
        label.classList.add("book-panel__text--big");
        label.htmlFor = name[i];
        label.innerText = text[i];
        const input = document.createElement("input");
        input.type = "text";
        input.id = label.htmlFor;
        input.classList.add("book-panel__input-box");
        inputRow.append(label);
        inputRow.append(input);
        bookGroup.append(inputRow);
    }
    
    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(hLine);
    boardProfile.appendChild(bookGroup);
}

bookNamespace.createPayInfo = function createPayInfo(bookingData){
    const hLine = document.createElement("hr");
    hLine.classList.add("horizontal-line--middle-setting");

    const titleRow = document.createElement("div");
    titleRow.classList.add("book-panel__title");
    const titleInfo = document.createElement("div");
    titleInfo.classList.add("book-panel__text--title");
    titleInfo.classList.add("book-panel__title--other");
    titleInfo.innerText = "您的連絡資訊";
    titleRow.appendChild(titleInfo);

    const bookGroup = document.createElement("div");
    bookGroup.classList.add("book-panel__group");

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(hLine);
    boardProfile.appendChild(bookGroup);
}

bookNamespace.getBooking = function getBooking(){
    let fetchURL ="/api/booking";
    return fetch(fetchURL,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + localStorage.getItem("jwtToken")
            }
        }
    )
    .then( (response) => {return response.json()})
}

bookNamespace.deleteBooking = function deleteBooking(){
    let fetchURL ="/api/booking";
    return fetch(fetchURL,
        {
            method: "DELET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + localStorage.getItem("jwtToken")
            }
        }
    )
    .then( (response) => {return response.json()})
}