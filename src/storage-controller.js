// - StorageController
//     - interacts with localStorage
//     - JSON.stringify() when sending to localStorage
//     - JSON.parse() when getting from localStorage
//         - destructure when getting JSON data to create the appropriate objects
//         - if the structure of JSON is known, should be able to recreate objects

export default function StorageControllerObject(DataManager) {

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

    function updateStorage() {

    };

    function updateDataManager() {

    };

    const start = () => {
        if (storageAvailable("localStorage")) {
            // localStorage available. Check to see if there is a projectArray in localStorage
            if (localStorage.getItem("projectArray")) {
                // We found a projectArray, update the DataManager projectArray
                console.log("projectArray found");
                updateDataManager();
            } else {
                // No projectArray found
                console.log("No projectArray found");
                return false;
            }
        } else {
            // localStorage unavailable
            return false;
        };
    };

    return {start,
            updateStorage
    };
};