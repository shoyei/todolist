import { Project } from './projects.js';
import { Task } from './tasks.js';
import { ProjectLibrary } from './library.js';
import { format } from 'date-fns'
import { DomOutput } from './DOMoutput'
import { Randomizer } from './randomizer.js'

//adds 3 default projects, each with two tasks to the library.
export default function () {
    const library = ProjectLibrary.getSharedInstance();
    library.deleteAll();

    const defaultProject = new Project(Randomizer.generateId(), 'Take Over My House', new Date(2021, 3, 1), 3, 'Need to regain some dignity up in here.', [])

    const defaultTask1 = new Task(defaultProject.id, Randomizer.generateId(), 'Clean the floor', 'Getting dog hair off the floor will make everyone happy', new Date(2021, 3, 1), 2, false)
    defaultProject.addTask(defaultTask1);

    const defaultTask2 = new Task(defaultProject.id, Randomizer.generateId(), 'Do the dishes', "Hopefully they'll get inspired and do the same", new Date(2021, 5, 13), 1, false)
    defaultProject.addTask(defaultTask2);

    const defaultTask3 = new Task(defaultProject.id, Randomizer.generateId(), 'Get in shape', "Hopefully they'll get inspired and do the same", new Date(2021, 10, 15), 3, true)
    defaultProject.addTask(defaultTask3);

    const defaultTask4 = new Task(defaultProject.id, Randomizer.generateId(), 'Get help', "Hopefully they'll get inspired and do the same", new Date(2022, 1, 1), 3, false)
    defaultProject.addTask(defaultTask4);
    
    ProjectLibrary.getSharedInstance().addToLibrary(defaultProject);
    DomOutput.loadProjectList();
}


