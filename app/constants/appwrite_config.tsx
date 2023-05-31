import { Client, Account, Models, ID, Databases, Storage } from "appwrite";

class AppwriteConfig {

    databaseId: string = '6475c99c8c429bc311d4';
    collectionId: string = '6475c9ada5c8b1d9c416';
    bannerBucket: string = '6475cbee5b04ec30dd14';


    client: Client = new Client();
    account: Account = new Account(this.client);
    databases: Databases = new Databases(this.client);
    storage: Storage = new Storage(this.client);

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

    emailSignUp(name: string, email: string, password: string): void {
        try {
            this.account.create(ID.unique(), email, password, name)
        } catch (error) {
            console.log(error)
        }
    }

    emailLogin(email: string, password: string): Promise<Models.Session> {
        return this.account.createEmailSession(email, password);
    }

    magicUrlLogin(email: string): void {
        this.account.createMagicURLSession(ID.unique(), email, 'http://localhost:3000/landing')
    }

    createEvent(EventName: string, Date: Date, Description: string, Outcome: string, Tech: string, Audience: string, attendees: Number, Price: Number, Venue: string, Talks: string[], Sponsors: string[], approval: boolean): void {

        console.log("Event fucntion called")

        const promise = this.databases.createDocument(this.databaseId, this.collectionId, ID.unique(), {
            "EventName": EventName,
            "Date": Date,
            "Description": Description,
            "Outcome": Outcome,
            "Audience": Audience,
            "attendees": attendees,
            "Price": Price,
            "Venue": Venue,
            "Talks": Talks,
            "Sponsors": Sponsors,
            "approval": approval
        });


        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
    }
}

export default AppwriteConfig;
