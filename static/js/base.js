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
    document.querySelector(".navigation__right-option-sign").addEventListener("click", () => {
        document.querySelector("#sign-container__sign-in.sign-container").classList.add("sign-container--show");
        document.querySelector("#sign-container__sign-up.sign-container").classList.remove("sign-container--show");
    });

    const closeButtons = document.querySelectorAll(".sign-box__close-button");
    [].forEach.call(closeButtons, function(button){
        button.addEventListener("click", () => {
            document.querySelector("#sign-container__sign-in.sign-container").classList.remove("sign-container--show");
            document.querySelector("#sign-container__sign-up.sign-container").classList.remove("sign-container--show");
        });
    });

    const messages = document.querySelectorAll(".sign-box__message--cursor");
    [].forEach.call(messages, function(msg){
        msg.addEventListener("click", () => {
            const rootId = msg.parentElement.parentElement.parentElement.id;
            if(rootId === "sign-container__sign-in"){
                document.querySelector("#sign-container__sign-in.sign-container").classList.remove("sign-container--show");
                document.querySelector("#sign-container__sign-up.sign-container").classList.add("sign-container--show");
            }
            if(rootId === "sign-container__sign-up"){
                document.querySelector("#sign-container__sign-in.sign-container").classList.add("sign-container--show");
                document.querySelector("#sign-container__sign-up.sign-container").classList.remove("sign-container--show");
            }
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
        const email = document.querySelector("input[name='email'][id='sign-box__form-sign-in']").value;
        const password = document.querySelector("input[name='password'][id='sign-box__form-sign-in']").value;
        console.log(email);
        if(email=="" || password==""){
            const msg = document.createElement("div");
            msg.classList.add("sign-box__message");
            msg.setAttribute("id", "sign-message");
            msg.innerText = "信箱或密碼不可為空";
            console.log(msg);
            baseNamespace.appendMessage(rootId, msg);
            return;
        }
    }
    if(rootId === "sign-container__sign-up"){
        const name = document.querySelector("input[name='name'][id='sign-box__form-sign-up']").value;
        const email = document.querySelector("input[name='email'][id='sign-box__form-sign-up']").value;
        const password = document.querySelector("input[name='password'][id='sign-box__form-sign-up']").value;
        if(name=="" || email=="" || password==""){
            const msg = document.createElement("div");
            msg.classList.add("sign-box__message");
            msg.setAttribute("id", "sign-message");
            msg.innerText = "姓名或信箱或密碼不可為空";
            console.log(msg);
            baseNamespace.appendMessage(rootId, msg);
            return;
        }
        const pattern = /^[0-9a-zA-Z][0-9a-zA-Z.]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if(!pattern.test(email)){
            const msg = document.createElement("div");
            msg.classList.add("sign-box__message");
            msg.setAttribute("id", "sign-message");
            msg.innerText = "無效的信箱";
            console.log(msg);
            baseNamespace.appendMessage(rootId, msg);
            return;
        }
    }
}

baseNamespace.appendMessage = function appendMessage(rootId, newDiv){
    let changeMsg = document.querySelectorAll(".sign-box__message--cursor");
    [].forEach.call(changeMsg, function(msg){
        console.log(rootId + " " + msg);
        console.log(msg.parentElement.parentElement.parentElement);
        if(msg.parentElement.parentElement.parentElement.id === rootId){
            const parentElement = msg.parentElement;
            const rootElement = msg.parentElement.parentElement.parentElement;
            console.log(parentElement);
            console.log(rootElement);
            console.log(newDiv);
            const newHeight = rootElement.clientHeight + msg.clientHeight;
            rootElement.style.height = `${newHeight}px`;
            console.log(rootElement.clientHeight);
            console.log(msg.clientHeight);
            parentElement.insertBefore(newDiv, msg);
        }
    });
}

// TODO
// Adjust the size
// Append msg div before the last msg div

// Remove the error msg when
//  1. Click X
//  2. Change between sign-in and sign-up