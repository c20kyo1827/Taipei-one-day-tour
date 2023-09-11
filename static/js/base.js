// Main
document.addEventListener("DOMContentLoaded", async() => {
    addBaseElementListener();
});

function addBaseElementListener(){
    document.querySelector(".header__navigation-left").addEventListener("click", () => {
        window.location.href = "/";
    });
}