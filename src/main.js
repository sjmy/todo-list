import DataManagerObject from "./data-manager.js";

const DataManager = DataManagerObject();
// const pTag = document.querySelector("p");

// pTag.addEventListener("click", () => {
//     pTag.textContent = "yes";
// });


const projects = DataManager.getProjectArray();
window.DataManager = DataManager;

DataManager.start();

// moveTask testing. I really have to learn tests.
// const projectOne = projects[0];

// DataManager.createTask("Water plants", projectOne);
// DataManager.createTask("Repot peace lily", projectOne);
// DataManager.createProject("Plant Duties");

// const projectTwo = projects[1];

// DataManager.createTask("Get dat dirt", projectTwo)


// console.log("My Tasks:")
// for (let n = 0; n < projectOne.getProjectTasks().length; n++) {
//     console.log(projectOne.getProjectTasks()[n].getTaskName());
// };

// console.log("Plant Duties:")
// for (let n = 0; n < projectTwo.getProjectTasks().length; n++) {
//     console.log(projectTwo.getProjectTasks()[n].getTaskName());
// };

// DataManager.moveTask(projectOne.getProjectTasks()[0], projectTwo);

// console.log("My Tasks:")
// for (let n = 0; n < projectOne.getProjectTasks().length; n++) {
//     console.log(projectOne.getProjectTasks()[n].getTaskName());
// };

// console.log("Plant Duties:")
// for (let n = 0; n < projectTwo.getProjectTasks().length; n++) {
//     console.log(projectTwo.getProjectTasks()[n].getTaskName());
// };