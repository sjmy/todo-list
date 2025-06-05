import DataManagerObject from "./data-manager.js";
// import Task from "./task.js";
// import Project from "./project.js";

const DataManager = DataManagerObject();
const pTag = document.querySelector("p");

DataManager.start();
DataManager.createTask("Water plants");

pTag.addEventListener("click", () => {
    pTag.textContent = "yes";
});