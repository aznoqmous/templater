import Control from "./control";
import Utils from "../../utils";

export default class ControlTextarea extends Control {
    static type = "textarea";

    build(){
        super.build()
        this.element.value = this.element.value
        this.preview = Utils.createElement(this.container, {
            innerHTML: this.value
        })
    }
    update(){
        this.preview.innerHTML = this.value
        this.element.value = this.element.value
    }
}