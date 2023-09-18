// Wrapping namespace
let baseNamespace = {};

// Main
document.addEventListener("DOMContentLoaded", async() => {
    baseNamespace.addElementListener();
    baseNamespace.moveBasedOneFix();
});

baseNamespace.addElementListener = function addBaseElementListener(){
    document.querySelector(".navigation__left-title").addEventListener("click", () => {
        window.location.href = "/";
    });

    document.querySelector(".navigation__right-option-sign").addEventListener("click", () => {
        document.querySelector("#sign-container__sign-in.sign-container").classList.add("sign-container--show");
        document.querySelector("#sign-container__sign-up.sign-container").classList.remove("sign-container--show");
    });

    console.log(document.querySelector("#sign-container__sign-in.sign-container"));
    console.log(document.querySelector("#sign-container__sign-up.sign-container"));

    let closeButtons = document.querySelectorAll(".sign-box__close-button");
    [].forEach.call(closeButtons, function(button){
        button.addEventListener("click", () => {
            document.querySelector("#sign-container__sign-in.sign-container").classList.remove("sign-container--show");
            document.querySelector("#sign-container__sign-up.sign-container").classList.remove("sign-container--show");
        });
    });

    let messages = document.querySelectorAll(".sign-box__message");
    [].forEach.call(messages, function(msg){
        msg.addEventListener("click", () => {
            const idName = msg.parentElement.parentElement.parentElement.id;
            if(idName === "sign-container__sign-in"){
                document.querySelector("#sign-container__sign-in.sign-container").classList.remove("sign-container--show");
                document.querySelector("#sign-container__sign-up.sign-container").classList.add("sign-container--show");
                const container = document.querySelector(".sign-container__sign-box");
                console.log(container);
                // window.getComputedStyle(container).height = "275px";
                console.log(window.getComputedStyle(container).height);
            }
            if(idName === "sign-container__sign-up"){
                document.querySelector("#sign-container__sign-in.sign-container").classList.add("sign-container--show");
                document.querySelector("#sign-container__sign-up.sign-container").classList.remove("sign-container--show");
                const container = document.querySelector(".sign-container__sign-box");
                console.log(container);
                // window.getComputedStyle(container).height = "322px";
                console.log(window.getComputedStyle(container).height);
            }
        });
    });
}

baseNamespace.moveBasedOneFix = function moveBasedOneFix(){
    let header = document.querySelector(".header");
    let headerCSS = window.getComputedStyle(header);
    let sibling = header.nextElementSibling;
    if(window.getComputedStyle(sibling).position === "fixed") return;
    sibling.style.marginTop = headerCSS.height;
}