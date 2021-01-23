
let _sharedInstance = null;

export class ProjectLibrary {

    static getSharedInstance() {
        if (!_sharedInstance) {
            _sharedInstance = new ProjectLibrary()
        }
        return _sharedInstance;
    }

    constructor() {
        this.projects = this.fetchProjects();
        console.log('projects', this.projects)
    }

    get count() {
        return this.projects && Object.keys(this.projects).length || 0
    }

    get projectList() {
        const sorted = this.projects && Object.keys(this.projects).map(
            projectId => this.projects[projectId]
        ).sort(
            (a, b) => a.dueDate - b.dueDate
        )
        console.log('sorted',sorted)
        return sorted
    }

    fetchProjects() {
        try {
            const currentLibrary = JSON.parse(localStorage.getItem('projectLibrary'));
            return currentLibrary || {};
        } catch (error) {
            console.error('THAT did not work', error);
            return {};
        }
    }

    //pushes project to library and stores in local storage
    addToLibrary(project) {
        this.saveProject(project);
    }

    //save project
    saveProject(project) {
        this.projects[project.id] = project;
        this.store();
    }

    removeFromLibrary(project) {
        if (this.projects.hasOwnProperty(project.id)) {
            delete this.projects[project.id];
            this.store();
        }
    }

    deleteAll() {
        this.projects = {};
        this.store();
    }

    store() {
        const libraryToStore = JSON.stringify(this.projects)
        localStorage.setItem('projectLibrary', libraryToStore);
    }
}