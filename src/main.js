import "./styles.css";
import DataManagerObject from "./data-manager.js";

const DataManager = DataManagerObject();

// This enables interaction with DataManager in DevTools
window.DataManager = DataManager;

DataManager.start();