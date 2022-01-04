export default class Element {
    static selector = "*"

    constructor(element){
        this.element = element
        this.build()
        this.bind()
    }

    build(){}

    bind(){}
    clear(){
        this.element.innerHTML = ""
    }

    static bindAll(){
        [...document.querySelectorAll(this.selector)]
        .map(element => new this(element))
    }
}