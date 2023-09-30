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
        emptyInfo.classList.add("book-panel__text--small");
        emptyInfo.innerText = "目前沒有任何待預訂的行程";
        emptyRow.appendChild(emptyInfo);

        const boardProfile = document.querySelector(".main");
        boardProfile.appendChild(titleRow);
    }
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