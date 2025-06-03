import "./styles.css";
import home from "./home.js";
import hours from "./hours.js";
import menu from "./menu.js";
import contact from "./contact.js";

function menuListeners() {
    const content = document.querySelector("#content");
    const homeNav = document.querySelector(".home");
    const menuNav = document.querySelector(".menu");
    const hoursNav = document.querySelector(".hours");
    const contactNav = document.querySelector(".contact");

    homeNav.addEventListener("click", (e) => {
        content.textContent = "";
        home();
    });

    menuNav.addEventListener("click", (e) => {
        content.textContent = "";
        menu();
    });

    hoursNav.addEventListener("click", (e) => {
        content.textContent = "";
        hours();
    });

    contactNav.addEventListener("click", (e) => {
        content.textContent = "";
        contact();
    });
};

menuListeners();
home();