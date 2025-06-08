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
//         - change projectDescription
//     - Task
//         - checkbox toggles isComplete
//             - could show amount of tasks completed next to the project "3/6 tasks completed"
//         - change name
//         - more icon to show/hide task details
//         - change taskDescription
//         - change dueDate
//         - change priority
//         - delete task
//             - add a trash icon in taskItemDetails

export default function ListenerObject() {
    function moreTaskDetails(id) {
        const detailsDiv = document.querySelector(`.taskDetails.${id}`);
        detailsDiv.style.display = (detailsDiv.style.display === "none" || detailsDiv.style.display === "") ? "block" : "none";
    };

    // Start the event listener, call functions based on targetClass, send id for specific project or task
    const start = () => {
        document.addEventListener("click", (e) => {
            const targetClass = e.target.classList[0];
            const id = e.target.classList[1];

            if (targetClass == "more") {
                moreTaskDetails(id);
            };
        });
    };

    return { start }
};