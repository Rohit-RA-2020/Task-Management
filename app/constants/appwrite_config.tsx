import { Client, Account, Models, ID } from "appwrite";

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
        try {
            this.account.createOAuth2Session('google', 'http://localhost:3000/landing')
        } catch (error) {
            console.log(error)
        }
    }

    emailSignUp(name: string, email: string, password: string):void {
        try {
            this.account.create(ID.unique(), email, password, name)
        } catch(error) {
            console.log(error)
        }
    }

    emailLogin(email: string, password: string): Promise<Models.Session> {
        return this.account.createEmailSession(email, password);
    }

    magicUrlLogin(email: string): void {
        this.account.createMagicURLSession(ID.unique(), email, 'http://localhost:3000/landing')
    }
}

export default AppwriteConfig;
