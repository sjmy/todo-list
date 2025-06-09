import ProjectObject from "./project.js";
import TaskObject from "./task.js";

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

export default function DataManagerObject() {
    let projectArray = [];

    // Getter
    const getProjectArray = () => projectArray;

    // Create a task. taskName is the only required field.
    // A project object must always be passed as a parameter
    const createTask = (taskName, projectObject, taskDescription = "", taskDueDate = "", taskPriority = "None") => {
        const newTaskObject = TaskObject(taskName, taskDescription, taskDueDate, taskPriority);
        addTaskToProject(newTaskObject, projectObject);
    };

    // Create a project. projectName is the only required field.
    const createProject = (projectName, projectDescription = "", projectDueDate = "", projectPriority = "None", projectTasks = []) => {
        const newProjectObject = ProjectObject(projectName, projectDescription, projectDueDate, projectPriority, projectTasks);

        // Check for existing project here? Or caught via form validation?
        projectArray.push(newProjectObject);
    };

    const start = () => {
        // Talk to StorageController to get parsed localStorage JSON
        // If localStorage is empty:
        createProject("My Tasks");
    };

    // If project is not specified on task creation, task gets placed in the default project ("My Tasks")
    // "My Tasks" project is created during start()
    const addTaskToProject = (taskObject, projectObject) => {
        for (let i = 0; i < projectArray.length; i++) {
            const existingProjectID = projectArray[i].getProjectID();
            if (existingProjectID == projectObject.getProjectID()) {
                projectArray[i].getProjectTasks().push(taskObject);
            };
        };
    };

    const deleteTask = (task) => {
        const taskID = task.getTaskID();

        for (let p = 0; p < projectArray.length; p++) {
            const projectTasks = projectArray[p].getProjectTasks();

            for (let t = 0; t < projectTasks.length; t++) {
                const existingTaskID = projectTasks[t].getTaskID();

                if (existingTaskID == taskID) {
                    console.log(`Task ${projectTasks[t].getTaskName()} deleted from Project ${projectArray[p].getProjectName()}`);
                    projectTasks.splice(t, 1);
                };
            };
        };
    };

    // Move task to a different project
    const moveTask = (task, newProject) => {
        // task is task object to be moved
        // newProject is project object the task is to be moved into
        deleteTask(task);
        addTaskToProject(task, newProject);
    };

    return {getProjectArray,
            createTask,
            createProject,
            addTaskToProject,
            moveTask,
            deleteTask,
            start
    };
};