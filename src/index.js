import {DomOutput} from './modules/DOMoutput.js';
import {DomInput} from './modules/DOMinput.js';

import defaultLibrary from './modules/defaultLibrary.js';

defaultLibrary();
DomInput.newProjectForm();
DomInput.exitNewProject();
DomInput.exitNewTask();

// Current Bugs: 
// priority colors show up incorrectly,
// When saving "new" project or task after editing a respective project or task, the new project/task is saving with the current ID of the previously edited project/task.

