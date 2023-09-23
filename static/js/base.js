// Wrapping namespace
let baseNamespace = {};

// Main
document.addEventListener("DOMContentLoaded", async() => {
    baseNamespace.addElementListener();
    baseNamespace.moveBasedOneFix();
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

    // Close
    const closeButtons = document.querySelectorAll(".sign-box__close-button");
    [].forEach.call(closeButtons, function(button){
        button.addEventListener("click", () => {
            const rootId = button.parentElement.parentElement.id;
            baseNamespace.removeMessage(rootId);
            baseNamespace.hideMessageBox();
        });
    });

    // Change between sign-in between sign-up
    const messages = document.querySelectorAll(".sign-box__message--cursor");
    [].forEach.call(messages, function(msg){
        msg.addEventListener("click", () => {
            const rootId = msg.parentElement.parentElement.parentElement.id;
            baseNamespace.removeMessage(rootId);
            baseNamespace.toggleMessageBox(rootId);
        });
    });

    const signButton = document.querySelectorAll(".sign-box__form-button");
    [].forEach.call(signButton, function(button){
        button.addEventListener("click", () => {
            const rootId = button.parentElement.parentElement.parentElement.id;
            baseNamespace.handleSign(rootId);
        })
    });
}

baseNamespace.moveBasedOneFix = function moveBasedOneFix(){
    let header = document.querySelector(".header");
    let headerCSS = window.getComputedStyle(header);
    let sibling = header.nextElementSibling;
    if(window.getComputedStyle(sibling).position === "fixed") return;
    sibling.style.marginTop = headerCSS.height;
}

baseNamespace.handleSign = function handleSign(rootId){
    if(rootId === "sign-container__sign-in"){
        const email = document.getElementById("sign-in-email").value;
        const password = document.getElementById("sign-in-password").value;
        console.log(email);
        if(email=="" || password==""){
            baseNamespace.addMessage(rootId, "信箱或密碼不可為空", true);
            return;
        }
    }
    if(rootId === "sign-container__sign-up"){
        const name = document.getElementById("sign-up-name").value;
        const email = document.getElementById("sign-up-email").value;
        const password = document.getElementById("sign-up-password").value;
        if(name=="" || email=="" || password==""){
            baseNamespace.addMessage(rootId, "姓名或信箱或密碼不可為空", true);
            return;
        }
        const pattern = /^[0-9a-zA-Z][0-9a-zA-Z.]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if(!pattern.test(email)){
            baseNamespace.addMessage(rootId, "無效的信箱", true);
            return;
        }
    }
}

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
        console.log(rootId + " " + msg);
        console.log(msg.parentElement.parentElement.parentElement);
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