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
                const bookingData = bookNamespace.getBooking();
                bookNamespace.createBookInfo(bookingData);
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
    // const userInfo = baseNamespace.getAuthorization();
    // console.log(userInfo);
    const titleRow = document.createElement("div");
    titleRow.classList.add("book-panel__title");
    const titleInfo = document.createElement("div");
    titleInfo.classList.add("book-panel__text--title");
    titleInfo.classList.add("book-panel__title--top");
    titleInfo.innerText = "您好，" + name + "，待的預定行程如下:";
    titleRow.appendChild(titleInfo);

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(titleRow);
}

// TODO
// Support the multiple booking order
bookNamespace.createBookInfo = function createBookInfo(bookingData){
    console.log(bookingData);
    // Empty
    if(bookingData.data === null){
        document.createElement("div");
    }
}

bookNamespace.getBooking = function getBooking(){
    let fetchURL ="/api/booking";
    fetch(fetchURL,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + localStorage.getItem("jwtToken")
            }
        }
    )
    .then( (response) => {return response.json()})
    .then( (json) => {
        return json;
    })
}

bookNamespace.deleteBooking = function deleteBooking(){
    let fetchURL ="/api/booking";
    fetch(fetchURL,
        {
            method: "DELET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + localStorage.getItem("jwtToken")
            }
        }
    )
    .then( (response) => {return response.json()})
    .then( (json) => {
        return json;
    })
}