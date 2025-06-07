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
        const projectPriority = document.createElement("span");
        const projectTasks = project.getProjectTasks();
        const taskItems = document.createElement("div");

        clearMainContent();

        projectDescriptionDiv.classList.add("projectDescription");
        projectDescription.classList.add(`${project.getProjectID()}`);
        projectItems.classList.add("projectItems");
        taskItems.classList.add("taskItems");

        // This event listener copies the project description to an attribute on the projectDescriptionDiv
        // In styles.css, a hidden pseudo-element is overlayed on projectDescription so the textarea matches the content
        // https://chriscoyier.net/2023/09/29/css-solves-auto-expanding-textareas-probably-eventually/
        projectDescription.addEventListener("input", () => {
            projectDescriptionDiv.dataset.replicatedValue = projectDescription.value;
        });

        projectName.textContent = project.getProjectName();
        projectDescription.textContent = project.getProjectDescription();
        projectDueDate.textContent = `Due: ${project.getProjectDueDate()}`;
        projectPriority.textContent = `${project.getProjectPriority()} priority`;

        projectDescriptionDiv.appendChild(projectDescription);
        projectItems.appendChild(projectDueDate);
        projectItems.appendChild(projectPriority);
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

        taskDiv.classList.add(`${task.getTaskID()}`);
        taskLabel.htmlFor = `${task.getTaskID()}`;
        checkbox.id = `${task.getTaskID()}`;
        taskLabel.textContent = task.getTaskName();
        checkbox.type = "checkbox";

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskLabel);
        taskItems.appendChild(taskDiv);
    };

    return {clearMainContent,
            drawProject,
            drawTask
    };
};