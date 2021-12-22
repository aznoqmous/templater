import Control from "./element/controls/control";
import ControlHidden from "./element/controls/control-hidden";
import ControlTextarea from "./element/controls/control-textarea";
import FormLogin from "./element/forms/form-login";
import FormModel from "./element/forms/form-model";
import FormTemplateGenerate from "./element/forms/form-template-generate";
import Link from "./element/link";
import LogoutButton from "./element/logout-btn";
import Security from "./security";

export default class App {

    static indexPage = "/templates";
    static loginPage = "/login";

    static instance;

    constructor(){
        this.constructor.instance = this
        this.init()
    }

    async init(){
        await App.documentLoaded()
        this.content = document.querySelector('#content')
        this.bind()

        Security.testToken()
        .then(()=>{
            console.log("connected")
            this.setPageContent(App.indexPage)
        })
        .catch(()=>{
            console.log("not connected")
            this.setPageContent(App.loginPage)
        })
    }
    
    bind(){
        Link.bindAll()
        FormLogin.bindAll()
        FormModel.bindAll()
        Control.bindAll()
        ControlHidden.bindAll()
        ControlTextarea.bindAll()
        LogoutButton.bindAll()

        FormTemplateGenerate.bindAll()
    }

    static async documentLoaded(){
        return new Promise(res => {
            if(document.body) return res()
            document.addEventListener('DOMContentLoaded', ()=>{
                res()
            })
        })
    }

    static reload(){
        window.location.reload()
    }

    setContent(html){
        this.content.innerHTML = html
        this.bind()
    }
    async setPageContent(url){
        let headers = Security.getTokenHeader() || {}
        return fetch(url, {
            headers
        })
        .then(res => res.text())
        .then(text => {
            this.setContent(text)
        })
    }
    
}