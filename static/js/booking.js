// Wrapping namespace
let bookNamespace = {};
bookNamespace.isLogin = false;

// Main
window.onload = async function indexLoading(){
    await bookNamespace.initialization();
    bookNamespace.addElementListener();
}

bookNamespace.initialization = async function initialization(){
    // Check authorization => return
    let loginCheck = false;
    await baseNamespace.checkSignState()
    .then((isLogin) => {
        loginCheck = isLogin
    })
    if(!loginCheck)
        window.location.href = "/";
    else{
        await bookNamespace.getBooking()
        .then((bookingData) => {
            // User
            bookNamespace.createUserInfo();
            // Book
            bookNamespace.createBookInfo(bookingData);
            console.log("initial then then");
        })
    }
    console.log("initial out");
    console.log(document.querySelector("#card-code"));
}

bookNamespace.addElementListener = function addElementListener(){
    // Book
    // Sperate space every 4 char
    console.log("Listen");
    console.log(document.querySelector("#card-code"));

    // document.querySelector(".book-panel__button").addEventListener("click", () => {
    //     // TODO
    //     // Make the order based on the book info
    // });
}

// Utility
bookNamespace.createUserInfo = async function createUserInfo(){
    await baseNamespace.getAuthorization()
    .then((userInfo) => {
        const titleRow = document.createElement("div");
        titleRow.classList.add("book-panel__title");
        const titleInfo = document.createElement("div");
        titleInfo.classList.add("book-panel__text--title");
        titleInfo.classList.add("book-panel__title--top");
        titleInfo.innerText = "您好，" + userInfo.data.name + "，待預訂的行程如下\u00A0:\u00A0";
        titleRow.appendChild(titleInfo);

        const boardProfile = document.querySelector(".main");
        boardProfile.insertBefore(titleRow, boardProfile.firstChild);
        console.log("user then");
    })
    console.log("user out");
}

bookNamespace.createBookInfo = async function createBookInfo(bookingData){
    // Empty
    if(bookingData.data === null || "error" in bookingData){
        const emptyRow = document.createElement("div");
        emptyRow.classList.add("book-panel__title");
        emptyRow.classList.add("book-panel__text--small");
        
        const emptyInfo = document.createElement("div");
        emptyInfo.classList.add("book-panel__title--top");
        emptyInfo.innerText = "目前沒有任何待預訂的行程";
        emptyRow.appendChild(emptyInfo);

        const boardProfile = document.querySelector(".main");
        boardProfile.appendChild(emptyRow);
        return;
    }
    // TODO
    // Support the multiple booking order
    bookNamespace.createBookginAttraction(bookingData.data[0]);
    await baseNamespace.getAuthorization()
    .then((userInfo) => {
        bookNamespace.createContactInfo(userInfo);
        console.log("book then");
    })
    bookNamespace.createPayInfo(bookingData.data[0].price);
    console.log("book out");
    console.log(document.querySelector("#card-code"));
}

bookNamespace.createBookginAttraction = function createBookginAttraction(bookingData){
    const bookGroup = document.createElement("div");
    bookGroup.classList.add("book-panel__group");

    const attractionGroup = document.createElement("div");
    attractionGroup.classList.add("book-panel__group-attraction");
    const imageBox = document.createElement("div");
    imageBox.classList.add("group-attraction__image-box");
    const image = document.createElement("img");
    image.classList.add("group-attraction__image");
    image.src = bookingData.attraction.image;
    imageBox.appendChild(image);
    attractionGroup.appendChild(imageBox);

    const attractionBox = document.createElement("div");
    attractionBox.classList.add("group-attraction__info-box");
    const title = document.createElement("div");
    title.classList.add("info-box__title");
    title.innerText = "台北一日遊\u00A0:\u00A0" + bookingData.attraction.name;
    attractionBox.appendChild(title);
    const date = new Date(bookingData.date);
    const dateString = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2)  + "-" + ("0" + date.getDate()).slice(-2);
    const timeString = bookingData.time==="morning" ? "早上9點到下午4點" : "下午4點到晚上9點";
    const text = ["日期\u00A0:\u00A0", "時間\u00A0:\u00A0", "費用\u00A0:\u00A0", "地點\u00A0:\u00A0"];
    const name = [dateString, timeString, "新台幣" + bookingData.price + "元", bookingData.attraction.address];
    for(let i=0 ; i<text.length ; i++){
        const infoRow = document.createElement("div");
        infoRow.classList.add("info-box__row");
        const label = document.createElement("label");
        label.classList.add("info-box__row-lable");
        label.classList.add("book-panel__text--big");
        label.innerText = text[i];
        const content = document.createElement("div");
        content.classList.add("info-box__row-content");
        content.innerText = name[i];
        infoRow.appendChild(label);
        infoRow.appendChild(content);
        attractionBox.appendChild(infoRow);
    }
    attractionGroup.appendChild(attractionBox);
    const deleteIcon = document.createElement("buton");
    deleteIcon.classList.add("book-panel__group-delete-icon");
    deleteIcon.onclick = function clickDelete(){
        bookNamespace.deleteBooking()
        .then((json) =>{
            if((json !== null || json !== undefined) && "ok" in json){
                location.reload();
            }
        })
    }
    attractionGroup.appendChild(deleteIcon);
    bookGroup.appendChild(attractionGroup);

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(bookGroup);
}

