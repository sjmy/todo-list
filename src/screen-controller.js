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

export default function ScreenControllerObject() {
    const mainContent = document.querySelector(".main");
    const priorityValues = ["None", "Low", "Medium", "High"];

    const clearMainContent = () => {
        mainContent.textContent = "";
    };

    // Clears the main content area
    // Takes a project, creates HTML elements, attaches values and classes as necessary,
    // appends in order, calls drawTask() for each task in the project
    const drawProject = (project) => {
        const mainContent = document.querySelector(".main");
        const projectName = document.createElement("h1");
        const projectDescriptionDiv = document.createElement("div");
        const projectDescription = document.createElement("textarea");
        const projectItems = document.createElement("div");
        const projectDueDate = document.createElement("span");
        const projectPriorityDiv = document.createElement("div");
        const projectPriority = document.createElement("label");
        const projectPriorityValue = document.createElement("select");        
        const projectTasks = project.getProjectTasks();
        const taskItems = document.createElement("div");

        clearMainContent();

        projectDescriptionDiv.classList.add("projectDescription");
        projectDescription.classList.add("projectDescriptionText");
        projectDescription.classList.add(`${project.getProjectID()}`);
        projectItems.classList.add("projectItems");
        // projectDueDate.classList.add(`${project.getProjectDueDate()}`);
        // projectPriority.classList.add(`${project.getProjectPriority()}`);
        taskItems.classList.add("taskItems");
        projectPriority.textContent = `Priority:`;
        projectPriority.htmlFor = `priority${project.getProjectID()}`;
        projectPriorityValue.name = `priority${project.getProjectID()}`;
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
        projectDueDate.textContent = `Due: ${project.getProjectDueDate()}`;

        projectDescriptionDiv.appendChild(projectDescription);
        projectPriorityDiv.appendChild(projectPriority);
        projectPriorityDiv.appendChild(projectPriorityValue);
        projectItems.appendChild(projectDueDate);
        projectItems.appendChild(projectPriorityDiv);
        mainContent.appendChild(projectName);
        mainContent.appendChild(projectItems);
        mainContent.appendChild(projectDescriptionDiv);
        mainContent.appendChild(taskItems);

        // Call drawTask() for each task
        for (let t = 0; t < projectTasks.length; t++) {
            drawTask(projectTasks[t]);
        };
    };

    // Takes a task, creates a div, label, and checkbox, append to taskItems
    const drawTask = (task) => {
        const taskItems = document.querySelector(".taskItems");
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

        // moreDiv.classList.add("more");
        // moreDiv.classList.add(`${task.getTaskID()}`);

        more.src = moreImage;
        more.alt = "Show task details";
        more.classList.add("more");
        more.classList.add(`${task.getTaskID()}`);

        moreDiv.appendChild(more);
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskLabel);
        taskDiv.appendChild(moreDiv);
        taskItems.appendChild(taskDiv);

        drawTaskDetails(task);
    };

    // Takes a task, creates a div with task detail elements, places it after the task item
    // Event listener can show and hide via css?
    const drawTaskDetails = (task) => {
        // Grab all drawn tasks and select the last (current) task
        const tasks = document.querySelectorAll(".taskItem");
        const taskItem = tasks[tasks.length - 1];

        // The div that holds all the remaining task details
        const taskDetails = document.createElement("div");

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

        taskDetails.classList.add("taskDetails");
        taskDetails.classList.add(`${task.getTaskID()}`);
        taskDescriptionDiv.classList.add("taskDescription");
        taskDescriptionDiv.classList.add(`${task.getTaskID()}`);
        taskDescription.classList.add("taskDescriptionText");
        taskDescription.classList.add(`${task.getTaskID()}`);
        taskDescription.textContent = task.getTaskDescription();
        taskItemDetails.classList.add("taskItemDetails");
        // taskDueDate.classList.add(`${task.getTaskDueDate()}`);
        taskPriority.textContent = `Priority:`;
        taskPriority.htmlFor = `priority${task.getTaskID()}`;
        taskPriorityValue.name = `priority${task.getTaskID()}`;
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
        taskDetails.appendChild(taskDescriptionDiv);
        taskDetails.appendChild(taskItemDetails);
        taskItem.after(taskDetails);
    };

    return {clearMainContent,
            drawProject,
            drawTask
    };
};