import Utils from "../utils";
import Element from "./element";

export default class Variables extends Element {
    static selector = "#variables"

    build(){
        if(!document.querySelector('[data-model]')) return;
        this.textarea = document.querySelector('textarea')
        this.displayVariables()
    }
    bind(){
        if(!document.querySelector('[data-model]')) return;
        this.textarea.addEventListener('keyup', ()=>{
            this.displayVariables()
        })
    }
    displayVariables(){
        let matches = this.textarea.value.match(/\{\w*?\}/g)
        this.clear()
        if(!matches) return;
        let variables = Object.keys(Object.fromEntries(matches.map(a => [a, a])))
        variables.map(variable => {
            let label = variable.replace(/[\{\}]/g, '')
            Utils.createElement(this.element, {
                innerHTML: label
            }, 'li')
        })
    }
}