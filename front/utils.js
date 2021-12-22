export default class Utils {
    static createElement(parent=null, attributes={}, tagName="div"){
        let element = document.createElement(tagName)
        for(let key in attributes) element[key] = attributes[key]
        if(parent) parent.appendChild(element)
        return element
    }
    static htmlDecode(input){
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }
}