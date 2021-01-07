
import { Project } from './modules/projects.js';
import { Task } from './modules/tasks.js';
import { projectLibrary } from './modules/library.js';
import {DomOutput} from './modules/DOMoutput.js';

let defaultProject = new Project(0, 'Be Coding Genius', Date(), 1, 'Oh, you know', [])

defaultProject.addToLibrary()

let defaultProject2 = new Project(1, 'Be Coding Genius2', Date(), 1, 'Oh, you know', [])

defaultProject2.addToLibrary()

let defaultProject3 = new Project(2, 'Be Coding Genius3', Date(), 1, 'Oh, you know', [])

defaultProject3.addToLibrary();

DomOutput.loadProjectList();

console.log(projectLibrary);

let defaultTask1 = new Task(1, 'Finish TOP', 'Doing as much as possible every day', Date(), 1, false)

defaultProject.addTask(defaultTask1);

let defaultTask2 = new Task(2, 'Finish TOP', 'Doing as much as possible every day', Date(), 1, false)

defaultProject.addTask(defaultTask2);

console.log(defaultProject);