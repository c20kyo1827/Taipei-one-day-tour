// TODO
// Support multiple order
let tapPayNamespace = {};

tapPayNamespace.setTPD = function setTPD(){
    if(
        document.querySelector(".book-panel__button") == null ||
        document.getElementById("card-number") == null ||
        document.getElementById("card-date") == null ||
        document.getElementById("card-ccv") == null
    ){
        return;
    }
    // Const declaration
    const submitButton = document.querySelector(".book-panel__button")
    const setupField = {
        number: {
            element: document.getElementById("card-number"),
            placeholder: "**** **** **** ****"
        },
        expirationDate: {
            element: document.getElementById("card-date"),
            placeholder: "MM / YY"
        },
        ccv: {
            element: document.getElementById("card-ccv"),
            placeholder: "後三碼"
        }
    };
    const setupStyle = {
        "input": {
            "color": "gray"
        },
        ":focus": {
            "color": "black"
        },
        ".valid": {
            "color": "green"
        },
        ".invalid": {
            "color": "red"
        }
    };
    const setupNumberRange = {
        beginIndex: 6, 
        endIndex: 11
    };

    // Function declaration
    function changeStyleFromStatus(state, groupName){
        if (state === 2) {
            setCardGroupToError(groupName);
        } else if (state === 0) {
            setCardGroupToSuccess(groupName);
        } else {
            setGroupToNormal(groupName);
        }
    }

    function setCardGroupToError(selector) {
        document.querySelector(selector).classList.add("has-error");
        document.querySelector(selector).classList.remove("has-success");
    }
    
    function setCardGroupToSuccess(selector) {
        document.querySelector(selector).classList.remove("has-error");
        document.querySelector(selector).classList.add("has-success");
    }
    
    function setGroupToNormal(selector) {
        document.querySelector(selector).classList.remove("has-error");
        document.querySelector(selector).classList.remove("has-success");
    }
    
    function forceBlurIos() {
        if (!isIos()) {
            return;
        }
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        // Insert to active element to ensure scroll lands somewhere relevant
        document.activeElement.prepend(input);
        input.focus();
        input.parentNode.removeChild(input);
    }
    
    function isIos() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }

    // TapPay main
    TPDirect.setupSDK(137092, "app_qbhs7pK1Dn1wz9dCzmf4ut3EaGeepM86cBOwDLgDHMrXDMyBsmKSNTJhYe82", "sandbox");

    TPDirect.card.setup({
        fields: setupField,
        styles: setupStyle,
        isMaskCreditCardNumber: true,
        maskCreditCardNumberRange: setupNumberRange
    })

    TPDirect.card.onUpdate(function (update) {
        // Disable / enable submit button depend on update.canGetPrime
        // Use the tapPayNamespace.isContactInfoDone()
        if (update.canGetPrime) {
            submitButton.removeAttribute("disabled")
        }
        else {
            submitButton.setAttribute("disabled", true)
        }

        // // Change card type display when card type change 
        // // cardTypes = ["visa", "mastercard", ...]
        // var newType = update.cardType === "unknown" ? "" : update.cardType;
        // document.querySelector("#card-type").textContent = newType;

        // Change style when tappay field status change
        changeStyleFromStatus(update.status.number, ".card-number-group");
        changeStyleFromStatus(update.status.expiry, ".card-date-group");
        changeStyleFromStatus(update.status.ccv, ".card-ccv-group");
    })

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        // fix keyboard issue in iOS device
        forceBlurIos();
        
        const tappayStatus = TPDirect.card.getTappayFieldsStatus();

        // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
        if (tappayStatus.canGetPrime === false) {
            console.log("can not get prime");
            return;
        }

        // Get prime
        TPDirect.card.getPrime(function (result) {
            if (result.status !== 0) {
                console.log("get prime error " + result.msg);
                return;
            }
            tapPayNamespace.collectOrder(result.card.prime)
            .then((orderBody)=>{
                tapPayNamespace.newOrder(orderBody)
                .then((response) => {
                    window.location.href = "/thankyou?number=" + response.data.number;
                });
            })
        })
    })
}

// Utility
tapPayNamespace.isContactInfoDone = function isContactInfoDone(){
    const name = document.getElementById("book-name").value;
    const eamil = document.getElementById("book-email").value;
    const cellphone = document.getElementById("book-cellphone").value;
    return name !== "" && eamil !== "" && cellphone !== "";
}

tapPayNamespace.collectOrder = async function collectOrder(prime){
    // Attraction info
    bookingData = await bookNamespace.getBooking();
    // Contact info
    const name = document.getElementById("book-name").value;
    const email = document.getElementById("book-email").value;
    const cellphone = document.getElementById("book-cellphone").value;
    return JSON.stringify({
        "prime": prime,
        "order": {
            "price": bookingData["data"][0]["price"],
            "trip": {
                "attraction": {
                    "id": bookingData["data"][0]["attraction"]["id"],
                    "name": bookingData["data"][0]["attraction"]["name"],
                    "address": bookingData["data"][0]["attraction"]["address"],
                    "image": bookingData["data"][0]["attraction"]["image"]
                },
                "date": bookingData["data"][0]["date"],
                "time": bookingData["data"][0]["time"]
            },
            "contact": {
                "name": name,
                "email": email,
                "phone": cellphone
            }
        }
    });
}

tapPayNamespace.newOrder = async function newOrder(OrderBody){
    let fetchURL ="/api/orders";
    return fetch(fetchURL,
        {
            method: "POST",
            body: OrderBody,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + localStorage.getItem("jwtToken")
            }
        }
    )
    .then( (response) => {return response.json()})
}

tapPayNamespace.getOrder = async function getOrder(orderNumber){
    let fetchURL ="/api/order/" + orderNumber;
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