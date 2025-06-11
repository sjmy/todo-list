import moreImage from "./img/more.svg";
import deleteImage from "./img/delete.svg";

// ScreenController
//     - receives DataManager object and data from event listeners, reads projectArray, draws
//     - interacts with the DOM, draws content
//     - interacts with DataManager object to get the info it needs
//         - from main.js, pass in DataManager object to methods
//             - and the event?
// Methods
//     - clearMainContent
//     - drawMainContent
//         - when project is clicked on sidebar, show the project and its tasks
//     - drawProject
//         - projectName
//         - dueDate, priority, notes in light grey in a line underneath projectName
//         - projectDescription (show one line, expandable if more)
//             - textarea element
//                 - can set maxchars
//                 - can it be styled to only show a certain amount of chars before expanding? font? border?
//     - drawTask
//         - checkbox (task.isComplete() for task status)
//             - strikethrough when complete
//         - taskName
//         - expandable (all editable)
//             - description
//             - due date
//             - priority
//             - notes
//             - change project
//     - sidebar
//         - projects list
//         - number of tasks?
//         - expandable to see taskNames?
//         - resizeable sidebar?
//     - addItem
//         - dialog box that pops up? (like the library project?)
//         - edit in place?
//     - what happens when the plus icon is clicked?
//         - dropdown menu: Add Item or Add Project

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
//         - change priority DONE
//             - green/yellow/red for low/medium/Highlight
//         - change projectDescription DONE
//     - Task
//         - checkbox toggles isComplete DONE
//             - could show amount of tasks completed next to the project "3/6 tasks completed" DONE
//         - change name
//         - more icon to show/hide task details DONE
//         - change taskDescription DONE
//         - change dueDate
//         - change priority DONE
//         - delete task DONE
//             - add a trash icon in taskItemDetails DONE

