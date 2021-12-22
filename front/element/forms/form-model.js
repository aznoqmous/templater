import Form from "./form";
import Utils from "../../utils";

export default class FormModel extends Form {

    static selector = "[data-model]"

    bind(){
        super.bind()
        this.element.addEventListener('keyup', ()=>{
            this.state.innerHTML = "Unsaved"
        })
    }
    
    build(){
        this.state = Utils.createElement(this.element)
    }

    async send(){
        this.state.innerHTML = "Saving..."
        return super.send()
    }
    handleFormResponse(json){
        this.state.innerHTML = "Saved"
    }
}
