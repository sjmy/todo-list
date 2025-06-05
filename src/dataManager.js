// - DataManager
//     - intermediary between data objects (Task, Project) and controller objects (ScreenController, StorageController)
//     - receives data from event listeners, sends it where it needs to go:
//         - Project factory
//         - Task factory
//         - ScreenController
//         - StorageController
//     - the DataManager contains an array of Projects, each project containing zero or more tasks
//         projectArray = [{projectID: "9834nhn98",
//                         projectName: "My Tasks",
//                         projectDescription: "My first list of tasks",
//                         projectDueDate: "2025-08-17",
//                         projectPriority: "high",
//                         projectTasks: [{taskID: "h345h34",
//                                         taskName: "do stuff",
//                                         taskDescription: "do stuff really well",
//                                         taskDueDate: "tomorrow",
//                                         taskPriority: "high",
//                                         taskNotes: "here are some thoughts on how to do stuff really well"}]}]

// Need a default value for projectDueDate and taskDueDate. Is it an empty date? "none"? Will there be issues assigning it a Date object if the default is a string?

export default function DataManager() {
    let projectArray = [];

    // Getters
    const getProjectArray = () => projectArray;

    const createTask = (taskName, taskDescription = "", taskDueDate = "", taskPriority = "none", taskNotes = "") => {
        const newTask = Task(taskName, taskDescription, taskDueDate, taskPriority, taskNotes);

        if (projectArray == []) {
            createProject("My Tasks");
        };
    };

    const createProject = (projectName, projectDescription = "", projectDueDate = "", projectPriority = "none", projectNotes = "") => {
        const newProject = Project(projectName, projectDescription, projectDueDate, projectPriority, projectNotes);

        // Check for existing project here or somewhere else? Form validation?
        projectArray.push(newProject);
    };



    return {};
};