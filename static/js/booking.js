// Wrapping namespace
let bookNamespace = {};

// Main
window.onload = async function indexLoading(){
    bookNamespace.initialization();
    bookNamespace.addElementListener();
}

bookNamespace.initialization = function initialization(){
    // Check authorization => return
}

bookNamespace.addElementListener = function addElementListener(){
    // Close
    
    // Order
}

bookNamespace.getBooking = function getBooking(){
    let fetchURL ="/api/user/auth";
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

bookNamespace.newBooking = function newBooking(bookingBody){
    let fetchURL ="/api/user/booking";
    fetch(fetchURL,
        {
            method: "POST",
            body: bookingBody,
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
    let fetchURL ="/api/user/booking";
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