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

    return {clearMainContent,

    };
};