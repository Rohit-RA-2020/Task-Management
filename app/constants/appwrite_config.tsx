import { Client, Account } from "appwrite";

class AppwriteConfig {
    //field 
    client: Client = new Client();
    account: Account = new Account(this.client);

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('647449f26e9ca9aadf03');
    }

    googlelog(): void {
        this.account.createOAuth2Session('google', 'http://localhost:3000/login')
    }
}

export default AppwriteConfig;
