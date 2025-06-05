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

export default function Task(taskName, taskDescription, taskDueDate, taskPriority, taskNotes) {
    const taskID = crypto.randomUUID();
    let taskName = taskName;
    let taskDescription = taskDescription;
    let taskDueDate = taskDueDate;
    let taskPriority = taskPriority;
    let taskNotes = taskNotes;

    // Getters
    const getTaskID = () => taskID;
    const getTaskDescription = () => taskDescription;
    const getTaskDueDate = () => taskDueDate;
    const getTaskPriority = () => taskPriority;
    const getTaskNotes = () => taskNotes;

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

    const setTaskNotes = (newTaskNotes) => {
        taskNotes = newTaskNotes;
    };

    return {getTaskID,
            getTaskDescription,
            getTaskDueDate,
            getTaskPriority,
            getTaskNotes,
            setTaskDescription,
            setTaskDueDate,
            setTaskPriority,
            setTaskNotes};
};