import Security from "../security"
import Element from "./element"
import App from "../app"

export default class LogoutButton extends Element {
    static selector = "#logout"

    bind(){
        this.element.addEventListener('click', ()=>{
            Security.removeToken()
            App.reload()
        })
    }
}