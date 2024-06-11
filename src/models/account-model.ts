export class Account {

    constructor(name: string, apiKey: string, apiSecret: string) {
        this.name = name;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    public name: string
    public apiKey: string
    public apiSecret: string
}