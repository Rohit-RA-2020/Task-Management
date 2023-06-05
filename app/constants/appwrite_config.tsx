import { Client, Account, Models, ID, Databases, Storage } from "appwrite";
import { User } from "./interface";
import sdk, { Permission, Role } from 'node-appwrite';

class ServerConfig {
    client: sdk.Client = new sdk.Client();
    databases: sdk.Databases = new sdk.Databases(this.client);
    key: string = '0276e9f9e10adc0ab6fccd952e8c5f588a08f9b727333c3e31636af50f85aa89a8b5b06736e49437277bb432fb2f9b8c540f1456746c6ce4994fa82bc9c3f7dfc730a1ec65acedacee60ffc0686d3a848c1c9df262d54d574c2eaf351eee9e519cf53c97dc9d45fe6294c95e8feb657166f56e58139ce5a02383ac42ffeeb929';

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('647449f26e9ca9aadf03')
            .setKey(this.key);
    }

    createColl(collId: string, name: string): void {
        try {
            this.databases.createCollection('647d687b9eec0f57162b', ID.custom(collId), name, [
                Permission.read(Role.any()),                  // Anyone can view this document
                Permission.update(Role.any()),      // Writers can update this document
                Permission.create(Role.any()),       // Admins can update this document
                Permission.delete(Role.any()),        // Admins can delete this document
            ]);

        } catch (error) {
            console.log(error)
        } finally {
            this.databases.createStringAttribute('647d687b9eec0f57162b', collId, 'EventName', 256, false);
            this.databases.createStringAttribute('647d687b9eec0f57162b', collId, 'Date', 256, false);
            this.databases.createStringAttribute('647d687b9eec0f57162b', collId, 'Tech', 256, false);
            this.databases.createIntegerAttribute('647d687b9eec0f57162b', collId, 'Attendees', false);
            this.databases.createIntegerAttribute('647d687b9eec0f57162b', collId, 'Price', false);
            this.databases.createStringAttribute('647d687b9eec0f57162b', collId, 'Venue', 100, false);
            this.databases.createStringAttribute('647d687b9eec0f57162b', collId, 'Speakers', 256, false);
            this.databases.createStringAttribute('647d687b9eec0f57162b', collId, 'Sponsors', 100, false);
            this.databases.createBooleanAttribute('647d687b9eec0f57162b', collId, 'Approval', false, false);
            this.databases.createStringAttribute('647d687b9eec0f57162b', collId, 'Description', 256, false);
            this.databases.createStringAttribute('647d687b9eec0f57162b', collId, 'Audience', 256, false);
        }
    }
}

class AppwriteConfig {

    databaseId: string = '647d687b9eec0f57162b';
    bannerBucket: string = '6475cbee5b04ec30dd14';



    client: Client = new Client();
    account: Account = new Account(this.client);
    databases: Databases = new Databases(this.client);
    storage: Storage = new Storage(this.client);
    user: User = {} as User;

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('647449f26e9ca9aadf03');
    }

    googlelog(): void {
        try {
            this.account.createOAuth2Session('google', 'https://eventally.vercel.app/landing')
        } catch (error) {
            console.log(error)
        }
    }

    getCurUser(): void {
        try {
            this.account.get()
                .then((res) => {
                    this.user = res;
                    console.log(this.user)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error);
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

    createEvent(EventName: string, Date: string, Tech: string, Attendees: number, Price: number, Venue: string, Speakers: string, Sponsors: string, Approval: boolean, Description: string, Audience: string): void {

        console.log("Event function called", this.user.$id)

        try {
            this.account.get()
                .then((res) => {
                    this.user = res;
                    const serverConfig = new ServerConfig();
                    serverConfig.createColl(this.user.$id, this.user.name);
                    console.table(this.user)
                    try {
                        const promise = this.databases.createDocument(this.databaseId, this.user.$id, ID.unique(), {
                            "EventName": EventName,
                            "Date": Date,
                            "Tech": Tech,
                            "Attendees": Attendees,
                            "Price": Price,
                            "Venue": Venue,
                            "Speakers": Speakers,
                            "Sponsors": Sponsors,
                            "Approval": Approval,
                            "Description": Description,
                            "Audience": Audience
                        });
                    } catch (error) {
                        console.log(error)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error);
        }




    }
}

export default AppwriteConfig;
