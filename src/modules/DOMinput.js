import { DomOutput } from './DOMoutput.js';
import { Project } from './projects.js';
import { ProjectLibrary } from './library.js';
import { Task } from './tasks.js';
import { format, formatISO } from 'date-fns';
import { Randomizer } from './randomizer.js'

let currentProject;
let currentTask;
let didInit = false
const listeners = new Map();

export class DomInput {
    //------------General------------//

    //Applies a listener to each project in the project list that opens the selected project's tasks.
    static applyTaskListBtn(project) {
        currentProject = project;
        const projectButton = document.querySelector(`#projectName${project.id}`)
        if (listeners.get(project.id)) {
            projectButton.removeEventListener('click', listeners.get(project.id))
        }
        const loadTasksListener = function () {
            DomOutput.loadTaskList(project);
        }
        listeners.set(project.id, loadTasksListener)
        projectButton.addEventListener('click', loadTasksListener)
        console.log(listeners)
    };

    static formatDate(_date) {
        const _month = _date.getMonth() + 1
        const _day = _date.getDate()
        const _year = _date.getFullYear()
        const _hours = _date.getHours()
        const _minutes = _date.getMinutes()
        const pad = x => x < 10 ? '0' + x : x
        const _conversion = `${_year}-${pad(_month)}-${pad(_day)}T${pad(_hours)}:${pad(_minutes)}`
        return _conversion
    }


    //------------Managing Project Input and Editing//------------//

    static loadProject(project) {
        currentProject = project;
        const overlay2 = document.querySelector('#overlay2');
        overlay2.style.display = 'none';
        const editProjectData = document.querySelector('#newProjectData').elements
        const name = editProjectData[0];
        const dueDate = editProjectData[2];
        const notes = editProjectData[1];
        name.value = project.name;
        const radioHigh = document.querySelector('#radioProjectHigh')
        const radioMed = document.querySelector('#radioProjectMed')
        const radioLow = document.querySelector('#radioProjectLow')
        radioHigh.checked = project.priority == 3;
        radioMed.checked = project.priority == 2;
        radioLow.checked = project.priority == 1;
        notes.value = project.notes;
        dueDate.value = DomInput.formatDate(new Date(project.dueDate))
    }

    //Adds a listener to New Project button at the top of the project list to open the new project form.
    static newProjectBtn() {
        if (didInit) return
        const newProjectBtn = document.querySelector('#newProject')
        const overlay1 = document.querySelector('#overlay');
        newProjectBtn.addEventListener('click', () => {
            overlay1.style.display = 'flex'
            DomInput.loadProject(new Project())
        })
    };

    //Adds a listener to Edit Project button and loads current project data into form.
    static editProjectBtn(project) {
        if (didInit) return
        const editProjectBtn = document.querySelector('.editProjectBtn')
        const overlay = document.querySelector('#overlay');

        if (listeners.get(project.id + 'editProjectBtn')) {
            editProjectBtn.removeEventListener('click', listeners.get(project.id + 'editProjectBtn'))
        }
        const unHideOverlay = function () {
            overlay.style.display = 'flex';
            DomInput.loadProject(project);
        }
        listeners.set(project.id + 'editProjectBtn', unHideOverlay)
        editProjectBtn.addEventListener('click', unHideOverlay)
    }

    //Function for newProjectForm's event listener to create new project and reload page
    static newProjectSubmit() {
        const newProjectData = document.querySelector('#newProjectData').elements;
        console.log(newProjectData.length)
        const overlay1 = document.querySelector('#overlay');
        const name = newProjectData[0].value;
        const dueDate = new Date(newProjectData[2].value).valueOf();
        const priority = () => {
            const radioHigh = document.querySelector('#radioProjectHigh')
            const radioMed = document.querySelector('#radioProjectMed')
            const radioLow = document.querySelector('#radioProjectLow')
            if (radioHigh.checked) return 3;
            else if (radioMed.checked) return 2;
            else if (radioLow.checked) return 1;
        }
        const notes = newProjectData[1].value;
        const newProject = new Project(currentProject.id, `${name}`, +dueDate, +priority(), `${notes}`, currentProject.tasks);
        ProjectLibrary.getSharedInstance().saveProject(newProject);
        overlay1.style.display = 'none';
        DomOutput.loadProjectList();
        DomOutput.loadTaskList(newProject);
        document.querySelector('#newProjectData').reset();
    };

