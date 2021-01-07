import { DomOutput}  from './DOMoutput.js'

export let domInput = {

    applyTaskListBtn(project) {
        let projectButton = document.querySelector(`#project${project.id}`)
        projectButton.addEventListener('click', function(){
        DomOutput.loadTaskList(project)
        })
    }


}