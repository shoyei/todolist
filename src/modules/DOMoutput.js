import { projectLibrary } from './library.js';
import { domSelectors } from './domSelectors.js';
import { domInput } from './DOMinput.js';

export class DomOutput {

    //load project list to DOM
    static loadProjectList() {
        domSelectors.projectList.innerHTML = '';

        projectLibrary.forEach(function (thisArg) {

            const projectListItem = document.createElement('div');
            projectListItem.classList = 'projectListItem';
            projectListItem.setAttribute('id', `project${thisArg.id}`);
            domSelectors.projectList.appendChild(projectListItem);

            const projectName = document.createElement('div');
            projectName.classList = 'projectListName';
            projectName.textContent = `${thisArg.name}`;
            projectListItem.appendChild(projectName);

            const projectDueDate = document.createElement('div');
            projectDueDate.classList = 'projectListDueDate';
            projectDueDate.textContent = `${thisArg.dueDate}`;
            projectListItem.appendChild(projectDueDate);

            const projectPriority = document.createElement('div');
            projectPriority.classList = 'projectListPriority';
            projectPriority.style.backgroundColor = 'red';
            projectListItem.appendChild(projectPriority);

            domInput.applyTaskListBtn(thisArg)
        })
    };

    static loadTaskList(project) {
        domSelectors.taskListDom.innerHTML = '';
        domSelectors.projectTitle.innerHTML = '';
        domSelectors.projectTitle.textContent = `${project.name}`;
        domSelectors.taskTitleDiv.innerHtml = '';

        const newTaskBtn = document.createElement('div');
        newTaskBtn.classList = 'newTaskBtn';
        newTaskBtn.textContent = 'New Task +';
        domSelectors.taskTitleDiv.appendChild(newTaskBtn);

        const projectDescription = document.createElement('div');
        projectDescription.classList = 'projectDescription';
        projectDescription.textContent = `${project.notes}`;
        domSelectors.taskTitleDiv.appendChild(projectDescription);

        project.taskList.forEach(function (thisArg) {
            const taskListItem = document.createElement('div');
            taskListItem.classList = 'taskListItem';
            taskListItem.setAttribute('id', `project${project.id}-task${thisArg.id}`);
            domSelectors.taskListDom.appendChild(taskListItem);

            const doneBtn = document.createElement('div');
            doneBtn.classList = 'taskDoneBtn';
            doneBtn.setAttribute('id', `project${project.id}-task${thisArg.id}-doneBtn`)
            taskListItem.appendChild(doneBtn);

            const taskListName = document.createElement('div');
            taskListName.classList = 'taskListName';
            taskListName.textContent = `${thisArg.name}`;
            taskListItem.appendChild(taskListName);

            const taskListDue = document.createElement('div');
            taskListDue.classList = 'taskListDue';
            taskListDue.textContent = `${thisArg.dueDate}`;
            taskListItem.appendChild(taskListDue);

            const taskListNotes = document.createElement('div');
            taskListNotes.classList = 'taskListName';
            taskListNotes.textContent = `${thisArg.notes}`;
            taskListItem.appendChild(taskListNotes);

            const taskPriority = document.createElement('div');
            taskPriority.classList = 'taskPriority';
            taskPriority.setAttribute('id', `project${project.id}-task${thisArg.id}-doneBtn`)
            taskListItem.appendChild(taskPriority);

        })
    }
};