    //Retrieves data from 'new project' form upon submit button click,
    //pushes to library, and reloads the page with the empty project pulled up.
    static newProjectForm() {
        if (didInit) return;
        const newProjectSubmit = document.querySelector('#newProjectSubmit');
        newProjectSubmit.addEventListener('click', DomInput.newProjectSubmit);
    };

    //Hides new project form.
    static exitNewProject() {
        const newProjectExit = document.querySelector('#newProjectExit')
        newProjectExit.addEventListener('click', () => {
            document.querySelector('#overlay').style.display = 'none'
        })
    }

    //Adds a listener to each delete div on each project and reloads the page.
    static removeProject(project) {
        if (didInit) return
        const library = ProjectLibrary.getSharedInstance();
        const projectDeleteBtn = document.querySelector(`#deleteBtn${project.id}`)
        projectDeleteBtn.addEventListener('click', () => {
            library.removeFromLibrary(project);
            DomOutput.loadProjectList();
            DomOutput.loadTaskList();
        })
    }


    //------------Managing Task Input and Editing//------------//


    static loadTask(project, task) {
        currentProject = project
        currentTask = task;
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
        const editTaskData = document.querySelector('#newTaskData').elements
        const name = editTaskData[0];
        const notes = editTaskData[1];
        const dueDate = editTaskData[2];
        
        name.value = task.name
        const radioHigh = document.querySelector('#radioProjectHigh')
        const radioMed = document.querySelector('#radioProjectMed')
        const radioLow = document.querySelector('#radioProjectLow')
        radioHigh.checked = task.priority == 3
        radioMed.checked = task.priority == 2
        radioLow.checked = task.priority == 1
        notes.value = task.notes;
        dueDate.value = DomInput.formatDate(new Date(task.dueDate))
    }

    //Adds a listener  to the New Task button at the top of the task list to open the new task form.
    static newTaskBtn(project, task) {
        const newTaskBtn = document.querySelector('.newTaskBtn')
        const overlay2 = document.querySelector('#overlay2');
        if (listeners.get(task.id)) {
            projectButton.removeEventListener('click', listeners.get(task.id))
        }
        const unHideOverlay = function () {
            overlay2.style.display = 'flex';
            DomInput.loadTask(project, task);
        }
        listeners.set(task.id, unHideOverlay)
        newTaskBtn.addEventListener('click', unHideOverlay)
    };

    //Function for newTaskForm's event listener to create a new task and reload page.
    static newTaskSubmit() {
        const newTaskData = document.querySelector('#newTaskData').elements;
        const name = newTaskData[0].value;
        const dueDate = newTaskData[2].value;
        const priority = () => {
            const radioHigh = document.querySelector('#radioTaskHigh')
            const radioMed = document.querySelector('#radioTaskMed')
            const radioLow = document.querySelector('#radioTaskLow')
            if (radioHigh.checked) return 3;
            else if (radioMed.checked) return 2;
            else if (radioLow.checked) return 1;
        }
        const notes = newTaskData[1].value;
        const _currentTask = new Task(currentProject.id, currentTask.id, `${name}`, `${notes}`, `${dueDate}`, +priority(), false);
        const overlay2 = document.querySelector('#overlay2');
        overlay2.style.display = 'none';
        currentProject.addTask(_currentTask);
        ProjectLibrary.getSharedInstance().saveProject(currentProject);
        DomOutput.loadTaskList(currentProject);
        document.querySelector('#newTaskData').reset();
    }

    static editTaskBtn(project, task) {
        const editTaskBtn = document.querySelector(`#edit-project${project.id}-task${task.id}`);
        const overlay = document.querySelector('#overlay2');

        if (listeners.get(task.id + 'editTaskBtn')) {
            editTaskBtn.removeEventListener('click', listeners.get(task.id + 'editTaskBtn'));
        };
        const unHideOverlay = function () {
            overlay.style.display = 'flex';
            DomInput.loadTask(project, task);
        };
        listeners.set(task.id + 'editTaskBtn', unHideOverlay);
        editTaskBtn.addEventListener('click', unHideOverlay);
    }

    //Retrieves data from 'new task' form, pushes to library, and reloads the page with the new task.
    static newTaskForm() {
        if (didInit) return
        const newTaskSubmit = document.querySelector('#newTaskSubmit')
        newTaskSubmit.addEventListener('click', DomInput.newTaskSubmit);
    };

