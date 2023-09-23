// Wrapping namespace
let baseNamespace = {};

// Main
document.addEventListener("DOMContentLoaded", async() => {
    baseNamespace.checkSignState();
    baseNamespace.moveBasedOneFix();
    baseNamespace.addElementListener();
});

baseNamespace.addElementListener = function addBaseElementListener(){
    // Main page
    document.querySelector(".navigation__left-title").addEventListener("click", () => {
        window.location.href = "/";
    });

    // Sign-in/Sign-up
    // Initialize
    document.querySelector(".navigation__right-option-sign").addEventListener("click", () => {
        baseNamespace.toggleMessageBox("sign-container__sign-up");
    });

    document.querySelector(".navigation__right-option-sign-out").addEventListener("click", () => {
        localStorage.removeItem("jwtToken");
        baseNamespace.resetSignButton();
    });

    // Close
    const closeButtons = document.querySelectorAll(".sign-box__close-button");
    [].forEach.call(closeButtons, function(button){
        button.addEventListener("click", () => {
            const rootId = button.parentElement.parentElement.id;
            baseNamespace.removeMessage(rootId);
            baseNamespace.hideMessageBox();
            baseNamespace.clearInput();
        });
    });

    // Change between sign-in between sign-up
    const messages = document.querySelectorAll(".sign-box__message--cursor");
    [].forEach.call(messages, function(msg){
        msg.addEventListener("click", () => {
            // Prevent click after signing in
            if(baseNamespace.checkSignState()) return;
            const rootId = msg.parentElement.parentElement.parentElement.id;
            baseNamespace.removeMessage(rootId);
            baseNamespace.toggleMessageBox(rootId);
            baseNamespace.clearInput();
        });
    });

    // Submit
    const signButton = document.querySelectorAll(".sign-box__form-button");
    [].forEach.call(signButton, function(button){
        button.addEventListener("click", () => {
            // Prevent click after signing in
            if(baseNamespace.checkSignState()) return;
            const rootId = button.parentElement.parentElement.parentElement.id;
            baseNamespace.handleSign(rootId);
        })
    });
}
// Utitlity
// Initialization
baseNamespace.checkSignState = function checkSignState(){
    if(localStorage.getItem("jwtToken") === null){
        return false;
    }
    let json = baseNamespace.getAuthorization();
    if((json.data !== null) && !("error" in json)){
        baseNamespace.changeSignButton();
        return true;
    }
    return false;
}

baseNamespace.moveBasedOneFix = function moveBasedOneFix(){
    let header = document.querySelector(".header");
    let headerCSS = window.getComputedStyle(header);
    let sibling = header.nextElementSibling;
    if(window.getComputedStyle(sibling).position === "fixed") return;
    sibling.style.marginTop = headerCSS.height;
}

// Handle function
baseNamespace.handleSign = function handleSign(rootId){
    if(rootId === "sign-container__sign-in"){
        baseNamespace.removeMessage(rootId);
        const email = document.getElementById("sign-in-email").value;
        const password = document.getElementById("sign-in-password").value;
        if(email=="" || password==""){
            baseNamespace.addMessage(rootId, "信箱或密碼不可為空", true);
            return;
        }
        baseNamespace.signIn(
            JSON.stringify({
                "email": email,
                "password": password
            })
        ).then( (response) => {
            if(!("token" in response)){
                baseNamespace.addMessage(rootId, response.message, true);
                return;
            }
            baseNamespace.addMessage(rootId, "登入成功", false);
            localStorage.setItem("jwtToken", response.token);
            baseNamespace.changeSignButton();
            baseNamespace.clearInput();
            return;
        });
    }
    if(rootId === "sign-container__sign-up"){
        baseNamespace.removeMessage(rootId);
        const name = document.getElementById("sign-up-name").value;
        const email = document.getElementById("sign-up-email").value;
        const password = document.getElementById("sign-up-password").value;
        if(name=="" || email=="" || password==""){
            baseNamespace.addMessage(rootId, "姓名或信箱或密碼不可為空", true);
            baseNamespace.clearInput();
            return;
        }
        const pattern = /^[0-9a-zA-Z][0-9a-zA-Z.]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if(!pattern.test(email)){
            baseNamespace.addMessage(rootId, "無效的信箱", true);
            baseNamespace.clearInput();
            return;
        }
        baseNamespace.signUp(
            JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        ).then( (response) => {
            if(!("ok" in response)){
                baseNamespace.addMessage(rootId, response.message, true);
                return;
            }
            baseNamespace.addMessage(rootId, "註冊成功", false);
            baseNamespace.clearInput();
            return;
        });
    }
}

