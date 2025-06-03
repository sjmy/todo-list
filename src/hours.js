// // Hours HTML
// <h2>Hours</h2>
// <p>Sunday 24 hours</p>
// <p>Monday 24 hours</p>
// <p>Tuesday 24 hours</p>
// <p>Wednesday 24 hours</p>
// <p>Thursday 24 hours</p>
// <p>Friday 24 hours</p>
// <p>Saturday 24 hours</p>

export default function loadHours() {
    const content = document.querySelector("#content");
    const hoursTitle = document.createElement("h2");
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    hoursTitle.textContent = "Hours";
    content.appendChild(hoursTitle);

    for (let i = 0; i < days.length; i++) {
        const entry = document.createElement("p");
        entry.textContent = `${days[i]} 24 hours`;
        content.appendChild(entry);
    };
};