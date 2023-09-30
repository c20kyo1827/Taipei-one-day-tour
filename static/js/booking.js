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
    bookNamespace.createContactInfo();
    bookNamespace.createPayInfo(bookingData.data[0].time);
}

bookNamespace.createBookginAttraction = function createBookginAttraction(bookingData){
    const bookGroup = document.createElement("div");
    bookGroup.classList.add("book-panel__group");

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(bookGroup);
}

bookNamespace.createContactInfo = function createContactInfo(){
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
    const notice = document.createElement("div");
    notice.classList.add("book-panel__text--big");
    notice.id = "book-notice";
    notice.innerText = "請保持手機暢通，準時到達，導覽人員將用手機與您聯繫，務必留下正確的聯絡方式。";
    bookGroup.append(notice);
    
    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(hLine);
    boardProfile.appendChild(titleRow);
    boardProfile.appendChild(bookGroup);
}

bookNamespace.createPayInfo = function createPayInfo(time){
    const hLine1 = document.createElement("hr");
    hLine1.classList.add("horizontal-line--middle-setting");

    const titleRow = document.createElement("div");
    titleRow.classList.add("book-panel__title");
    const titleInfo = document.createElement("div");
    titleInfo.classList.add("book-panel__text--title");
    titleInfo.classList.add("book-panel__title--other");
    titleInfo.innerText = "信用卡付款資訊";
    titleRow.appendChild(titleInfo);

    const bookGroup1 = document.createElement("div");
    bookGroup1.classList.add("book-panel__group");
    const text = ["卡片號碼\u00A0:\u00A0", "過期時間\u00A0:\u00A0", "驗證密碼\u00A0:\u00A0"];
    const name = ["card-code", "card-date", "card-password"];
    const type = ["tel", "text", "password"];
    for(let i=0 ; i<text.length ; i++){
        const inputRow = document.createElement("div");
        inputRow.classList.add("book-panel__input-row");
        inputRow.classList.add("book-panel__text--small");
        const label = document.createElement("label");
        label.classList.add("book-panel__text--big");
        label.htmlFor = name[i];
        label.innerText = text[i];
        const input = document.createElement("input");
        input.type = type[i];
        input.id = label.htmlFor;
        input.classList.add("book-panel__input-box");
        if(input.id === "card-code"){
            input.inputMode = "numeric";
            input.pattern = "[0-9\s]{13,19}";
            // input.autocomplete = "cc-number";
            input.maxLength = "19";
            input.placeholder = "**** **** **** ****";
        }
        if(input.id === "card-date"){
            input.placeholder = "MM / YY";
        }
        if(input.id === "card-password"){
            input.placeholder = "CVV";
        }
        inputRow.append(label);
        inputRow.append(input);
        bookGroup1.append(inputRow);
    }

    const hLine2 = document.createElement("hr");
    hLine2.classList.add("horizontal-line--middle-setting");

    const bookGroup2 = document.createElement("div");
    bookGroup2.classList.add("book-panel__group");
    const priceGroup = document.createElement("div");
    priceGroup.classList.add("book-panel__price-row");
    const priceRow = document.createElement("div");
    priceRow.classList.add("book-panel__input-row");
    const priceInfo1 = document.createElement("div");
    priceInfo1.classList.add("book-panel__text--big");
    priceInfo1.innerText = "總價\u00A0:\u00A0新台幣";
    const priceInfo2 = document.createElement("div");
    priceInfo2.classList.add("book-panel__text--big");
    priceInfo2.id = "money-selector";
    if(time === "morning") priceInfo2.innerHTML = "2000元";
    else priceInfo2.innerHTML = "2500元";
    priceRow.appendChild(priceInfo1);
    priceRow.appendChild(priceInfo2);
    const priceButton = document.createElement("button");
    priceButton.classList.add("book-panel__button");
    priceButton.innerText = "確認訂購並付款";
    priceGroup.append(priceRow);
    priceGroup.append(priceButton);
    bookGroup2.append(priceGroup);
    bookGroup2.style.position = "relative";
    bookGroup2.style.marginBottom = "40px";

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(hLine1);
    boardProfile.appendChild(titleRow);
    boardProfile.appendChild(bookGroup1);
    boardProfile.appendChild(hLine2);
    boardProfile.appendChild(bookGroup2);
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