import "./styles.css";
import DataManagerObject from "./data-manager.js";
import ScreenControllerObject from "./screen-controller.js";

// Event Listeners
//
// Header:
//     - add button
//         - dropdown to choose project or task
//         - create a project or task, focus to projectName or taskName
//             - form validation check for empty String
//         - user can fill in the rest
// Sidebar:
//     - Projects
//         - expand to see all Projects
//     - Project
//         - expand to see all Tasks for each project, just the taskName
//         - click on project name, opens in main content
//         - click on project task, opens project in main content with task expanded

// Main:
//     - Project
//         - change name
//         - change dueDate
//         - change priority
//             - green/yellow/red for low/medium/Highlight
//         - change projectDescription DONE
//     - Task
//         - checkbox toggles isComplete
//             - could show amount of tasks completed next to the project "3/6 tasks completed"
//         - change name
//         - more icon to show/hide task details DONE
//         - change taskDescription DONE
//         - change dueDate
//         - change priority DONE
//         - delete task
//             - add a trash icon in taskItemDetails
function ListenersObject() {
    const projectArray = DataManager.getProjectArray();

    function moreTaskDetails(taskID) {
        const detailsDiv = document.querySelector(`.taskDetails.${taskID}`);
        detailsDiv.style.display = (detailsDiv.style.display === "none" || detailsDiv.style.display === "") ? "block" : "none";
    };

    // Handles all click events based on event target
    function clickEvents() {
        document.addEventListener("click", (e) => {
            const targetClass = e.target.classList[0];
            const taskID = e.target.classList[1];

            // console.log(targetClass);
            // console.log(taskID);

            if (targetClass == "more") {
                moreTaskDetails(taskID);
            };
        });
    };

    function changeEvents() {
        const taskPriorityDropdowns = document.querySelectorAll(".taskPriority");

        for (let d = 0; d < taskPriorityDropdowns.length; d++) {
            taskPriorityDropdowns[d].addEventListener("change", (e) => {
                const taskID = e.target.classList[1];

                for (let p = 0; p < projectArray.length; p++) {
                    const projectTasks = projectArray[p].getProjectTasks();

                    for (let n = 0; n < projectTasks.length; n++) {
                        if (projectTasks[n].getTaskID() == taskID) {
                            projectTasks[n].setTaskPriority(taskPriorityDropdowns[d].value);
                        };
                    };
                };
            });
        };
    };

    // Saves the task description when the text on any task is changed
    function taskDescriptionEvents() {
        const taskDescriptionTextBoxes = document.querySelectorAll(".taskDescriptionText");
        const taskDescriptionValues = document.querySelectorAll(".taskDescription");

        for (let t = 0; t < taskDescriptionTextBoxes.length; t++) {
            taskDescriptionTextBoxes[t].addEventListener("keyup", (e) => {
                const taskID = e.target.classList[1];

                for (let p = 0; p < projectArray.length; p++) {
                    const projectTasks = projectArray[p].getProjectTasks();

                    for (let n = 0; n < projectTasks.length; n++) {
                        if (projectTasks[n].getTaskID() == taskID) {
                            projectTasks[n].setTaskDescription(taskDescriptionValues[n].dataset.replicatedValue);
                        };
                    };
                };
            });
        };
        
    };

    // Saves the project description when the text on any project is changed
    function projectDescriptionEvents() {
        const projectDescriptionTextBoxes = document.querySelectorAll(".projectDescriptionText");
        const projectDescriptionValues = document.querySelectorAll(".projectDescription");

        for (let t = 0; t < projectDescriptionTextBoxes.length; t++) {
            projectDescriptionTextBoxes[t].addEventListener("keyup", (e) => {
                const projectID = e.target.classList[1];

                for (let p = 0; p < projectArray.length; p++) {
                    if (projectArray[p].getProjectID() == projectID) {
                        projectArray[p].setProjectDescription(projectDescriptionValues[p].dataset.replicatedValue);
                    };
                };
            });
        };
        
    };

    // Start the event listener, call functions based on targetClass, send id for specific project or task
    const start = () => {
        clickEvents();
        changeEvents();
        taskDescriptionEvents();
        projectDescriptionEvents();
    };

    return { start }
};

const DataManager = DataManagerObject();
const ScreenController = ScreenControllerObject();
const Listeners = ListenersObject();





const projects = DataManager.getProjectArray();


window.DataManager = DataManager;

DataManager.start();
const projectOne = projects[0];

projectOne.setProjectDescription("This is the project description!");
projectOne.setProjectDueDate("Tomorrow");
projectOne.setProjectPriority("High");
DataManager.createTask("Water plants", projectOne);
DataManager.createTask("Repot peace lily", projectOne);
DataManager.createTask("Buy End-All", projectOne);
DataManager.createTask("Propagate umbrella plant", projectOne);
DataManager.createTask("Fertilize calathea", projectOne);

ScreenController.drawProject(projectOne);

Listeners.start();

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