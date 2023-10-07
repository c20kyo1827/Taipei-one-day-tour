let tapPayNamespace = {};
tapPayNamespace.setTPD = function setTPD(){
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
        if (update.canGetPrime) {
            submitButton.removeAttribute("disabled")
        } else {
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

    // $("form").on("submit", function (event) {
    submitButton.addEventListener("click", (event) => {
        console.log(event);
        event.preventDefault();
        
        // fix keyboard issue in iOS device
        forceBlurIos();
        
        const tappayStatus = TPDirect.card.getTappayFieldsStatus();
        console.log(tappayStatus);

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
            console.log("get prime successfully, prime: " + result.card.prime);
            // var command = `
            // Use following command to send to server \n\n
            // curl -X POST https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime \\
            // -H 'content-type: application/json' \\
            // -H 'x-api-key: partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM' \\
            // -d '{
            //     "partner_key": "partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM",
            //     "prime": "${result.card.prime}",
            //     "amount": "1",
            //     "merchant_id": "GlobalTesting_CTBC",
            //     "details": "Some item",
            //     "cardholder": {
            //         "phone_number": "+886923456789",
            //         "name": "王小明",
            //         "email": "LittleMing@Wang.com",
            //         "zip_code": "100",
            //         "address": "台北市天龍區芝麻街1號1樓",
            //         "national_id": "A123456789"
            //     }
            // }'`.replace(/                /g, '');
            // document.querySelector('#curl').innerHTML = command;
        })
    })
}