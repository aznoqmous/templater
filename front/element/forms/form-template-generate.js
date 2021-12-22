
import Control from "../controls/control";
import Form from "./form";
import Utils from "../../utils";

export default class FormTemplateGenerate extends Form {

    static selector = "#generate"

    build(){
        super.build()

        this.variableInputs = []

        this.variablesContainer = document.getElementById("variables")
        this.templateControl = Control.controls.template
        this.outputControl = Control.controls.output
        this.outputControl.element.disabled = true

        let content = this.templateControl.value
        let variables = Object.fromEntries(
            content.match(/\{\w*?\}/g)
            .map(variable => [variable.replace(/[\{\}]/g, ""), variable])
        )
        Object.keys(variables)
        .map(variable => {
            this.variableInputs.push(
                this.createInput(this.variablesContainer, variable)
            )
        })
    }

    createInput(parent, variable){
        let container = Utils.createElement(parent, {
            className: "form-group"
        })
        let label = Utils.createElement(container, {
            innerHTML: variable
        }, 'label')
        let element = Utils.createElement(container, {
            className: "form-control",
            name: variable
        }, 'input')
        return element
    }
    bind(){
        this.element.addEventListener('submit', (e)=>{
            e.preventDefault()
            navigator.clipboard.writeText(this.outputControl.value)
        })
        this.variableInputs.map(variableInput => {
            variableInput.addEventListener('keyup', () => {
                this.updateOutput()
            })
        })
    }
    updateOutput(){
        let outputHTML = this.templateControl.value
        this.variableInputs.map(variableInput => {
            outputHTML = outputHTML.replace(new RegExp(`{${variableInput.name}}`, "g"), variableInput.value || `{${variableInput.name}}`)
        })

        this.outputControl.value = outputHTML
        this.outputControl.element.dispatchEvent(new Event("change"))
    }
}