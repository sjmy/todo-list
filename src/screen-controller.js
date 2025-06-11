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

export default function ScreenControllerObject(DataManager) {
    const projectArray = DataManager.getProjectArray();
    const mainContent = document.querySelector(".main");
    const priorityValues = ["None", "Low", "Medium", "High"];

    // Saves the project description when the text on any project is changed
    function changeProjectDescription() {
        const projectDescriptionTextBoxes = document.querySelector("#projectDescriptionText");
        const projectDescriptionValues = document.querySelector(".projectDescription");

        projectDescriptionTextBoxes.addEventListener("keyup", (e) => {
            const projectID = e.target.classList[1];

            for (let p = 0; p < projectArray.length; p++) {
                if (projectArray[p].getProjectID() == projectID) {
                    projectArray[p].setProjectDescription(projectDescriptionValues[p].dataset.replicatedValue);
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
                    // drawProject(projectArray[p]);
                };
            };
        });
    };

    // Sets project priority whenever it changes
    function changeProjectPriority() {
        const projectPriorityDropdowns = document.querySelector(".projectPriority");

        projectPriorityDropdowns.addEventListener("change", (e) => {
            const projectID = e.target.classList[1];

            for (let p = 0; p < projectArray.length; p++) {
                if (projectArray[p].getProjectID() == projectID) {
                    projectArray[p].setProjectPriority(projectPriorityDropdowns.value);
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
                            drawProject(projectArray[p]);
                        };
                    };
                };

                dialog.close();
            };

            if (targetClass == "noButton") {
                const dialog = document.querySelector("dialog");

                e.preventDefault();
                dialog.close();
            };

            if (targetClass == "checkbox") {
                for (let p = 0; p < projectArray.length; p++) {
                    const projectTasks = projectArray[p].getProjectTasks();

                    for (let n = 0; n < projectTasks.length; n++) {
                        if (projectTasks[n].getTaskID() == taskID) {
                            projectTasks[n].toggleIsComplete();
                            drawProject(projectArray[p]);
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
        changeTaskPriority();
        clickEvents();
    };

    const clearMainContent = () => {
        mainContent.textContent = "";
    };

// *******************************************************************************************************************************************

    const drawProjectNameDiv = () => {

    };

    const drawProjectTasksCompleted = () => {

    };

    const drawProjectItemsDiv = () => {

    };

    const drawProjectDueDateDiv = () => {

    };

    const drawProjectPriorityDiv = () => {

    };

    const drawProjectDescription = () => {

    };

    const drawTaskItemsDiv = () => {

    };

    const drawTaskItem = () => {

    };

    const drawTaskDetailsDiv = () => {

    };

    const drawTaskDescription = () => {

    };

    const drawTaskItemDetails = () => {
        
    };

    // Clears the main content area
    // Takes a project, creates HTML elements, attaches values and classes as necessary,
    // appends in order, calls drawTask() for each task in the project
    const drawProject = (project) => {
        const projectNameDiv = document.createElement("div");
        const projectName = document.createElement("h1");
        const projectTasksCompleted = document.createElement("span");
        const projectDescriptionDiv = document.createElement("div");
        const projectDescription = document.createElement("textarea");
        const projectItemsDiv = document.createElement("div");
        const projectDueDateDiv = document.createElement("div");
        const projectDueDate = document.createElement("label");
        const projectDueDateValue = document.createElement("input");
        const projectPriorityDiv = document.createElement("div");
        const projectPriority = document.createElement("label");
        const projectPriorityValue = document.createElement("select");        
        const projectTasks = project.getProjectTasks();
        const taskItemsDiv = document.createElement("div");

        clearMainContent();

        projectNameDiv.classList.add("projectNameDiv");
        projectTasksCompleted.classList.add("projectTasksCompleted");
        projectDescriptionDiv.classList.add("projectDescription");
        projectDescription.id = "projectDescriptionText";
        projectDescription.classList.add(`${project.getProjectID()}`);
        projectItemsDiv.classList.add("projectItemsDiv");
        taskItemsDiv.classList.add("taskItemsDiv");
        projectDueDateDiv.classList.add("projectDueDateDiv");
        projectDueDate.textContent = `Due: ${project.getProjectDueDate()}`;
        projectDueDate.htmlFor = `due${project.getProjectID()}`;
        projectDueDateValue.id = `due${project.getProjectID()}`;
        projectDueDateValue.type = "date";
        projectDueDateValue.classList.add("projectDueDate");
        projectDueDateValue.classList.add(`${project.getProjectID()}`);
        projectPriorityDiv.classList.add("projectPriorityDiv");
        projectPriority.textContent = "Priority:";
        projectPriority.htmlFor = `priority${project.getProjectID()}`;
        projectPriorityValue.id = `priority${project.getProjectID()}`;
        projectPriorityValue.classList.add("projectPriority");
        projectPriorityValue.classList.add(`${project.getProjectID()}`);

        for (let p = 0; p < priorityValues.length; p++) {
            const priorityOption = document.createElement("option");
            priorityOption.value = priorityValues[p];
            priorityOption.textContent = priorityValues[p];
            projectPriorityValue.appendChild(priorityOption);
        };

        // This event listener copies the project description to an attribute on the projectDescriptionDiv
        // In styles.css, a hidden pseudo-element is overlayed on projectDescription so the textarea matches the content
        // https://chriscoyier.net/2023/09/29/css-solves-auto-expanding-textareas-probably-eventually/
        projectDescription.addEventListener("input", () => {
            projectDescriptionDiv.dataset.replicatedValue = projectDescription.value;
        });

        projectName.textContent = project.getProjectName();
        projectDescription.textContent = project.getProjectDescription();
        projectTasksCompleted.textContent = countProjectTasksCompleted(project);

        projectNameDiv.appendChild(projectName);
        projectNameDiv.appendChild(projectTasksCompleted);
        projectDescriptionDiv.appendChild(projectDescription);
        projectDueDateDiv.appendChild(projectDueDate);
        projectDueDateDiv.appendChild(projectDueDateValue);
        projectPriorityDiv.appendChild(projectPriority);
        projectPriorityDiv.appendChild(projectPriorityValue);
        projectItemsDiv.appendChild(projectDueDateDiv);
        projectItemsDiv.appendChild(projectPriorityDiv);
        mainContent.appendChild(projectNameDiv);
        mainContent.appendChild(projectItemsDiv);
        mainContent.appendChild(projectDescriptionDiv);
        mainContent.appendChild(taskItemsDiv);

        // Call drawTask() for each task
        for (let t = 0; t < projectTasks.length; t++) {
            drawTask(projectTasks[t]);
        };
    };

    // Takes a task, creates a div, label, and checkbox, append to taskItems
    const drawTask = (task) => {
        const taskItemsDiv = document.querySelector(".taskItemsDiv");
        const taskDiv = document.createElement("div");
        const taskLabel = document.createElement("label");
        const checkbox = document.createElement("input");
        const moreDiv = document.createElement("div");
        const more = document.createElement("img");

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

        more.src = moreImage;
        more.alt = "Show task details";
        more.classList.add("more");
        more.classList.add(`${task.getTaskID()}`);

        moreDiv.appendChild(more);
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskLabel);
        taskDiv.appendChild(moreDiv);
        taskItemsDiv.appendChild(taskDiv);

        drawTaskDetails(task);
    };

    // Takes a task, creates a div with task detail elements, places it after the task item
    // Event listener can show and hide via css?
    const drawTaskDetails = (task) => {
        // Grab all drawn tasks and select the last (current) task
        const tasks = document.querySelectorAll(".taskItem");
        const taskItem = tasks[tasks.length - 1];

        // The div that holds all the remaining task details
        const taskDetailsDiv = document.createElement("div");

        // taskDescription has a div around it to facilitate the textarea fix event listener described below
        const taskDescriptionDiv = document.createElement("div");
        const taskDescription = document.createElement("textarea");

        // taskItems is created to display taskDueDate and taskPriority in line
        const taskItemDetails = document.createElement("div");
        const taskDueDate = document.createElement("span");
        const taskPriorityDiv = document.createElement("div");
        const taskPriority = document.createElement("label");
        const taskPriorityValue = document.createElement("select");

        // Delete image
        const del = document.createElement("img");

        del.src = deleteImage;
        del.alt = "Delete task";
        del.classList.add("delete");
        del.classList.add(`${task.getTaskID()}`);

        taskDetailsDiv.classList.add("taskDetailsDiv");
        taskDetailsDiv.classList.add(`${task.getTaskID()}`);
        taskDescriptionDiv.classList.add("taskDescription");
        taskDescriptionDiv.classList.add(`${task.getTaskID()}`);
        taskDescription.classList.add("taskDescriptionText");
        taskDescription.classList.add(`${task.getTaskID()}`);
        taskDescription.textContent = task.getTaskDescription();
        taskItemDetails.classList.add("taskItemDetails");
        // taskDueDate.classList.add(`${task.getTaskDueDate()}`);
        taskPriority.textContent = `Priority:`;
        taskPriority.htmlFor = `priority${task.getTaskID()}`;
        taskPriorityValue.id = `priority${task.getTaskID()}`;
        taskPriorityValue.classList.add("taskPriority");
        taskPriorityValue.classList.add(`${task.getTaskID()}`);

        for (let p = 0; p < priorityValues.length; p++) {
            const priorityOption = document.createElement("option");
            priorityOption.value = priorityValues[p];
            priorityOption.textContent = priorityValues[p];
            taskPriorityValue.appendChild(priorityOption);
        };

        // This event listener copies the task description to an attribute on the taskDescriptionDiv
        // In styles.css, a hidden pseudo-element is overlayed on taskDescription so the textarea matches the content
        // https://chriscoyier.net/2023/09/29/css-solves-auto-expanding-textareas-probably-eventually/
        taskDescription.addEventListener("input", () => {
            taskDescriptionDiv.dataset.replicatedValue = taskDescription.value;
        });

        taskDueDate.textContent = `Due: ${task.getTaskDueDate()}`;

        taskDescriptionDiv.appendChild(taskDescription);
        taskPriorityDiv.appendChild(taskPriority);
        taskPriorityDiv.appendChild(taskPriorityValue);
        taskItemDetails.appendChild(taskDueDate);
        taskItemDetails.appendChild(taskPriorityDiv);
        taskItemDetails.appendChild(del);
        taskDetailsDiv.appendChild(taskDescriptionDiv);
        taskDetailsDiv.appendChild(taskItemDetails);
        taskItem.after(taskDetailsDiv);

        changeProjectDescription();
        changeProjectDueDate();
        changeProjectPriority();
        changeTaskDescription();
        changeTaskPriority();
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

    return {clearMainContent,
            drawProject,
            drawTask,
            buildAreYouSure,
            startListeners
    };
};