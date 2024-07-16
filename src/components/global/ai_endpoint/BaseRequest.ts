import fetch from "node-fetch"
class BaseRequest {
    private url: string;
    private priv:boolean;
    constructor(baseURL: string) {
        this.url = baseURL
        this.priv = false
    }
    
    assignParameter(key:string, value:string | number) 
    {
        if (!this.priv) {
            this.url += `?${key}=${value}`
            this.priv = true
        } else {
            this.url += `&${key}=${value}`
        }
    }

    get getURL() {
        return this.url
    }

    
    async throwRequest<T>(): Promise<T> {

        const request = await fetch(this.url, {
            headers: {
                "User-Agent": "Wordsworth/1.0 arcade.acme.org@gmail.com"
            }
        })
        if (!request.ok) throw "Request Failed, invalid response from API."
        const json_response: any =  (await request.json())
        return json_response
    }
}

export default BaseRequest