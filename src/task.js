import createRandomString from "./randomstring";
import { format, isToday, isYesterday, isTomorrow } from "date-fns";

// - Task
//     - created via factory function
//     - Properties:
//         - taskID
//             - getter
//         - taskName
//             - getter
//         - taskDescription
//             - getter/setter
//         - taskDueDate
//             - getter/setter
//         - taskPriority
//             - getter/setter
//         - taskNotes
//             - getter/setter
//         - checklist box
//             - toggle
//             - strikethrough when toggled

export default function TaskObject(name, description, dueDate, priority, complete) {
    const taskID = createRandomString(10);
    let taskName = name;
    let taskDescription = description;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let isComplete = complete;

    // Getters
    const getTaskID = () => taskID;
    const getTaskName = () => taskName;
    const getTaskDescription = () => taskDescription;
    const getTaskPriority = () => taskPriority;
    const getIsComplete = () => isComplete;
    const getTaskDueDate = () => {
        if (isToday(taskDueDate)) {
            return `Today, ${format(taskDueDate, "p")}`;
        } else if (isYesterday(taskDueDate)) {
            return `Yesterday, ${format(taskDueDate, "p")}`;
        } else if (isTomorrow(taskDueDate)) {
            return `Tomorrow, ${format(taskDueDate, "p")}`;
        } else {
            return format(taskDueDate, "PPPp");
        };
    };
    const getRawDueDate = () => taskDueDate;

    // Setters
    const setTaskDescription = (newTaskDescription) => {
        taskDescription = newTaskDescription;
    };

    const setTaskDueDate = (newTaskDueDate) => {
        taskDueDate = newTaskDueDate;
    };

    const setTaskPriority = (newTaskPriority) => {
        taskPriority = newTaskPriority;
    };

    const toggleIsComplete = () => {
        isComplete = !isComplete;
    };

    return {getTaskID,
            getTaskName,
            getTaskDescription,
            getTaskDueDate,
            getRawDueDate,
            getTaskPriority,
            getIsComplete,
            setTaskDescription,
            setTaskDueDate,
            setTaskPriority,
            toggleIsComplete
    };
};