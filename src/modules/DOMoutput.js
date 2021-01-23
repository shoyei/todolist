import { ProjectLibrary } from './library.js';
import { domSelectors } from './domSelectors.js';
import { DomInput } from './DOMinput.js';
import { format } from 'date-fns';
import { Task } from './tasks.js';

let didInit = false


export class DomOutput {

    //load project list to DOM
    static loadProjectList() {
        let tasksDone = 0
        domSelectors.projectList.innerHTML = '';
        if (!didInit) DomInput.newProjectBtn();
        const library = ProjectLibrary.getSharedInstance();
        library.projectList.forEach(function (project) {

            const projectListItem = document.createElement('div');
            projectListItem.classList = 'projectListItem';
            projectListItem.setAttribute('id', `project${project.id}`);
            domSelectors.projectList.appendChild(projectListItem);
            project.taskList.forEach(function(task) {
                if (task.done) tasksDone++
            })
            if (tasksDone == project.taskList.length) projectListItem.style.opacity = '50%';
            tasksDone = 0;

            const projectName = document.createElement('div');
            projectName.classList = 'projectListName';
            projectName.setAttribute('id', `projectName${project.id}`);
            projectName.textContent = `${project.name}`;
            projectListItem.appendChild(projectName);

            const projectDeleteBtn = document.createElement('div');
            projectDeleteBtn.classList = 'projectDeleteBtn';
            projectDeleteBtn.setAttribute('id', `deleteBtn${project.id}`)
            projectDeleteBtn.textContent = 'X';
            projectListItem.appendChild(projectDeleteBtn);
            DomInput.removeProject(project);

            const projectDueDate = document.createElement('div');
            projectDueDate.classList = 'projectListDueDate';
            projectDueDate.textContent = `Due ${format(new Date(project.dueDate), 'MMM do, yyyy')}`;
            projectListItem.appendChild(projectDueDate);

            const projectPriority = document.createElement('div');
            projectPriority.classList = 'projectListPriority';
            if (project.priority == 3) projectPriority.style.backgroundColor = 'red';
            else if (project.priority == 2) projectPriority.style.backgroundColor = 'yellow';
            else if (project.priority == 1) projectPriority.style.backgroundColor = 'green';
            projectListItem.appendChild(projectPriority);

            DomInput.applyTaskListBtn(project);
        })
        didInit = true
    };
    //load task list to DOM
    static loadTaskList(project) {
        console.log('load task list')
        domSelectors.taskListDom.innerHTML = '';
        domSelectors.projectTitle.innerHTML = '';
        document.querySelector('.projectSubSub').innerHTML = '';
        document.querySelector('#newTaskDiv').innerHTML = '';
        if (project == undefined) {
            return domSelectors.projectTitle.textContent = 'Open a project to view your tasks!'
        };
        domSelectors.projectTitle.textContent = `${project.name}`;

        const newTaskBtn = document.createElement('div');
        newTaskBtn.classList = 'newTaskBtn';
        newTaskBtn.setAttribute('id', `${project.id}`)
        newTaskBtn.textContent = 'New Task +';
        document.querySelector('#newTaskDiv').appendChild(newTaskBtn);

        const projectSubSubtitle = document.querySelector('.projectSubSub');

        const projectDescription = document.createElement('div');
        projectDescription.classList = 'projectDescription';
        projectDescription.textContent = `${project.notes}`;
        projectSubSubtitle.appendChild(projectDescription);

        const editProjectBtn = document.createElement('div');
        editProjectBtn.classList = 'editProjectBtn';
        editProjectBtn.textContent = 'Edit Project';
        projectSubSubtitle.appendChild(editProjectBtn);

        console.log(project.tasks)
        project.taskList.forEach(function (task) {
            const taskListItem = document.createElement('div');
            taskListItem.classList = 'taskListItem';
            taskListItem.setAttribute('id', `project${project.id}-task${task.id}`);
            domSelectors.taskListDom.appendChild(taskListItem);

            const doneBtn = document.createElement('div');
            doneBtn.classList = 'taskDoneBtn';
            doneBtn.setAttribute('id', `done-project${project.id}-task${task.id}`)
            taskListItem.appendChild(doneBtn);
            DomInput.markDone(project, task);

            const taskListName = document.createElement('div');
            taskListName.classList = 'taskListName';
            taskListName.textContent = `${task.name}`;
            taskListItem.appendChild(taskListName);

            const taskDeleteBtn = document.createElement('div');
            taskDeleteBtn.classList = 'taskDeleteBtn';
            taskDeleteBtn.setAttribute('id', `delete-project${project.id}-task${task.id}`)
            taskDeleteBtn.textContent = 'X';
            taskListItem.appendChild(taskDeleteBtn);
            DomInput.removeTask(project, task);

            // const taskListNotes = document.createElement('div');
            // taskListNotes.classList = 'taskListNotes';
            // taskListNotes.textContent = `${task.notes}`;
            // taskListItem.appendChild(taskListNotes);

            const taskListDue = document.createElement('div');
            taskListDue.classList = 'taskListDue';
            taskListDue.textContent = `Due ${format(new Date(task.dueDate), 'MMM do, yyyy')}`;
            taskListItem.appendChild(taskListDue);

            const taskPriority = document.createElement('div');
            taskPriority.classList = 'taskPriority';
            taskPriority.setAttribute('id', `project${project.id}-task${task.id}-doneBtn`)
            if (task.priority == 3) taskPriority.style.backgroundColor = 'red';
            else if (task.priority == 2) taskPriority.style.backgroundColor = 'yellow';
            else if (task.priority == 1) taskPriority.style.backgroundColor = 'green';
            taskListItem.appendChild(taskPriority);

            const editTaskBtn = document.createElement('div');
            editTaskBtn.classList = 'editTaskBtn';
            editTaskBtn.setAttribute('id', `edit-project${project.id}-task${task.id}`)
            editTaskBtn.textContent = 'Edit Task';
            taskListItem.appendChild(editTaskBtn);
            DomInput.editTaskBtn(project, task);

            if (task.done == true) {
                doneBtn.textContent = 'X'
                taskListItem.setAttribute('style', 'opacity: 60%')
                taskListName.style.textDecoration = 'line-through'
            }
            else if (task.done == false) {
                doneBtn.textContent = ''
                taskListItem.setAttribute('style', 'background-color: none')
            }

        });
        DomInput.editProjectBtn(project);
        DomInput.newTaskBtn(project, new Task(project.id))
        DomInput.newTaskForm();
    }

    static removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
};