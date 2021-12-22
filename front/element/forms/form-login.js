import App from "../../app";
import Security from "../../security";
import Form from "./form";

export default class FormLogin extends Form {
    static selector = "#login"

    build(){
        console.log(this)
    }
    handleFormResponse(data){
        if(data.access_token) Security.setToken(data.access_token)
        App.instance.setPageContent(App.indexPage)
    }
}