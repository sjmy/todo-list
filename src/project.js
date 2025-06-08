// - Project
//     - created via factory function
//     - separate lists of tasks
//     - when app is first opened, a 'default' project (My Tasks?) is created that tasks are attached to
//     - users can create new projects and decide which project their tasks go into
//     - Properties:
//         - projectID
//             - crypto.randomUUID()
//         - projectName
//             - getter/setter
//         - projectDescription
//             - getter/setter
//         - projectDueDate
//             - getter/setter
//         - projectPriority
//             - getter/setter

export default function ProjectObject(name, description, dueDate, priority, tasks) {
    const projectID = crypto.randomUUID();
    let projectName = name;
    let projectDescription = description;
    let projectDueDate = dueDate;
    let projectPriority = priority;
    let projectTasks = tasks;

    // Getters
    const getProjectID = () => projectID;
    const getProjectName = () => projectName;
    const getProjectDescription = () => projectDescription;
    const getProjectDueDate = () => projectDueDate;
    const getProjectPriority = () => projectPriority;
    const getProjectTasks = () => projectTasks;

    // Setters
    const setProjectDescription = (newProjectDescription) => {
        projectDescription = newProjectDescription;
    };

    const setProjectDueDate = (newProjectDueDate) => {
        projectDueDate = newProjectDueDate;
    };

    const setProjectPriority = (newProjectPriority) => {
        projectPriority = newProjectPriority;
    };

    return {getProjectID,
            getProjectName,
            getProjectDescription,
            getProjectDueDate,
            getProjectPriority,
            getProjectTasks,
            setProjectDescription,
            setProjectDueDate,
            setProjectPriority
    };
};