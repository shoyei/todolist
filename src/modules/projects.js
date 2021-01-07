import { projectLibrary } from './library.js';
import { domOutput } from './DOMoutput';

export class Project {
    constructor(id, name, dueDate, priority, notes) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.taskList = [];
    }

    addToLibrary() {
        projectLibrary.push(this);     
    }

    removeFromLibrary() {
        projectLibrary.splice()
    }

    addTask(task) {
        this.taskList.push(task);
    }
}