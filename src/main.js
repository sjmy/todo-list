import "./styles.css";
import DataManagerObject from "./data-manager.js";
import ScreenControllerObject from "./screen-controller.js";

const DataManager = DataManagerObject();
const ScreenController = ScreenControllerObject(DataManager);

const projects = DataManager.getProjectArray();

window.DataManager = DataManager;

DataManager.start();
DataManager.createProject("Plant Trees", "Plant all those trees");

const projectOne = projects[0];
const projectTwo = projects[1];

projectOne.setProjectDescription("This is the project description!");
projectOne.setProjectDueDate("Tomorrow");
projectOne.setProjectPriority("High");
DataManager.createTask("Water plants", projectOne);
DataManager.createTask("Repot peace lily", projectOne);
DataManager.createTask("Buy End-All", projectOne);
DataManager.createTask("Propagate umbrella plant", projectOne);
DataManager.createTask("Fertilize calathea", projectOne);

DataManager.createTask("Bloodgood Maple", projectTwo);
DataManager.createTask("Japanese Stewartia", projectTwo);
DataManager.createTask("Buy big containers", projectTwo);
DataManager.createTask("Buy mulch", projectTwo);
DataManager.createTask("Enjoy", projectTwo);

ScreenController.drawProject(projectTwo);
ScreenController.drawTasks(projectTwo);
ScreenController.startListeners();