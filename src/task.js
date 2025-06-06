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

export default function TaskObject(name, description, dueDate, priority, notes) {
    const taskID = crypto.randomUUID();
    let taskName = name;
    let taskDescription = description;
    let taskDueDate = dueDate;
    let taskPriority = priority;
    let taskNotes = notes;
    let isComplete = false;

    // Getters
    const getTaskID = () => taskID;
    const getTaskName = () => taskName;
    const getTaskDescription = () => taskDescription;
    const getTaskDueDate = () => taskDueDate;
    const getTaskPriority = () => taskPriority;
    const getTaskNotes = () => taskNotes;
    const getIsComplete = () => isComplete;

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

    const toggleIsComplete = () => {
        isComplete = !isComplete;
    };

    return {getTaskID,
            getTaskName,
            getTaskDescription,
            getTaskDueDate,
            getTaskPriority,
            getTaskNotes,
            getIsComplete,
            setTaskDescription,
            setTaskDueDate,
            setTaskPriority,
            setTaskNotes,
            toggleIsComplete
    };
};