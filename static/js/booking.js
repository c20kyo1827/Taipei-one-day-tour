// Wrapping namespace
let bookNamespace = {};

// Main
window.onload = async function indexLoading(){
    bookNamespace.initialization();
    bookNamespace.addElementListener();
}

bookNamespace.initialization = function initialization(){
    // Check authorization => return
    if(!baseNamespace.checkSignState())
        window.location.href = "/";
    else{
        const bookingData = bookNamespace.getBooking();
        bookNamespace.createBookInfo(bookingData);
    }
}

bookNamespace.addElementListener = function addElementListener(){
    // Delete
    document.querySelector(".book-panel__group-delete-icon").addEventListener("click", () => {
        
    });
    // Book
    document.querySelector(".book-panel__button").addEventListener("click", () => {
        // TODO
        // Make the order based on the book info
    });
}

// Utility
// TODO
// Support the multiple booking order
bookNamespace.createBookInfo = function createBookInfo(bookingData){
    // Empty
    if(bookingData.data === null){

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