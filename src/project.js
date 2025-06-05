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
//         - notes
//             - getter/setter
//         - checklist?

export default function Project(projectName, projectDescription, projectDueDate, projectPriority, projectNotes) {
    const projectID = crypto.randomUUID();
    let projectName = projectName;
    let projectDescription = projectDescription;
    let projectDueDate = projectDueDate;
    let projectPriority = projectPriority;
    let projectNotes = projectNotes;

    // Getters
    const getProjectID = () => projectID;
    const getProjectDescription = () => projectDescription;
    const getProjectDueDate = () => projectDueDate;
    const getProjectPriority = () => projectPriority;
    const getProjectNotes = () => projectNotes;

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

    const setProjectNotes = (newProjectNotes) => {
        projectNotes = newProjectNotes;
    };

    return {getProjectID,
            getProjectDescription,
            getProjectDueDate,
            getProjectPriority,
            getProjectNotes,
            setProjectDescription,
            setProjectDueDate,
            setProjectPriority,
            setProjectNotes};
};