baseNamespace.signIn = async function signIn(signBody){
    let fetchURL ="/api/user/auth";
    response = await fetch(fetchURL,
        {
            method: "PUT",
            body: signBody,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }
    );
    json = await response.json();
    return json;
}

baseNamespace.signUp = async function signUp(signBody){
    let fetchURL ="/api/user";
    response = await fetch(fetchURL,
        {
            method: "POST",
            body: signBody,
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }
    );
    json = await response.json();
    return json;
}

baseNamespace.getAuthorization = async function getAuthorization(){
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

// Message Box utility
baseNamespace.toggleMessageBox = function toggleMessageBox(rootId){
    if(rootId === "sign-container__sign-in"){
        document.querySelector("#sign-container__sign-in.sign-container").classList.remove("sign-container--show");
        document.querySelector("#sign-container__sign-up.sign-container").classList.add("sign-container--show");
    }
    if(rootId === "sign-container__sign-up"){
        document.querySelector("#sign-container__sign-in.sign-container").classList.add("sign-container--show");
        document.querySelector("#sign-container__sign-up.sign-container").classList.remove("sign-container--show");
    }
}

baseNamespace.hideMessageBox = function hideMessageBox(){
    document.querySelector("#sign-container__sign-in.sign-container").classList.remove("sign-container--show");
    document.querySelector("#sign-container__sign-up.sign-container").classList.remove("sign-container--show");
}

// Message content utility
baseNamespace.addMessage = function addMessage(rootId, content, isFail){
    if(content === "") return;
    let changeMsg = document.querySelectorAll("#sign-box__message-info");
    [].forEach.call(changeMsg, function(msg){
        if(msg.parentElement.parentElement.parentElement.id === rootId){``
            // Check box content
            if(msg.innerText === "")
                baseNamespace.addBoxHeight(rootId);
            // Color format
            if(isFail)
                msg.classList.add("sign-box__message--fail");
            else
                msg.classList.add("sign-box__message--success");
            msg.classList.add("sign-box__message--show");
            msg.classList.remove("sign-box__message--hide");
            msg.innerText = content;
        }
    });
}

baseNamespace.removeMessage = function removeMessage(rootId){
    let changeMsg = document.querySelectorAll("#sign-box__message-info");
    [].forEach.call(changeMsg, function(msg){
        if(msg.innerText === "") return;
        baseNamespace.subBoxHeight(rootId);
        msg.classList.remove("sign-box__message--show");
        msg.classList.remove("sign-box__message--fail");
        msg.classList.remove("sign-box__message--success");
        msg.classList.add("sign-box__message--hide");
        msg.innerText = "";
    });
}

baseNamespace.addBoxHeight = function addBoxHeight(rootId){
    let changeMsg = document.querySelectorAll(".sign-box__message--cursor");
    [].forEach.call(changeMsg, function(msg){
        if(msg.parentElement.parentElement.parentElement.id === rootId){
            const boxElement = msg.parentElement.parentElement;
            const newHeight = parseFloat(window.getComputedStyle(boxElement).height) + 
                                parseFloat(getComputedStyle(msg).height) + parseFloat(getComputedStyle(msg).marginTop);
            boxElement.style.height = `${newHeight}px`;
        }
    });
}

baseNamespace.subBoxHeight = function subBoxHeight(rootId){
    let changeMsg = document.querySelectorAll(".sign-box__message--cursor");
    [].forEach.call(changeMsg, function(msg){
        if(msg.parentElement.parentElement.parentElement.id === rootId){
            const boxElement = msg.parentElement.parentElement;
            const newHeight = parseFloat(window.getComputedStyle(boxElement).height) -
                                (parseFloat(getComputedStyle(msg).height) + parseFloat(getComputedStyle(msg).marginTop));
            boxElement.style.height = `${newHeight}px`;
        }
    });
}

// Input content utility
baseNamespace.clearInput = function clearInput(){
    document.getElementById("sign-in-email").value = "";
    document.getElementById("sign-in-password").value = "";
    document.getElementById("sign-up-name").value = "";
    document.getElementById("sign-up-email").value = "";
    document.getElementById("sign-up-password").value = "";
}

// Button utility
baseNamespace.changeSignButton = function changeSignButton(){
    document.querySelector(".navigation__right-option-sign").classList.remove("navigation__right-option-sign--show");
    document.querySelector(".navigation__right-option-sign-out").classList.add("navigation__right-option-sign--show");
}

baseNamespace.resetSignButton = function resetSignButton(){
    document.querySelector(".navigation__right-option-sign").classList.add("navigation__right-option-sign--show");
    document.querySelector(".navigation__right-option-sign-out").classList.remove("navigation__right-option-sign--show");
}