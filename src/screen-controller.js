import moreImage from "./img/more.svg";
import deleteImage from "./img/delete.svg";

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
//         - change dueDate DONE
//         - change priority DONE
//             - green/yellow/red for low/medium/Highlight
//         - change projectDescription DONE
//     - Task
//         - checkbox toggles isComplete DONE
//             - could show amount of tasks completed next to the project "3/6 tasks completed" DONE
//         - change name
//         - more icon to show/hide task details DONE
//         - change taskDescription DONE
//         - change dueDate DONE
//         - change priority DONE
//         - delete task DONE
//             - add a trash icon in taskItemDetails DONE

// ScreenControllerObject controls the DOM, updating and clearing as needed. Has access to the projectArray.
// Contains all event listener functions and attaches listeners to DOM elements.
// The DOM is broken down into small functions that draw and clear as needed.
export default function ScreenControllerObject(DataManager) {
    const projectArray = DataManager.getProjectArray();
    const mainContent = document.querySelector(".main");
    const priorityValues = ["None", "Low", "Medium", "High"];


    // Event Listener Functions //

    // Start all event listeners
    const startAllListeners = () => {
        startProjectListeners();
        startTaskListeners();
        clickEvents();
    };

    // Start the project event listeners
    const startProjectListeners = () => {
        changeProjectDescription();
        changeProjectDueDate();
        changeProjectPriority();
    };

    // Start the task event listeners
    const startTaskListeners = () => {
        changeTaskDescription();
        changeTaskDueDate();
        changeTaskPriority();
    };

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

    // Saves the task due date whenever the date picker changes
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
                            clearTaskDueDateDiv(projectTasks[n]);
                            drawTaskDueDate(projectTasks[n]);
                            changeTaskDueDate();
                        };
                    };
                };
            });
        };
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
                            clearTaskPriorityDiv(projectTasks[n]);
                            drawTaskPriority(projectTasks[n]);
                            changeTaskPriority();
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
    const clickEvents = () => {
        document.addEventListener("click", (e) => {
            const targetClass = e.target.classList[0];
            const ID = e.target.classList[1];

            console.log(targetClass);
            console.log(ID);

            // If three dots icon is clicked, expand task details
            if (targetClass == "more") {
                moreTaskDetails(ID);
            };

            // if trash can in task details is clicked, build and show the delete dialog
            if (targetClass == "delete") {
                buildAreYouSure(ID);

                const dialog = document.querySelector("dialog");
                dialog.showModal();
            };

            // If yes is clicked in the delete dialog, delete the task, update the screen,
            // start the task listeners, close the dialog and remove it
            if (targetClass == "yesButton") {
                const dialog = document.querySelector("dialog");

                e.preventDefault();

                for (let p = 0; p < projectArray.length; p++) {
                    const projectTasks = projectArray[p].getProjectTasks();

                    for (let n = 0; n < projectTasks.length; n++) {
                        if (projectTasks[n].getTaskID() == ID) {
                            DataManager.deleteTask(projectTasks[n]);
                            clearTaskItemsDiv();
                            drawTasks(projectArray[p]);
                            startTaskListeners();
                        };
                    };
                };

                dialog.close();
                dialog.remove();
            };

            // If no is clicked in the delete dialog, close the dialog and remove it
            if (targetClass == "noButton") {
                const dialog = document.querySelector("dialog");

                e.preventDefault();
                dialog.close();
                dialog.remove();
            };

            // If a checkbox is clicked, set the task as complete and update the screen
            if (targetClass == "checkbox") {
                for (let p = 0; p < projectArray.length; p++) {
                    const projectTasks = projectArray[p].getProjectTasks();

                    for (let n = 0; n < projectTasks.length; n++) {
                        if (projectTasks[n].getTaskID() == ID) {
                            projectTasks[n].toggleIsComplete();
                            clearProjectNameDiv();
                            drawProjectNameDiv();
                            drawProjectName(projectArray[p]);
                            drawProjectTasksCompleted(projectArray[p]);
                        };
                    };
                };
            };

            // If a project in the sidebar is clicked, the project is displayed in the main content area
            if (targetClass == "projectName") {
                for (let p = 0; p < projectArray.length; p++) {
                    if (projectArray[p].getProjectID() == ID) {
                        drawProject(projectArray[p]);
                        drawTasks(projectArray[p]);
                        startProjectListeners();
                        startTaskListeners();
                    };
                };
            };
        });
    };

    
    // Clearing Functions //

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

    const clearTaskDueDateDiv = (task) => {
        const taskDueDateDiv = document.querySelector(`.taskDueDateDiv.${task.getTaskID()}`);
        taskDueDateDiv.textContent = "";
    };

    const clearTaskPriorityDiv = (task) => {
        const taskPriorityDiv = document.querySelector(`.taskPriorityDiv.${task.getTaskID()}`);
        taskPriorityDiv.textContent = "";
    };

    const clearSidebar = () => {
        const sidebarContent = document.querySelector(".sidebar-content");
        sidebarContent.textContent = "";
    };


    // Drawing Functions //
    // Each section is broken down into its base parts wherever possible.
    // Uses CSS classes to select project/task data.
    // Example: "taskDetailsDiv iiNUEpJND" first is the name, second is the ID

    // Draws all projects in the sidebar
    const drawSidebar = () => {
        const sidebarContent = document.querySelector(".sidebar-content");
        const allProjectsLabel = document.createElement("h2");
        const sidebarProjectNamesDiv = document.createElement("div")

        clearSidebar();
        
        allProjectsLabel.textContent = "All Projects";
        sidebarProjectNamesDiv.classList.add("sidebarProjectNamesDiv");

        for (let p = 0; p < projectArray.length; p++) {
            const sidebarProjectNameDiv = document.createElement("div");
            const sidebarProjectName = document.createElement("h4");
            const sidebarProjectTasksAmount = document.createElement("span");

            sidebarProjectNameDiv.classList.add("sidebarProjectNameDiv");
            sidebarProjectName.classList.add("projectName");
            sidebarProjectName.classList.add(`${projectArray[p].getProjectID()}`);
            sidebarProjectName.textContent = projectArray[p].getProjectName();
            sidebarProjectTasksAmount.classList.add("projectTasksAmount");
            sidebarProjectTasksAmount.textContent = `(${projectArray[p].getProjectTasks().length} tasks)`;
            sidebarProjectNameDiv.appendChild(sidebarProjectName);
            sidebarProjectNameDiv.appendChild(sidebarProjectTasksAmount);
            sidebarProjectNamesDiv.appendChild(sidebarProjectNameDiv);
        };

        sidebarContent.appendChild(allProjectsLabel);
        sidebarContent.appendChild(sidebarProjectNamesDiv);
    };

    // Draws the project by passing the current project around, each function taking what it needs.
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

    // Draws all the tasks in a project. Calls drawTask on each iteration.
    const drawTasks = (project) => {
        const projectTasks = project.getProjectTasks();
        
        for (let t = 0; t < projectTasks.length; t++) {
            drawTask(projectTasks[t]);
        };
    };

    // Draws the task by passing the current project around, each function taking what it needs.
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
        drawTaskPriority(task);
        drawDeleteDiv(task);
    };

    // Checks if the projectNameDiv exists to avoid duplication
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
        projectName.classList.add("changeProjectName");
        projectName.classList.add(`${project.getProjectID()}`)
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

    // Checks if the projectNameDiv exists to avoid duplication
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
        projectDueDateValue.type = "datetime-local";
        projectDueDateValue.classList.add("projectDueDate");
        projectDueDateValue.classList.add(`${project.getProjectID()}`);

        projectDueDateDiv.appendChild(projectDueDate);
        projectDueDateDiv.appendChild(projectDueDateValue);
    };

    // Checks if the projectNameDiv exists to avoid duplication
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

    // Checks if the projectNameDiv exists to avoid duplication
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
        const taskDueDateDiv = document.createElement("div");

        taskDueDateDiv.classList.add("taskDueDateDiv");
        taskDueDateDiv.classList.add(`${task.getTaskID()}`);
        taskItemDetails.appendChild(taskDueDateDiv);
    };

    const drawTaskDueDate = (task) => {
        const taskDueDateDiv = document.querySelector(`.taskDueDateDiv.${task.getTaskID()}`);
        const taskDueDate = document.createElement("label");
        const taskDueDateValue = document.createElement("input");
        
        taskDueDate.textContent = `Due: ${task.getTaskDueDate()}`;
        taskDueDate.htmlFor = `due${task.getTaskID()}`;
        taskDueDateValue.id = `due${task.getTaskID()}`;
        taskDueDateValue.type = "datetime-local";
        taskDueDateValue.classList.add("taskDueDate");
        taskDueDateValue.classList.add(`${task.getTaskID()}`);

        taskDueDateDiv.appendChild(taskDueDate);
        taskDueDateDiv.appendChild(taskDueDateValue);
    };

    const drawTaskPriorityDiv = (task) => {
        const taskItemDetailsAll = document.querySelectorAll(".taskItemDetails");
        const taskItemDetails = taskItemDetailsAll[taskItemDetailsAll.length - 1];
        const taskPriorityDiv = document.createElement("div");

        taskPriorityDiv.classList.add("taskPriorityDiv");
        taskPriorityDiv.classList.add(`${task.getTaskID()}`);
        taskItemDetails.appendChild(taskPriorityDiv);
    };

    const drawTaskPriority = (task) => {
        const taskPriorityDiv = document.querySelector(`.taskPriorityDiv.${task.getTaskID()}`);
        const taskPriority = document.createElement("label");
        const taskPriorityValue = document.createElement("select");

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

    // Counts the tasks in a project that are completed and returns a string
    const countProjectTasksCompleted = (project) => {
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

    // drawProject and drawTasks are currently exposed for testing
    return {startAllListeners,
            drawSidebar,
            drawProject,
            drawTasks
    };
};