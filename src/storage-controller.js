// - StorageController
//     - interacts with localStorage
//     - JSON.stringify() when sending to localStorage
//     - JSON.parse() when getting from localStorage
//         - destructure when getting JSON data to create the appropriate objects
//         - if the structure of JSON is known, should be able to recreate objects

// projectArray = [{projectID: "9834nhn98",
//                  projectName: "My Tasks",
//                  projectDescription: "My first list of tasks",
//                  projectDueDate: "2025-08-17",
//                  projectPriority: "high",
//                  projectTasks: [{taskID: "h345h34",
//                                  taskName: "do stuff",
//                                  taskDescription: "do stuff really well",
//                                  taskDueDate: "tomorrow",
//                                  taskPriority: "high"}
//                                ]
//                 }]

export default function StorageControllerObject() {

    // This function detects whether localStorage is both supported and available
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    function storageAvailable(type) {
        let storage;

        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            );
        };
    };

    // Gets all the data for each task and puts it into an object of key/value pairs for storage
    function getTasksForStorage(projectTasks) {
        const taskList = [];

        for (let t = 0; t < projectTasks.length; t++) {
            const taskID = projectTasks[t].getTaskID();
            const taskName = projectTasks[t].getTaskName();
            const taskDescription = projectTasks[t].getTaskDescription();
            const taskDueDate = projectTasks[t].getRawDueDate();
            const taskPriority = projectTasks[t].getTaskPriority();
            const taskIsComplete = projectTasks[t].getIsComplete();

            taskList.push({
                taskID: taskID,
                taskName: taskName,
                taskDescription: taskDescription,
                taskDueDate: taskDueDate,
                taskPriority: taskPriority,
                taskIsComplete: taskIsComplete});
        };

        return taskList;
    };

    // Gets all the data for each project and puts it into an object of key/value pairs for storage
    // Calls getTasksForStorage() to get the task list for each project
    function getProjectArrayForStorage(projectArray) {
        // const projectArray = DataManager.getProjectArray();
        const projectArrayForStorage = [];

        for (let p = 0; p < projectArray.length; p++) {
            const projectID = projectArray[p].getProjectID();
            const projectName = projectArray[p].getProjectName();
            const projectDescription = projectArray[p].getProjectDescription();
            const projectDueDate = projectArray[p].getRawDueDate();
            const projectPriority = projectArray[p].getProjectPriority();
            const projectTasks = projectArray[p].getProjectTasks();

            projectArrayForStorage.push({
                projectID: projectID,
                projectName: projectName,
                projectDescription: projectDescription,
                projectDueDate: projectDueDate,
                projectPriority: projectPriority,
                projectTasks: getTasksForStorage(projectTasks)
            });
        };

        return projectArrayForStorage;
    };

    function updateStorage(projectArray) {
        localStorage.setItem("projectArray", JSON.stringify(getProjectArrayForStorage(projectArray)));
    };

    function updateDataManager(DataManager) {
        // This needs to update the DataManager with the recreated projectArray. Recreated Projects and Tasks with the strings in localStorage
        // JSON.parse() stringified objects like Date(), and maybe arrays?
        // createTask = (taskName, projectObject, taskDescription = "", taskDueDate = Date(), taskPriority = "None")
        // createProject = (projectName, projectDescription = "", projectDueDate = Date(), projectPriority = "None", projectTasks = [])
        const localStorageProjectArray = JSON.parse(localStorage.getItem("projectArray"));

        for (let p = 0; p < localStorageProjectArray.length; p++) {
            const projectName = localStorageProjectArray[p].projectName;
            const projectDescription = localStorageProjectArray[p].projectDescription;
            const projectDueDate = localStorageProjectArray[p].projectDueDate;
            const projectPriority = localStorageProjectArray[p].projectPriority;
            const projectTasks = localStorageProjectArray[p].projectTasks;

            DataManager.createProject(projectName, projectDescription, projectDueDate, projectPriority);

            for (let t = 0; t < projectTasks.length; t++) {
                const projectArray = DataManager.getProjectArray();
                const taskName = projectTasks[t].taskName;
                const taskDescription = projectTasks[t].taskDescription;
                const taskDueDate = projectTasks[t].taskDueDate;
                const taskPriority = projectTasks[t].taskPriority;
                const taskIsComplete = projectTasks[t].taskIsComplete;

                DataManager.createTask(taskName, projectArray[p], taskDescription, taskDueDate, taskPriority, taskIsComplete);
            };
        };
    };

    const start = (DataManager) => {
        if (storageAvailable("localStorage")) {
            // localStorage available. Check to see if there is a projectArray in localStorage
            if (localStorage.getItem("projectArray")) {
                // We found a projectArray, update the DataManager projectArray
                // console.log("projectArray found");
                updateDataManager(DataManager);
            } else {
                // No projectArray found
                return false;
            }
        } else {
            // localStorage unavailable
            return false;
        };
    };

    return {start,
            updateStorage,
            updateDataManager
    };
};