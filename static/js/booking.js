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
        console.log(bookingData);
    }
}

bookNamespace.addElementListener = function addElementListener(){
    // Close
    
    // Order
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