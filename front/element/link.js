import App from "../app"
import Element from "./element"

export default class Link extends Element {
    static selector = "a"

    bind(){
        this.element.addEventListener('click', (e)=>{
            e.preventDefault()
            App.instance.setPageContent(this.element.href)
        })
    }
}