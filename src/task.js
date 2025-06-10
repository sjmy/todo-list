import createRandomString from "./randomstring";
import { format, isToday, isYesterday, isTomorrow } from "date-fns";

// - Task
//     - created via factory function
//     - Properties:
//         - taskID
//             - crypto.randomUUID()
//         - taskName
//             - getter/setter
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

// Need a default value for taskDueDate. Is it an empty date? "none"? Will there be issues assigning it a Date object if the default is a string?

export default function TaskObject(name, description, dueDate, priority) {
    const taskID = createRandomString(10);
    let taskName = name;
    let taskDescription = description;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let isComplete = false;

    // Getters
    const getTaskID = () => taskID;
    const getTaskName = () => taskName;
    const getTaskDescription = () => taskDescription;
    const getTaskPriority = () => taskPriority;
    const getIsComplete = () => isComplete;
    const getTaskDueDate = () => {
        if (isToday(taskDueDate)) {
            return "Today";
        } else if (isYesterday(taskDueDate)) {
            return "Yesterday";
        } else if (isTomorrow(taskDueDate)) {
            return "Tomorrow";
        } else {
            return format(taskDueDate, "PPPp");
        };
    };

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
            getTaskPriority,
            getIsComplete,
            setTaskDescription,
            setTaskDueDate,
            setTaskPriority,
            toggleIsComplete
    };
};