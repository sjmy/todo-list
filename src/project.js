import createRandomString from "./randomstring";
import { format, isToday, isYesterday, isTomorrow } from "date-fns";

// - Project
//     - created via factory function
//     - separate lists of tasks
//     - when app is first opened, a 'default' project (My Tasks) is created that tasks are attached to
//     - users can create new projects and decide which project their tasks go into
//     - Properties:
//         - projectID
//             - getter
//         - projectName
//             - getter
//         - projectDescription
//             - getter/setter
//         - projectDueDate
//             - getter/setter
//         - projectPriority
//             - getter/setter

export default function ProjectObject(name, description, dueDate, priority, tasks) {
    const projectID = createRandomString(10);
    let projectName = name;
    let projectDescription = description;
    let projectDueDate = dueDate;
    let projectPriority = priority;
    let projectTasks = tasks;

    // Getters
    const getProjectID = () => projectID;
    const getProjectName = () => projectName;
    const getProjectDescription = () => projectDescription;
    const getProjectPriority = () => projectPriority;
    const getProjectTasks = () => projectTasks;
    const getProjectDueDate = () => {
        if (isToday(projectDueDate)) {
            return `Today, ${format(projectDueDate, "p")}`;
        } else if (isYesterday(projectDueDate)) {
            return `Yesterday, ${format(projectDueDate, "p")}`;
        } else if (isTomorrow(projectDueDate)) {
            return `Tomorrow, ${format(projectDueDate, "p")}`;
        } else {
            return format(projectDueDate, "PPPp");
        };
    };

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