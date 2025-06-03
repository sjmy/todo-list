// // Home HTML
// <h3>All welcome, anytime. Drive thru only.</h3>
export default function loadHome() {
    const content = document.querySelector("#content");
    const homeText = document.createElement("h3");
    
    homeText.textContent = "All welcome, anytime. Drive thru only.";
    content.appendChild(homeText);
};