    //Hides new task form.
    static exitNewTask() {
        const newTaskExit = document.querySelector('#newTaskExit')
        newTaskExit.addEventListener('click', () => {
            document.querySelector('#overlay2').style.display = 'none'
        })
    }

    //Adds a listener to each delete div on each task and reloads the page.
    static removeTask(project, task) {
        const qSelector = `#delete-project${project.id}-task${task.id}`
        console.log(qSelector)
        const taskDeleteBtn = document.querySelector(qSelector)
        taskDeleteBtn.addEventListener('click', () => {
            project.removeTask(task);
            DomOutput.loadTaskList(project);
        })
    }

    //Adds a listener to "task done" button in each task to mark as done and update the page.
    static markDone(project, task) {
        const taskDoneBtn = document.querySelector(`#done-project${project.id}-task${task.id}`)
        if (taskDoneBtn) {
            taskDoneBtn.addEventListener('click', () => {
                task.updateDone();
                DomOutput.loadProjectList();
                DomOutput.loadTaskList(project);
            })
        }
    }
};



























//     //Pulls project data into form for editing before storing data and reloading the display.
//     static editProjectForm(project) {
//     const library = ProjectLibrary.getSharedInstance();
//     const editProjectData = document.querySelector('#newProjectData').elements
//     const editProjectSubmit = document.querySelector('#newProjectSubmit')
//     editProjectSubmit.addEventListener('click', () => {
//         const name = editProjectData[0].value;
//         const dueDate = editProjectData[2].value;
//         const priority = editProjectData[3].value;
//         const notes = editProjectData[1].value;
//         const newProject = new Project(project.id, `${name}`, `${dueDate}`, +priority, `${notes}`);
//         ProjectLibrary.getSharedInstance().saveProject(newProject);
//         const overlay1 = document.querySelector('#overlay');
//         overlay1.style.display = 'none'
//         DomOutput.loadProjectList();
//         DomOutput.loadTaskList(newProject);
//         document.getElementById('newProjectData').reset();
//     });
// };

//     //Adds a listener  to the Edit Task button and loads current task data into form.
//     static editTaskBtn(project, task) {
//     const editTaskBtn = document.querySelector(`#edit-project${project.id}-task${task.id}`)
//     const overlay2 = document.querySelector('#overlay2');
//     editTaskBtn.addEventListener('click', () => {
//         overlay2.style.display = 'flex'
//         const editTaskData = document.querySelector('#newTaskData').elements
//         const name = editTaskData[0];
//         const dueDate = editTaskData[2];
//         const notes = editTaskData[1];

//         name.value = task.name
//         dueDate.value = format(new Date(task.dueDate), 'yyyy-MM-dd');
//         const radioHigh = document.querySelector('#radioTaskHigh')
//         const radioMed = document.querySelector('#radioTaskMed')
//         const radioLow = document.querySelector('#radioTaskLow')
//         if (task.priority == 3) {
//             radioHigh.checked = true
//             radioMed.checked = false
//             radioLow.checked = false
//         }
//         if (task.priority == 2) {
//             radioHigh.checked = false
//             radioMed.checked = true
//             radioLow.checked = false
//         }
//         if (task.priority == 1) {
//             radioHigh.checked = false
//             radioMed.checked = false
//             radioLow.checked = true
//         }
//         notes.value = task.notes

//         const editSubmitBtn = document.querySelector('#newTaskSubmit')
//         editSubmitBtn.removeEventListener('click', DomInput.newTaskSubmit)
//         editSubmitBtn.addEventListener('click', () => DomInput.editTaskSubmit(project, task));
//     })
// }

//     //Function for editTaskSubmitBtn event listener.
//     static editTaskSubmit(project, task) {
//     if (didInit) return
//     const newTaskData = document.querySelector('#newTaskData').elements;
//     const overlay2 = document.querySelector('#overlay2');
//     const name = newTaskData[0].value;
//     const dueDate = newTaskData[2].value;
//     const priority = newTaskData[3].value;
//     const notes = newTaskData[1].value;
//     const done = task.done
//     const newTask = new Task(task.id, `${name}`, `${notes}`, `${dueDate}`, +priority, done);
//     project.addTask(newTask);
//     overlay2.style.display = 'none'
//     DomOutput.loadProjectList();
//     DomOutput.loadTaskList(project);
//     document.getElementById('newTaskData').reset();
// }



