import { ProjectLibrary } from './library.js';
import { domOutput } from './DOMoutput';
import { Randomizer } from './randomizer.js';

export class Project {
    constructor(id, name, dueDate, priority, notes, tasks, createdAt) {
        this.id = id || Randomizer.generateId();
        this.name = name || '';
        this.dueDate = +(new Date(dueDate));
        this.priority = priority || 1;
        this.notes = notes || '';
        this.tasks = tasks || {};
        this.createdAt = createdAt || Date.now()
    }
    //project.tasks.get(task.id)

    addTask(task) {
        this.tasks[task.id] = task;
        ProjectLibrary.getSharedInstance().saveProject(this);
    };

    getTask(taskId) {
        return this.tasks[taskId];
    }

    get count() {
        return Object.keys(this.tasks).length || 0;
    }

    removeTask(task) {
        const library = ProjectLibrary.getSharedInstance();
        delete this.tasks[task.id]
        library.store();
    }

    get taskList() {
        const sorted = this.tasks && Object.keys(this.tasks).map(
            taskId => this.tasks[taskId]
        ).sort(
            (a, b) => a.dueDate - b.dueDate
        )
        return sorted
    }
}