export default function ScreenControllerObject(DataManager) {
    const projectArray = DataManager.getProjectArray();
    const mainContent = document.querySelector(".main");
    const priorityValues = ["None", "Low", "Medium", "High"];

    // Saves the project description when the text on any project is changed
    function changeProjectDescription() {
        const projectDescriptionTextBox = document.querySelector("#projectDescriptionText");
        const projectDescriptionValue = document.querySelector(".projectDescription");

        projectDescriptionTextBox.addEventListener("keyup", (e) => {
            const projectID = e.target.classList[0];

            for (let p = 0; p < projectArray.length; p++) {
                if (projectArray[p].getProjectID() == projectID) {
                    projectArray[p].setProjectDescription(projectDescriptionValue.dataset.replicatedValue);
                };
            };
        });
    };

    // Sets project due date whenever it changes
    function changeProjectDueDate() {
        const projectDueDatePicker = document.querySelector(".projectDueDate");

        projectDueDatePicker.addEventListener("change", (e) => {
            const projectID = e.target.classList[1];

            for (let p = 0; p < projectArray.length; p++) {
                if (projectArray[p].getProjectID() == projectID) {
                    projectArray[p].setProjectDueDate(new Date(projectDueDatePicker.value));
                    clearProjectDueDateDiv();
                    drawProjectDueDateDiv();
                    drawProjectDueDate(projectArray[p]);
                    changeProjectDueDate();
                };
            };
        });
    };

    // Sets project priority whenever it changes
    function changeProjectPriority() {
        const projectPriorityDropdown = document.querySelector(".projectPriority");

        projectPriorityDropdown.addEventListener("change", (e) => {
            const projectID = e.target.classList[1];

            for (let p = 0; p < projectArray.length; p++) {
                if (projectArray[p].getProjectID() == projectID) {
                    projectArray[p].setProjectPriority(projectPriorityDropdown.value);
                    clearProjectPriorityDiv();
                    drawProjectPriorityDiv();
                    drawProjectPriority(projectArray[p]);
                    changeProjectPriority();
                };
            };
        });
    };    

    // Saves the task description when the text on any task is changed
    function changeTaskDescription() {
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

    function changeTaskDueDate() {
        const taskDueDatePickers = document.querySelectorAll(".taskDueDate");

        for (let i = 0; i < taskDueDatePickers.length; i++) {
            taskDueDatePickers[i].addEventListener("change", (e) => {
                const taskID = e.target.classList[1];

                for (let p = 0; p < projectArray.length; p++) {
                    const projectTasks = projectArray[p].getProjectTasks();

                    for (let n = 0; n < projectTasks.length; n++) {
                        if (projectTasks[n].getTaskID() == taskID) {
                            projectTasks[n].setTaskDueDate(new Date(taskDueDatePickers[i].value));
                        };
                    };
                };
            });
        };

        // projectDueDatePicker.addEventListener("change", (e) => {
        //     const projectID = e.target.classList[1];

        //     for (let p = 0; p < projectArray.length; p++) {
        //         if (projectArray[p].getProjectID() == projectID) {
        //             projectArray[p].setProjectDueDate(new Date(projectDueDatePicker.value));
        //             clearProjectDueDateDiv();
        //             drawProjectDueDateDiv();
        //             drawProjectDueDate(projectArray[p]);
        //             changeProjectDueDate();
        //         };
        //     };
        // });
    };
    
    // Sets task priority whenever it changes
    function changeTaskPriority() {
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

    // Shows/hides task details
    function moreTaskDetails(taskID) {
        const detailsDiv = document.querySelector(`.taskDetailsDiv.${taskID}`);
        detailsDiv.style.display = (detailsDiv.style.display === "none" || detailsDiv.style.display === "") ? "block" : "none";
    };

    // Handles all click events based on event target
    function clickEvents() {
        document.addEventListener("click", (e) => {
            const targetClass = e.target.classList[0];
            const taskID = e.target.classList[1];

            console.log(targetClass);
            console.log(taskID);

            if (targetClass == "more") {
                moreTaskDetails(taskID);
            };

            if (targetClass == "delete") {
                buildAreYouSure(taskID);

                const dialog = document.querySelector("dialog");
                dialog.showModal();
            };

            if (targetClass == "yesButton") {
                const dialog = document.querySelector("dialog");

                e.preventDefault();

                for (let p = 0; p < projectArray.length; p++) {
                    const projectTasks = projectArray[p].getProjectTasks();

                    for (let n = 0; n < projectTasks.length; n++) {
                        if (projectTasks[n].getTaskID() == taskID) {
                            DataManager.deleteTask(projectTasks[n]);
                            clearTaskItemsDiv();
                            drawTasks(projectArray[p]);
                        };
                    };
                };

                dialog.close();
                dialog.remove();
            };

            if (targetClass == "noButton") {
                const dialog = document.querySelector("dialog");

                e.preventDefault();
                dialog.close();
                dialog.remove();
            };

            if (targetClass == "checkbox") {
                for (let p = 0; p < projectArray.length; p++) {
                    const projectTasks = projectArray[p].getProjectTasks();

                    for (let n = 0; n < projectTasks.length; n++) {
                        if (projectTasks[n].getTaskID() == taskID) {
                            projectTasks[n].toggleIsComplete();
                            clearProjectNameDiv();
                            drawProjectNameDiv();
                            drawProjectName(projectArray[p]);
                            drawProjectTasksCompleted(projectArray[p]);
                        };
                    };
                };
            };
        });
    };

    // Start the event listener, call functions based on targetClass, send id for specific project or task
    const startListeners = () => {
        changeProjectDescription();
        changeProjectDueDate();
        changeProjectPriority();
        changeTaskDescription();
        // changeTaskPriority();
        clickEvents();
    };

    const clearMainContent = () => {
        mainContent.textContent = "";
    };

    const clearProjectNameDiv = () => {
        const projectNameDiv = document.querySelector(".projectNameDiv");
        projectNameDiv.textContent = "";
    };

    const clearProjectDueDateDiv = () => {
        const projectDueDateDiv = document.querySelector(".projectDueDateDiv");
        projectDueDateDiv.textContent = "";
    };

    const clearProjectPriorityDiv = () => {
        const projectPriorityDiv = document.querySelector(".projectPriorityDiv");
        projectPriorityDiv.textContent = "";
    };

    const clearTaskItemsDiv = () => {
        const taskItemsDiv = document.querySelector(".taskItemsDiv");
        taskItemsDiv.textContent = "";
    };

    const drawProjectNameDiv = () => {
        const projectNameDivExists = document.querySelector(".projectNameDiv");

        if (projectNameDivExists) {
            return;
        } else {
            const projectNameDiv = document.createElement("div");
            projectNameDiv.classList.add("projectNameDiv");
            mainContent.prepend(projectNameDiv);
        };
    };

    const drawProjectName = (project) => {
        const projectName = document.createElement("h1");
        const projectNameDiv = document.querySelector(".projectNameDiv")

        projectName.textContent = project.getProjectName();
        projectNameDiv.appendChild(projectName);
    };

    const drawProjectTasksCompleted = (project) => {
        const projectNameDiv = document.querySelector(".projectNameDiv");
        const projectTasksCompleted = document.createElement("span");

        projectTasksCompleted.classList.add("projectTasksCompleted");
        projectTasksCompleted.textContent = countProjectTasksCompleted(project);
        projectNameDiv.appendChild(projectTasksCompleted);
    };

    const drawProjectItemsDiv = () => {
        const projectItemsDiv = document.createElement("div");

        projectItemsDiv.classList.add("projectItemsDiv");
        mainContent.appendChild(projectItemsDiv);
    };

    const drawProjectDueDateDiv = () => {
        const projectItemsDiv = document.querySelector(".projectItemsDiv");
        const projectDueDateDivExists = document.querySelector(".projectDueDateDiv");

        if (projectDueDateDivExists) {
            return;
        } else {
            const projectDueDateDiv = document.createElement("div");
            projectDueDateDiv.classList.add("projectDueDateDiv");
            projectItemsDiv.prepend(projectDueDateDiv);
        };
    };

    const drawProjectDueDate = (project) => {
        const projectDueDateDiv = document.querySelector(".projectDueDateDiv");
        const projectDueDate = document.createElement("label");
        const projectDueDateValue = document.createElement("input");

        projectDueDate.textContent = `Due: ${project.getProjectDueDate()}`;
        projectDueDate.htmlFor = `due${project.getProjectID()}`;
        projectDueDateValue.id = `due${project.getProjectID()}`;
        projectDueDateValue.type = "date";
        projectDueDateValue.classList.add("projectDueDate");
        projectDueDateValue.classList.add(`${project.getProjectID()}`);

        projectDueDateDiv.appendChild(projectDueDate);
        projectDueDateDiv.appendChild(projectDueDateValue);
    };

    const drawProjectPriorityDiv = () => {
        const projectItemsDiv = document.querySelector(".projectItemsDiv");
        const projectPriorityDivExists = document.querySelector(".projectPriorityDiv");

        if (projectPriorityDivExists) {
            return;
        } else {
            const projectPriorityDiv = document.createElement("div");
            projectPriorityDiv.classList.add("projectPriorityDiv");
            projectItemsDiv.appendChild(projectPriorityDiv);
        };
    };

    const drawProjectPriority = (project) => {
        const projectPriorityDiv = document.querySelector(".projectPriorityDiv");
        const projectPriority = document.createElement("label");
        const projectPriorityValue = document.createElement("select"); 

        
        projectPriority.textContent = "Priority:";
        projectPriority.htmlFor = `priority${project.getProjectID()}`;
        projectPriorityValue.id = `priority${project.getProjectID()}`;
        projectPriorityValue.classList.add("projectPriority");
        projectPriorityValue.classList.add(`${project.getProjectID()}`);

        for (let p = 0; p < priorityValues.length; p++) {
            const priorityOption = document.createElement("option");
            priorityOption.value = priorityValues[p];
            priorityOption.textContent = priorityValues[p];
            
            if (priorityValues[p] == project.getProjectPriority()) {
                priorityOption.selected = true;
            };

            projectPriorityValue.appendChild(priorityOption);
        };

        projectPriorityDiv.appendChild(projectPriority);
        projectPriorityDiv.appendChild(projectPriorityValue);
    };

    const drawProjectDescription = (project) => {
        const projectDescriptionDiv = document.createElement("div");
        const projectDescription = document.createElement("textarea");

        projectDescriptionDiv.classList.add("projectDescription");
        projectDescription.id = "projectDescriptionText";
        projectDescription.classList.add(`${project.getProjectID()}`);
        projectDescription.textContent = project.getProjectDescription();

        // This event listener copies the project description to an attribute on the projectDescriptionDiv
        // In styles.css, a hidden pseudo-element is overlayed on projectDescription so the textarea matches the content
        // https://chriscoyier.net/2023/09/29/css-solves-auto-expanding-textareas-probably-eventually/
        projectDescription.addEventListener("input", () => {
            projectDescriptionDiv.dataset.replicatedValue = projectDescription.value;
        });

        projectDescriptionDiv.appendChild(projectDescription);
        mainContent.appendChild(projectDescriptionDiv);
    };

    const drawTaskItemsDiv = () => {
        const taskItemsDivExists = document.querySelector(".taskItemsDiv");

        if (taskItemsDivExists) {
            return;
        } else {
            const taskItemsDiv = document.createElement("div");
            taskItemsDiv.classList.add("taskItemsDiv");
            mainContent.appendChild(taskItemsDiv);
        };
    };

    const drawTaskItem = (task) => {
        const taskItemsDiv = document.querySelector(".taskItemsDiv");
        const taskDiv = document.createElement("div");
        const taskLabel = document.createElement("label");
        const checkbox = document.createElement("input");

        taskDiv.classList.add("taskItem");
        taskDiv.classList.add(`${task.getTaskID()}`);

        taskLabel.htmlFor = `${task.getTaskID()}`;
        taskLabel.textContent = task.getTaskName();

        checkbox.type = "checkbox";
        checkbox.id = `${task.getTaskID()}`;
        checkbox.classList.add("checkbox");
        checkbox.classList.add(`${task.getTaskID()}`);

        if (task.getIsComplete() == true) {
            checkbox.checked = true;
        };

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskLabel);
        taskItemsDiv.appendChild(taskDiv);
    };

    const drawMoreDiv = (task) => {
        const taskItems = document.querySelectorAll(".taskItem");
        const taskItem = taskItems[taskItems.length - 1];
        const moreDiv = document.createElement("div");
        const more = document.createElement("img");

        more.src = moreImage;
        more.alt = "Show task details";
        more.classList.add("more");
        more.classList.add(`${task.getTaskID()}`);

        moreDiv.appendChild(more);
        taskItem.appendChild(moreDiv);
    };

    const drawTaskDetailsDiv = (task) => {
        const taskItems = document.querySelectorAll(".taskItem");
        const taskItem = taskItems[taskItems.length - 1];
        const taskDetailsDiv = document.createElement("div");

        taskDetailsDiv.classList.add("taskDetailsDiv");
        taskDetailsDiv.classList.add(`${task.getTaskID()}`);
        taskItem.after(taskDetailsDiv);
    };

    const drawTaskDescription = (task) => {
        const taskDetailsDivs = document.querySelectorAll(".taskDetailsDiv");
        const taskDetailsDiv = taskDetailsDivs[taskDetailsDivs.length - 1];
        const taskDescriptionDiv = document.createElement("div");
        const taskDescription = document.createElement("textarea");

        taskDescriptionDiv.classList.add("taskDescription");
        taskDescriptionDiv.classList.add(`${task.getTaskID()}`);
        taskDescription.classList.add("taskDescriptionText");
        taskDescription.classList.add(`${task.getTaskID()}`);
        taskDescription.textContent = task.getTaskDescription();

        // This event listener copies the task description to an attribute on the taskDescriptionDiv
        // In styles.css, a hidden pseudo-element is overlayed on taskDescription so the textarea matches the content
        // https://chriscoyier.net/2023/09/29/css-solves-auto-expanding-textareas-probably-eventually/
        taskDescription.addEventListener("input", () => {
            taskDescriptionDiv.dataset.replicatedValue = taskDescription.value;
        });

        taskDescriptionDiv.appendChild(taskDescription);
        taskDetailsDiv.appendChild(taskDescriptionDiv);
    };

    const drawTaskItemDetails = () => {
        const taskDetailsDivs = document.querySelectorAll(".taskDetailsDiv");
        const taskDetailsDiv = taskDetailsDivs[taskDetailsDivs.length - 1];
        const taskItemDetails = document.createElement("div");

        taskItemDetails.classList.add("taskItemDetails");
        taskDetailsDiv.appendChild(taskItemDetails);
    };

    const drawTaskDueDateDiv = (task) => {
        const taskItemDetailsAll = document.querySelectorAll(".taskItemDetails");
        const taskItemDetails = taskItemDetailsAll[taskItemDetailsAll.length - 1];
        const taskDueDateDivExists = document.querySelector(".taskDueDateDiv");

        if (taskDueDateDivExists) {
            const taskDueDateDivs = document.querySelectorAll(".taskDueDateDiv");
            const taskDueDateDiv = taskDueDateDivs[taskDueDateDivs.length - 1];
            taskDueDateDiv.classList.add("taskDueDateDiv");
            taskDueDateDiv.classList.add(`${task.getTaskID()}`);
            taskItemDetails.appendChild(taskDueDateDiv);
        } else {
            const taskDueDateDiv = document.createElement("div");
            taskDueDateDiv.classList.add("taskDueDateDiv");
            taskDueDateDiv.classList.add(`${task.getTaskID()}`);
            taskItemDetails.appendChild(taskDueDateDiv);
        };
    };

    const drawTaskDueDate = (task) => {
        const taskDueDateDiv = document.querySelector(`.taskDueDateDiv.${task.getTaskID()}`);
        const taskDueDate = document.createElement("label");
        const taskDueDateValue = document.createElement("input");
        
        taskDueDate.textContent = `Due: ${task.getTaskDueDate()}`;
        taskDueDate.htmlFor = `due${task.getTaskID()}`;
        taskDueDateValue.id = `due${task.getTaskID()}`;
        taskDueDateValue.type = "date";
        taskDueDateValue.classList.add("taskDueDate");
        taskDueDateValue.classList.add(`${task.getTaskID()}`);

        taskDueDateDiv.appendChild(taskDueDate);
        taskDueDateDiv.appendChild(taskDueDateValue);
    };

    const drawTaskPriorityDiv = (task) => {
        const taskItemDetailsAll = document.querySelectorAll(".taskItemDetails");
        const taskItemDetails = taskItemDetailsAll[taskItemDetailsAll.length - 1];
        const taskPriorityDiv = document.createElement("div");
        const taskPriority = document.createElement("label");
        const taskPriorityValue = document.createElement("select"); 

        taskPriorityDiv.classList.add("taskPriorityDiv");
        taskPriority.textContent = "Priority:";
        taskPriority.htmlFor = `task${task.getTaskID()}`;
        taskPriorityValue.id = `task${task.getTaskID()}`;
        taskPriorityValue.classList.add("taskPriority");
        taskPriorityValue.classList.add(`${task.getTaskID()}`);

        for (let p = 0; p < priorityValues.length; p++) {
            const priorityOption = document.createElement("option");
            priorityOption.value = priorityValues[p];
            priorityOption.textContent = priorityValues[p];
            
            if (priorityValues[p] == task.getTaskPriority()) {
                priorityOption.selected = true;
            };

            taskPriorityValue.appendChild(priorityOption);
        };

        taskPriorityDiv.appendChild(taskPriority);
        taskPriorityDiv.appendChild(taskPriorityValue);
        taskItemDetails.appendChild(taskPriorityDiv);
    };

    const drawDeleteDiv = (task) => {
        const taskItemDetailsAll = document.querySelectorAll(".taskItemDetails");
        const taskItemDetails = taskItemDetailsAll[taskItemDetailsAll.length - 1];
        const del = document.createElement("img");

        del.src = deleteImage;
        del.alt = "Delete task";
        del.classList.add("delete");
        del.classList.add(`${task.getTaskID()}`);

        taskItemDetails.appendChild(del);
    };

    const drawProject = (project) => {
        clearMainContent();
        drawProjectNameDiv();
        drawProjectName(project);
        drawProjectTasksCompleted(project);
        drawProjectItemsDiv();
        drawProjectDueDateDiv();
        drawProjectDueDate(project);
        drawProjectPriorityDiv();
        drawProjectPriority(project);
        drawProjectDescription(project);
    };

    const drawTasks = (project) => {
        const projectTasks = project.getProjectTasks();
        
        for (let t = 0; t < projectTasks.length; t++) {
            drawTask(projectTasks[t]);
        };
    };

    const drawTask = (task) => {
        drawTaskItemsDiv();
        drawTaskItem(task);
        drawMoreDiv(task);
        drawTaskDetailsDiv(task);
        drawTaskDescription(task);
        drawTaskItemDetails();
        drawTaskDueDateDiv(task);
        drawTaskDueDate(task);
        drawTaskPriorityDiv(task);
        drawDeleteDiv(task);
    };


    // Builds confirmation form for when delete task is clicked
    const buildAreYouSure = (taskID) => {
        const body = document.querySelector("body");
        const form = document.createElement("form");
        const dialog = document.createElement("dialog");
        const deleteTaskText = document.createElement("h5");
        const buttons = document.createElement("div");
        const yesButton = document.createElement("button");
        const noButton = document.createElement("button");

        dialog.classList.add("areYouSure");
        buttons.classList.add("yesNoButtons");
        yesButton.classList.add("yesButton");
        yesButton.classList.add(`${taskID}`);
        noButton.classList.add("noButton");
        yesButton.classList.add(`${taskID}`);
        deleteTaskText.textContent = "Delete Task?";
        yesButton.textContent = "Yes";
        noButton.textContent = "No";

        buttons.appendChild(yesButton);
        buttons.appendChild(noButton);
        dialog.appendChild(deleteTaskText);
        dialog.appendChild(buttons);
        form.appendChild(dialog);
        body.appendChild(form);
    };

    function countProjectTasksCompleted(project) {
        const projectTasks = project.getProjectTasks();
        const totalTasks = projectTasks.length;
        let tasksComplete = 0;

        for (let t = 0; t < totalTasks; t++) {
            if (projectTasks[t].getIsComplete() == true) {
                tasksComplete += 1;
            };
        };

        return `${tasksComplete}/${totalTasks} tasks completed`;
    };

    return {startListeners,
            drawProject,
            drawTasks
    };
};