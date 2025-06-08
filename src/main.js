import "./styles.css";
import DataManagerObject from "./data-manager.js";
import ScreenControllerObject from "./screen-controller.js";
import ListenerObject from "./listener.js";

const DataManager = DataManagerObject();
const ScreenController = ScreenControllerObject();
const Listener = ListenerObject();





const projects = DataManager.getProjectArray();


window.DataManager = DataManager;

DataManager.start();
const projectOne = projects[0];

projectOne.setProjectDescription("This is the project description!");
projectOne.setProjectDueDate("Tomorrow");
projectOne.setProjectPriority("High");
DataManager.createTask("Water plants", projectOne);
DataManager.createTask("Repot peace lily", projectOne);

ScreenController.drawProject(projectOne);

Listener.start();

// // moveTask() and deleteTask() testing. I really have to learn tests.
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

// DataManager.deleteTask(projectTwo.getProjectTasks()[0]);

// console.log("My Tasks:")
// for (let n = 0; n < projectOne.getProjectTasks().length; n++) {
//     console.log(projectOne.getProjectTasks()[n].getTaskName());
// };

// console.log("Plant Duties:")
// for (let n = 0; n < projectTwo.getProjectTasks().length; n++) {
//     console.log(projectTwo.getProjectTasks()[n].getTaskName());
// };