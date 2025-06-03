// // Contact HTML
// <h2>Location</h2>
// <p>1st Ave and 1st St</p>
// <p>The Nexus Building</p>
// <p>New York City</p>
// <br>
// <h2>Phone</h2>
// <p>555-3455</p>
// <br>
// <h2>Inspiration</h2>
// <p><a href="https://g.co/kgs/abUQBd9">Aesop Rock</a></p>

export default function loadContact() {
    const content = document.querySelector("#content");
    const lineBreak = document.createElement("br");
    const lineBreak2 = document.createElement("br");
    const locationTitle = document.createElement("h2");
    const phoneTitle = document.createElement("h2");
    const inspirationTitle = document.createElement("h2");
    const locationItems = [
        "1st Ave and 1st St",
        "The Nexus Building",
        "New York City"
    ];
    const phoneNumber = document.createElement("p");
    const inspirationLink = document.createElement("p");

    locationTitle.textContent = "Location";
    phoneTitle.textContent = "Phone";
    inspirationTitle.textContent = "Inspiration";
    phoneNumber.textContent = "555-3455";
    inspirationLink.innerHTML = `<a href="https://g.co/kgs/abUQBd9">Aesop Rock</a>`;

    content.appendChild(locationTitle);
    
    for (let i = 0; i < locationItems.length; i++) {
        const entry = document.createElement("p");
        entry.textContent = `${locationItems[i]}`;
        content.appendChild(entry);
    };

    content.appendChild(lineBreak2);
    content.appendChild(phoneTitle);
    content.appendChild(phoneNumber);
    content.appendChild(lineBreak);
    content.appendChild(inspirationTitle);
    content.appendChild(inspirationLink);
};