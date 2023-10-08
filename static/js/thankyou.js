// Wrapping namespace
let thankyouNamespace = {};

// Main
window.onload = async function thankyouLoading(){
    thankyouNamespace.checkSignState();
    const result = await thankyouNamespace.getOrderByParam();
    thankyouNamespace.createOrderNumber(result);
}

thankyouNamespace.checkSignState = async function checkSignState(){
    let loginCheck = false;
    await baseNamespace.checkSignState()
    .then((isLogin) => {
        loginCheck = isLogin
    })
    if(!loginCheck)
        window.location.href = "/";
}

thankyouNamespace.getOrderByParam = async function getOrderByParam(){
    const urlParams = new URLSearchParams(window.location.search);
    let result;
    await tapPayNamespace.getOrder(urlParams.get("number"))
    .then((response => {
        result = response;
    }))
    return result;
}

thankyouNamespace.createOrderNumber = function createOrderNumber(result){
    const titleRow = document.createElement("div");
    titleRow.classList.add("order-info__title");
    const titleInfo = document.createElement("div");
    titleInfo.classList.add("order-info__text--title");
    titleInfo.classList.add("order-info__title--top");
    
    const numberRow = document.createElement("div");
    numberRow.classList.add("order-info__title");
    numberRow.classList.add("order-info__text--small");
    const numberInfo = document.createElement("div");
    numberInfo.classList.add("order-info__title--top");
    const urlParams = new URLSearchParams(window.location.search);
    titleInfo.innerText = "訂單資訊錯誤";
    numberInfo.innerText = "查詢不到此訂單\u00A0:\u00A0" + urlParams.get("number");
    if(result.data !== null){
        titleInfo.innerText = "感謝您的訂購";
        numberInfo.innerText = "您的訂單編號\u00A0:\u00A0" + urlParams.get("number");
    }
    titleRow.appendChild(titleInfo);
    numberRow.appendChild(numberInfo);

    const boardProfile = document.querySelector(".main");
    boardProfile.appendChild(titleRow);
    boardProfile.appendChild(numberRow);
    return;
}