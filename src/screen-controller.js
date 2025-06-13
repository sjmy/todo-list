import moreImage from "./img/more.svg";
import deleteImage from "./img/delete.svg";
import plusImage from "./img/add_circle.jpg";
import { format } from "date-fns";


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

    // In the Add Project dialog, if Add Project is clicked (submit), create the project and update the UI
    const addProjectSubmitListener = () => {
        const form = document.querySelector("form");

        form.addEventListener("submit", (e) => {
            const dialog = document.querySelector("dialog");
            const projectName = document.querySelector("#addProjectName");
            const projectDescription = document.querySelector("#addProjectDescription");
            const projectDueDate = document.querySelector("#addProjectDueDate");
            const projectPriority = document.querySelector("#addProjectPriority");

            e.preventDefault();

            DataManager.createProject(projectName.value, projectDescription.value, projectDueDate.value, projectPriority.value);
            const currentProject = projectArray[projectArray.length - 1];

            dialog.close();
            dialog.remove();
            drawProject(currentProject);
            drawTasks(currentProject);
            drawSidebar();
        });
    };

    // In the Add Task dialog, if Add Task is clicked (submit), create the task and update the UI
    const addTaskSubmitListener = () => {
        const form = document.querySelector("form");

        form.addEventListener("submit", (e) => {
            const dialog = document.querySelector("dialog");
            const projectName = document.querySelector("#taskProjectChoice");
            const taskName = document.querySelector("#addTaskName");
            const taskDescription = document.querySelector("#addTaskDescription");
            const taskDueDate = document.querySelector("#addTaskDueDate");
            const taskPriority = document.querySelector("#addTaskPriority");
            const currentProjectName = document.querySelector(".currentProjectName").textContent;
            let projectObject = projectArray[0];

            e.preventDefault();

            for (let p = 0; p < projectArray.length; p++) {
                if (projectArray[p].getProjectName() == projectName.value) {
                    projectObject = projectArray[p];
                };
            };

            DataManager.createTask(taskName.value, projectObject, taskDescription.value, taskDueDate.value, taskPriority.value);

            dialog.close();
            dialog.remove();

            // If the task is added to the currently displayed project, update the tasks UI
            // If not, just update the sidebar
            if (currentProjectName == projectObject.getProjectName()) {
                clearTaskItemsDiv();
                drawTasks(projectObject);
            };

            drawSidebar();
        });
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
                dialogAreYouSure(ID);

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
            if (targetClass == "sidebarProjectName") {
                for (let p = 0; p < projectArray.length; p++) {
                    if (projectArray[p].getProjectID() == ID) {
                        drawProject(projectArray[p]);
                        drawTasks(projectArray[p]);
                        startProjectListeners();
                        startTaskListeners();
                    };
                };
            };

            // If plus image is clicked, show dropdown choice between Add Task and Add Project
            if (targetClass == "addItem") {
                const addItemDropdown = document.querySelector("#addItemDropdown");
                addItemDropdown.classList.toggle("show");
            } else {
                const dropdownContent = document.querySelector(".dropdown-content");

                if (dropdownContent.classList.contains("show")) {
                    dropdownContent.classList.remove("show");
                };
            };

            // If Add Project is clicked, build and show the dialog
            if (targetClass == "addProject") {
                dialogAddProject();

                const dialog = document.querySelector("dialog");
                dialog.showModal();
            };

            // If cancel button is clicked in Add Project, close and remove the dialog
            if (targetClass == "addProjectCancelButton") {
                const dialog = document.querySelector("dialog");

                e.preventDefault();
                dialog.close();
                dialog.remove();
            };

            // If Add Task is clicked, build and show the dialog
            if (targetClass == "addTask") {
                dialogAddTask();

                const dialog = document.querySelector("dialog");
                dialog.showModal();
            };

            // If cancel button is clicked in Add Project, close and remove the dialog
            if (targetClass == "addTaskCancelButton") {
                const dialog = document.querySelector("dialog");

                e.preventDefault();
                dialog.close();
                dialog.remove();
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

    // Draws add button (plus image) in header
    const drawHeader = () => {
        const headerDiv = document.querySelector(".header");
        const addButtonDiv = document.createElement("div");
        const plus = document.createElement("img");
        const menuDropdown = document.createElement("div");
        const menuDropdownContent = document.createElement("div");
        const addProjectText = document.createElement("span");
        const addTaskText = document.createElement("span");

        addButtonDiv.classList.add("addButtonDiv");
        plus.classList.add("addItem");
        plus.src = plusImage;
        plus.alt = "Add Item";
        menuDropdown.classList.add("dropdown");
        menuDropdownContent.classList.add("dropdown-content");
        menuDropdownContent.id = "addItemDropdown";
        addProjectText.classList.add("addProject");
        addTaskText.classList.add("addTask");
        addProjectText.textContent = "Add Project";
        addTaskText.textContent = "Add Task";

        menuDropdownContent.appendChild(addProjectText);
        menuDropdownContent.appendChild(addTaskText);
        menuDropdown.appendChild(plus);
        menuDropdown.appendChild(menuDropdownContent);
        addButtonDiv.appendChild(menuDropdown);
        headerDiv.appendChild(addButtonDiv);
    };

    // Draws all projects in the sidebar
    const drawSidebar = () => {
        const sidebarContent = document.querySelector(".sidebar-content");
        const allProjectsLabel = document.createElement("h2");
        const sidebarProjectNamesDiv = document.createElement("div")

        clearSidebar();

        allProjectsLabel.textContent = "All Projects";
        allProjectsLabel.classList.add("allProjectsLabel");
        sidebarProjectNamesDiv.classList.add("sidebarProjectNamesDiv");

        for (let p = 0; p < projectArray.length; p++) {
            const sidebarProjectNameDiv = document.createElement("div");
            const sidebarProjectName = document.createElement("span");
            const sidebarProjectTasksAmount = document.createElement("span");

            sidebarProjectNameDiv.classList.add("sidebarProjectNameDiv");
            sidebarProjectName.classList.add("sidebarProjectName");
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
        projectName.classList.add("currentProjectName");
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
        taskLabel.classList.add("taskCheckbox");

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

    // Shows/hides task details
    function moreTaskDetails(taskID) {
        const detailsDiv = document.querySelector(`.taskDetailsDiv.${taskID}`);
        detailsDiv.style.display = (detailsDiv.style.display === "none" || detailsDiv.style.display === "") ? "block" : "none";
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


    // Dialog functions

    // Builds Add Project form for when Add Project is clicked
    // createProject = (projectName, projectDescription = "", projectDueDate = Date(), projectPriority = "None", projectTasks = [])
    // Todo: submitting form (where does the data go)
    const dialogAddProject = () => {
        const body = document.querySelector("body");
        const form = document.createElement("form");
        const dialog = document.createElement("dialog");
        const headerText = document.createElement("h3");
        const projectNameDiv = document.createElement("div");
        const projectNameLabel = document.createElement("label");
        const projectNameInput = document.createElement("input");
        const projectDescriptionDiv = document.createElement("div");
        const projectDescriptionLabel = document.createElement("label");
        const projectDescriptionInput = document.createElement("textarea");
        const projectItemsDiv = document.createElement("div");
        const projectDueDateDiv = document.createElement("div");
        const projectDueDateLabel = document.createElement("label");
        const projectDueDateInput = document.createElement("input");
        const projectPriorityDiv = document.createElement("div");
        const projectPriorityLabel = document.createElement("label");
        const projectPrioritySelect = document.createElement("select");
        const buttonsDiv = document.createElement("div");
        const addButton = document.createElement("button");
        const cancelButton = document.createElement("button");

        dialog.classList.add("dialogAddProject");
        headerText.textContent = "Add Project";
        headerText.classList.add("addProjectHeader");

        projectNameDiv.classList.add("addProjectNameDiv");
        projectNameLabel.textContent = "Project Name:";
        projectNameLabel.htmlFor = "addProjectName";
        projectNameInput.type = "text";
        projectNameInput.id = "addProjectName";
        projectNameInput.name = "addProjectName";
        projectNameInput.placeholder = "Required";
        projectNameInput.required = true;

        projectDescriptionDiv.classList.add("addProjectDescriptionDiv");
        projectDescriptionLabel.textContent = "Project Description:";
        projectDescriptionLabel.htmlFor = "addProjectDescription";
        projectDescriptionInput.id = "addProjectDescription";
        projectDescriptionInput.name = "addProjectDescription";

        projectItemsDiv.classList.add("addProjectItemsDiv");

        projectDueDateDiv.classList.add("addProjectDueDateDiv");
        projectDueDateLabel.textContent = "Due Date:";
        projectDueDateLabel.htmlFor = "addProjectDueDate";
        projectDueDateInput.type = "datetime-local";
        projectDueDateInput.id = "addProjectDueDate";
        projectDueDateInput.name = "addProjectDueDate";
        projectDueDateInput.defaultValue = format(Date(), "yyyy-MM-dd hh:mm");

        projectPriorityDiv.classList.add("addProjectPriorityDiv");
        projectPriorityLabel.textContent = "Priority:";
        projectPriorityLabel.htmlFor = "addProjectPriority";
        projectPrioritySelect.id = "addProjectPriority";
        projectPrioritySelect.name = "addProjectPriority";

        for (let p = 0; p < priorityValues.length; p++) {
            const priorityOption = document.createElement("option");
            priorityOption.value = priorityValues[p];
            priorityOption.textContent = priorityValues[p];
            projectPrioritySelect.appendChild(priorityOption);
        };

        buttonsDiv.classList.add("buttonsDiv");
        addButton.classList.add("addProjectAddButton");
        addButton.type = "submit";
        addButton.textContent = "Add Project";
        cancelButton.classList.add("addProjectCancelButton");
        cancelButton.textContent = "Cancel"
        cancelButton.formMethod = "dialog";

        projectNameDiv.appendChild(projectNameLabel);
        projectNameDiv.appendChild(projectNameInput);
        projectDescriptionDiv.appendChild(projectDescriptionLabel);
        projectDescriptionDiv.appendChild(projectDescriptionInput);
        projectDueDateDiv.appendChild(projectDueDateLabel);
        projectDueDateDiv.appendChild(projectDueDateInput);
        projectPriorityDiv.appendChild(projectPriorityLabel);
        projectPriorityDiv.appendChild(projectPrioritySelect);
        projectItemsDiv.appendChild(projectDueDateDiv);
        projectItemsDiv.appendChild(projectPriorityDiv);
        buttonsDiv.appendChild(addButton);
        buttonsDiv.appendChild(cancelButton);
        form.appendChild(headerText);
        form.appendChild(projectNameDiv);
        form.appendChild(projectDescriptionDiv);
        form.appendChild(projectItemsDiv);
        form.appendChild(buttonsDiv);
        dialog.appendChild(form);
        body.appendChild(dialog);

        addProjectSubmitListener();
    };

    // Builds Add Task form when Add Task is clicked
    // const createTask = (taskName, projectObject, taskDescription = "", taskDueDate = Date(), taskPriority = "None")
    const dialogAddTask = () => {
        const body = document.querySelector("body");
        const form = document.createElement("form");
        const dialog = document.createElement("dialog");
        const headerTextDiv = document.createElement("div");
        const headerText = document.createElement("h3");
        const taskProjectChoiceDiv = document.createElement("div");
        const taskProjectChoiceLabel = document.createElement("label");
        const taskProjectChoiceSelect = document.createElement("select");
        const taskNameDiv = document.createElement("div");
        const taskNameLabel = document.createElement("label");
        const taskNameInput = document.createElement("input");
        const taskDescriptionDiv = document.createElement("div");
        const taskDescriptionLabel = document.createElement("label");
        const taskDescriptionInput = document.createElement("textarea");
        const taskItemsDiv = document.createElement("div");
        const taskDueDateDiv = document.createElement("div");
        const taskDueDateLabel = document.createElement("label");
        const taskDueDateInput = document.createElement("input");
        const taskPriorityDiv = document.createElement("div");
        const taskPriorityLabel = document.createElement("label");
        const taskPrioritySelect = document.createElement("select");
        const buttonsDiv = document.createElement("div");
        const addButton = document.createElement("button");
        const cancelButton = document.createElement("button");

        dialog.classList.add("dialogAddTask");
        headerTextDiv.classList.add("addTaskHeaderDiv");
        headerText.textContent = "Add Task";
        headerText.classList.add("addTaskHeader");

        taskProjectChoiceDiv.classList.add("taskProjectChoiceDiv");
        taskProjectChoiceLabel.textContent = "Project:";
        taskProjectChoiceLabel.htmlFor = "taskProjectChoice"
        taskProjectChoiceSelect.id = "taskProjectChoice";
        taskProjectChoiceSelect.name = "taskProjectChoice";

        for (let p = 0; p < projectArray.length; p++) {
            const projectOption = document.createElement("option");
            projectOption.value = projectArray[p].getProjectName();
            projectOption.textContent = projectArray[p].getProjectName();
            taskProjectChoiceSelect.appendChild(projectOption);
        };

        taskNameDiv.classList.add("addTaskNameDiv");
        taskNameLabel.textContent = "Task Name:";
        taskNameLabel.htmlFor = "addTaskName";
        taskNameInput.type = "text";
        taskNameInput.id = "addTaskName";
        taskNameInput.name = "addTaskName";
        taskNameInput.placeholder = "Required";
        taskNameInput.required = true;

        taskDescriptionDiv.classList.add("addTaskDescriptionDiv");
        taskDescriptionLabel.textContent = "Task Description:";
        taskDescriptionLabel.htmlFor = "addTaskDescription";
        taskDescriptionInput.id = "addTaskDescription";
        taskDescriptionInput.name = "addTaskDescription";

        taskItemsDiv.classList.add("addTaskItemsDiv");

        taskDueDateDiv.classList.add("addTaskDueDateDiv");
        taskDueDateLabel.textContent = "Due Date:";
        taskDueDateLabel.htmlFor = "addTaskDueDate";
        taskDueDateInput.type = "datetime-local";
        taskDueDateInput.id = "addTaskDueDate";
        taskDueDateInput.name = "addTaskDueDate";
        taskDueDateInput.defaultValue = format(Date(), "yyyy-MM-dd hh:mm");

        taskPriorityDiv.classList.add("addTaskPriorityDiv");
        taskPriorityLabel.textContent = "Priority:";
        taskPriorityLabel.htmlFor = "addTaskPriority";
        taskPrioritySelect.id = "addTaskPriority";
        taskPrioritySelect.name = "addTaskPriority";

        for (let p = 0; p < priorityValues.length; p++) {
            const priorityOption = document.createElement("option");
            priorityOption.value = priorityValues[p];
            priorityOption.textContent = priorityValues[p];
            taskPrioritySelect.appendChild(priorityOption);
        };

        buttonsDiv.classList.add("buttonsDiv");
        addButton.classList.add("addTaskAddButton");
        addButton.type = "submit";
        addButton.textContent = "Add Task";
        cancelButton.classList.add("addTaskCancelButton");
        cancelButton.textContent = "Cancel"
        cancelButton.formMethod = "dialog";

        taskNameDiv.appendChild(taskNameLabel);
        taskNameDiv.appendChild(taskNameInput);
        taskDescriptionDiv.appendChild(taskDescriptionLabel);
        taskDescriptionDiv.appendChild(taskDescriptionInput);
        taskDueDateDiv.appendChild(taskDueDateLabel);
        taskDueDateDiv.appendChild(taskDueDateInput);
        taskPriorityDiv.appendChild(taskPriorityLabel);
        taskPriorityDiv.appendChild(taskPrioritySelect);
        taskItemsDiv.appendChild(taskDueDateDiv);
        taskItemsDiv.appendChild(taskPriorityDiv);
        buttonsDiv.appendChild(addButton);
        buttonsDiv.appendChild(cancelButton);
        taskProjectChoiceDiv.appendChild(taskProjectChoiceLabel);
        taskProjectChoiceDiv.appendChild(taskProjectChoiceSelect);
        headerTextDiv.appendChild(headerText);
        headerTextDiv.appendChild(taskProjectChoiceDiv);
        form.appendChild(headerTextDiv);
        form.appendChild(taskNameDiv);
        form.appendChild(taskDescriptionDiv);
        form.appendChild(taskItemsDiv);
        form.appendChild(buttonsDiv);
        dialog.appendChild(form);
        body.appendChild(dialog);

        addTaskSubmitListener();
    };

    // Builds confirmation form for when delete task is clicked
    const dialogAreYouSure = (taskID) => {
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
        deleteTaskText.classList.add("deleteTaskText");
        yesButton.textContent = "Yes";
        noButton.textContent = "No";

        buttons.appendChild(yesButton);
        buttons.appendChild(noButton);
        dialog.appendChild(deleteTaskText);
        dialog.appendChild(buttons);
        form.appendChild(dialog);
        body.appendChild(form);
    };

    // drawProject and drawTasks are currently exposed for testing
    return {startAllListeners,
            drawHeader,
            drawSidebar,
            drawProject,
            drawTasks
    };
};