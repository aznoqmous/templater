import Utils from "../../utils"

export default class Control {
    
    static type = "input"
    static controls = {}

    constructor(container){
        this.container = container
        this.build()
        this.bind()
    }

    build(){
        this.tagName = this.container.getAttribute("data-control")
        this.element = Utils.createElement(null, {}, this.tagName)
        if(this.tagName != "hidden"){
            this.container.className = 'form-group'
            this.element.className = "form-control"
        }
        
        this.type = this.container.getAttribute("data-type")
        this.placeholder = this.container.getAttribute("data-placeholder")
        if(this.type) this.element.type = this.type
        if(this.placeholder) this.element.placeholder = this.placeholder
        
        this.name = this.container.getAttribute("data-name")
        this.value = Utils.htmlDecode(this.container.innerHTML).trim()
        this.container.innerHTML = ""
        this.container.appendChild(this.element)
    }
    bind(){
        this.element.addEventListener('keyup', ()=>{  this.update() })
        this.element.addEventListener('change', ()=>{  this.update() })
    }
    update(){}

    set value(value){
        this.element.value = value;
    }
    get value(){
        return this.element.value
    }
    set name(value){
        this.element.name = value;
    }
    get name(){
        return this.element.name
    }

    static bindAll(){
        let containers = [...document.querySelectorAll(`[data-control="${this.type}"]`)]
        containers.map(container => {
            Control.addControl(new this(container))
        })
    }
    static addControl(control){
        if(control.name && control.name != "null") this.controls[control.name] = control
    }
}