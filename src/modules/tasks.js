import { Randomizer } from "./randomizer";

export class Task {
    constructor(projectId, id, name, notes, dueDate, priority, done, createdAt) {
        this.projectId = projectId;
        this.id = id || Randomizer.generateId();
        this.name = name || '';
        this.notes = notes || ':'
        this.dueDate = dueDate || null;
        this.priority = priority || 1;
        this.done = !!done
        this.createdAt = createdAt || Date.now()
    }

    updateDone() {
        this.done = !(!!this.done)
    }
}