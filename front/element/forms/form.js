import Element from "../element"

export default class Form extends Element {
    static selector = ""
    
    build(){

    }
    bind(){
        this.element.addEventListener('submit', async (e)=>{
            e.preventDefault()
            await this.send()
        })
    }

    async send(){
        let url = this.element.action
        let method = this.element.method
        let body = JSON.stringify(
            Object.fromEntries(
                [...new FormData(this.element)]
            )
        )
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return fetch(url, {
            method,
            headers,
            body,
        })
        .then(res => res.json())
        .then(json => {
            this.handleFormResponse(json)
            return json
        })
    }

    handleFormResponse(json){

    }

    static bindAll(){
        [...document.querySelectorAll(`form${this.selector}`)].map(form => new this(form))
    }
}