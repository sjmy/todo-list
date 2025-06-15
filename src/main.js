import "./styles.css";
import StorageControllerObject from "./storage-controller.js";
import DataManagerObject from "./data-manager.js";

const StorageController = StorageControllerObject();
const DataManager = DataManagerObject(StorageController);

// This enables interaction with DataManager in DevTools
// window.DataManager = DataManager;

DataManager.start(DataManager);