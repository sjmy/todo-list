// // Menu HTML
// <h2>Menu</h2>
// <h3>Mains</h3>
// <p>Double-triple Texas angus steakinator waffle sticks</p>
// <p>Crispy ranch and activated maple eggroll taco twists</p>
// <p>Panko-crusted flaming gator honey mango lava ribs</p>
// <p>Very berry cajunated pasta chimi-dipper toast</p>
// <p>Zesty melted melon cheddar chocolate blizzard schnitzel bowl</p>
// <p>Lemon butter buffalo conniption guava brisket cones</p>
// <br>
// <h3>Sides</h3>
// <p>A shot</p>
// <p>Bacon egg croissant</p>
// <p>Jalapeno poppers</p>
// <p>Filet o' cod</p>
// <p>Popcorn shrimp</p>

export default function loadMenu() {
    const content = document.querySelector("#content");
    const lineBreak = document.createElement("br");
    const menuTitle = document.createElement("h2");
    const mainsTitle = document.createElement("h3");
    const sidesTitle = document.createElement("h3");
    const mainsItems = [
        "Double-triple Texas angus steakinator waffle sticks",
        "Crispy ranch and activated maple eggroll taco twists",
        "Panko-crusted flaming gator honey mango lava ribs",
        "Very berry cajunated pasta chimi-dipper toast",
        "Lemon butter buffalo conniption guava brisket cones"
    ];
    const sidesItems = [
        "A shot",
        "Bacon egg croissant",
        "Jalapeno poppers",
        "Filet o' cod",
        "Popcorn shrimp"
    ];

    menuTitle.textContent = "Menu";
    mainsTitle.textContent = "Mains"
    sidesTitle.textContent = "Sides";

    content.appendChild(menuTitle);
    content.appendChild(mainsTitle);

    for (let i = 0; i < mainsItems.length; i++) {
        const main = document.createElement("p");
        main.textContent = `${mainsItems[i]}`;
        content.appendChild(main);
    };
    
    content.appendChild(lineBreak);
    content.appendChild(sidesTitle);

    for (let i = 0; i < sidesItems.length; i++) {
        const side = document.createElement("p");
        side.textContent = `${sidesItems[i]}`;
        content.appendChild(side);
    };
};