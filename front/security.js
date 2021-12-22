
export default class Security {
    
    static storageKey = "gdcv254sdc1n4xz3a"

    static async testToken(){
        let token = this.getToken()
        console.log(token)
        return new Promise((res, rej)=>{
            if(!token) return rej()
            fetch("/profile", {
                headers: this.getTokenHeader()
            })
            .then(response => {
                if(![200, 201].includes(response.status)) return rej()
                return res()
            })
        })
    }

    static getTokenHeader(){
        let token = this.getToken()
        if(!token) return null
        return { Authorization: `Bearer ${token}` }
    }

    static getToken(){
        return localStorage.getItem(this.storageKey)
    }
    static setToken(value){
        localStorage.setItem(this.storageKey, value)
    }

    static removeToken(){
        localStorage.removeItem(this.storageKey)
    }
}