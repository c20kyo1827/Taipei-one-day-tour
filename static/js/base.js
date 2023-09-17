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
        console.log("test");
    });
}

baseNamespace.moveBasedOneFix = function moveBasedOneFix(){
    let header = document.querySelector(".header");
    let headerCSS = window.getComputedStyle(header);
    let sibling = header.nextElementSibling;
    sibling.style.marginTop = headerCSS.height;
}