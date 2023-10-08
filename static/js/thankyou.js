// Wrapping namespace
let thankyouNamespace = {};

// Main
window.onload = async function thankyouLoading(){
    thankyouNamespace.checkOrderWithMember();
    thankyouNamespace.createOrderNumber();
}

thankyouNamespace.checkOrderWithMember = async function checkOrderWithMember(){
    let loginCheck = false;
    await baseNamespace.checkSignState()
    .then((isLogin) => {
        loginCheck = isLogin
    })
    if(!loginCheck)
        window.location.href = "/";

    const urlParams = new URLSearchParams(window.location.search);
    tapPayNamespace.getOrder(urlParams.get("number"))
    .then((response => {
        console.log(response);
    }))
}

thankyouNamespace.createOrderNumber = function createOrderNumber(){
    const numberRow = document.createElement("div");
    numberRow.classList.add("order-info__title");
    numberRow.classList.add("order-info__text--small");
    
    const numberInfo = document.createElement("div");
    numberInfo.classList.add("order-info__title--top");
    const urlParams = new URLSearchParams(window.location.search);
    numberInfo.innerText = "您的訂單編號\u00A0:\u00A0" + urlParams.get("number");
    numberRow.appendChild(numberInfo);

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(numberRow);
    return;
}