bookNamespace.createContactInfo = function createContactInfo(userInfo){
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
        if(input.id === "book-name"){
            input.value = userInfo.data.name;
        }
        if(input.id === "book-email"){
            input.value = userInfo.data.email;
        }
        input.classList.add("book-panel__input-box");
        inputRow.appendChild(label);
        inputRow.appendChild(input);
        bookGroup.appendChild(inputRow);
    }
    const notice = document.createElement("div");
    notice.classList.add("book-panel__text--big");
    notice.id = "book-notice";
    notice.innerText = "請保持手機暢通，準時到達，導覽人員將用手機與您聯繫，務必留下正確的聯絡方式。";
    bookGroup.appendChild(notice);
    
    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(hLine);
    boardProfile.appendChild(titleRow);
    boardProfile.appendChild(bookGroup);
}

bookNamespace.createPayInfo = function createPayInfo(price){
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
            input.inputMode = "numeric";
            input.pattern = "[0-9\s]{4}";
            input.maxLength = "4";
            input.placeholder = "MM / YY";
        }
        if(input.id === "card-password"){
            input.inputMode = "numeric";
            input.pattern = "[0-9\s]{3,4}";
            input.maxLength = "4";
            input.placeholder = "CVV";
        }
        inputRow.appendChild(label);
        inputRow.appendChild(input);
        bookGroup1.appendChild(inputRow);
    }

    const hLine2 = document.createElement("hr");
    hLine2.classList.add("horizontal-line--middle-setting");

    const bookGroup2 = document.createElement("div");
    bookGroup2.classList.add("book-panel__group");
    const priceGroup = document.createElement("div");
    priceGroup.classList.add("book-panel__price-row");
    const priceRow = document.createElement("div");
    priceRow.classList.add("book-panel__input-row");
    priceRow.style.justifyAlign = "right";
    const priceInfo = document.createElement("div");
    priceInfo.classList.add("book-panel__text--big");
    priceInfo.classList.add("book-panel__price-info");
    priceInfo.innerText = "總價\u00A0:\u00A0新台幣\u00A0" + price + "\u00A0元";
    priceRow.appendChild(priceInfo);
    const priceButton = document.createElement("button");
    priceButton.classList.add("book-panel__button");
    priceButton.innerText = "確認訂購並付款";
    priceGroup.appendChild(priceRow);
    priceGroup.appendChild(priceButton);
    bookGroup2.appendChild(priceGroup);
    bookGroup2.style.position = "relative";
    bookGroup2.style.marginBottom = "40px";

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(hLine1);
    boardProfile.appendChild(titleRow);
    boardProfile.appendChild(bookGroup1);
    boardProfile.appendChild(hLine2);
    boardProfile.appendChild(bookGroup2);
}

bookNamespace.getBooking = async function getBooking(){
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

bookNamespace.deleteBooking = async function deleteBooking(){
    let fetchURL ="/api/booking";
    return fetch(fetchURL,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + localStorage.getItem("jwtToken")
            }
        }
    )
    .then( (response) => {return response.json()})
}