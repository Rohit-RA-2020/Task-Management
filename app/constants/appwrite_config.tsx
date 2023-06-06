import { Client, Account, Models, ID, Databases, Storage } from "appwrite";
import { User } from "./interface";
import sdk, { Permission, Role } from "node-appwrite";

class ServerConfig {
  client: sdk.Client = new sdk.Client();
  databases: sdk.Databases = new sdk.Databases(this.client);
  key: string = `${process.env.NEXT_PUBLIC_APIKEY}`;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`)
      .setKey(this.key);
  }

  createColl(collId: string, name: string): void {
    try {
      this.databases.createCollection(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        ID.custom(collId),
        name,
        [
          Permission.read(Role.any()), // Anyone can view this document
          Permission.update(Role.any()), // Writers can update this document
          Permission.create(Role.any()), // Admins can update this document
          Permission.delete(Role.any()), // Admins can delete this document
        ]
      );
    } catch (error) {
      console.log(error);
    } finally {
      this.databases.createStringAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "EventName",
        256,
        false
      );
      this.databases.createStringAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Date",
        256,
        false
      );
      this.databases.createStringAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Tech",
        256,
        false
      );
      this.databases.createIntegerAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Attendees",
        false
      );
      this.databases.createIntegerAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Price",
        false
      );
      this.databases.createStringAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Venue",
        100,
        false
      );
      this.databases.createStringAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Speakers",
        256,
        false
      );
      this.databases.createStringAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Sponsors",
        100,
        false
      );
      this.databases.createBooleanAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Approval",
        false,
        false
      );
      this.databases.createStringAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Description",
        256,
        false
      );
      this.databases.createStringAttribute(
        `${process.env.NEXT_PUBLIC_PROJECTID}`,
        collId,
        "Audience",
        256,
        false
      );
    }
  }
}

class AppwriteConfig {
  databaseId: string = `${process.env.NEXT_PUBLIC_PROJECTID}`;
  bannerBucket: string = `${process.env.NEXT_PUBLIC_PROJECTID}`;

  client: Client = new Client();
  account: Account = new Account(this.client);
  databases: Databases = new Databases(this.client);
  storage: Storage = new Storage(this.client);
  user: User = {} as User;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`);
  }

  googlelog(): void {
    try {
      this.account.createOAuth2Session(
        "google",
        `${process.env.NEXT_PUBLIC_APPURL}/landing`,
        "",
        []
      );
    } catch (error) {
      console.log(error);
    }
  }

  githublog(): void {
    try {
      this.account.createOAuth2Session(
        "github",
        `${process.env.NEXT_PUBLIC_APPURL}/landing`,
        "",
        []
      );
    } catch (error) {
      console.log(error);
    }
  }

  getCurUser(): void {
    try {
      this.account
        .get()
        .then((res) => {
          this.user = res;
          console.log(this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  emailSignUp(name: string, email: string, password: string): void {
    try {
      this.account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.log(error);
    }
  }

  emailLogin(email: string, password: string): Promise<Models.Session> {
    return this.account.createEmailSession(email, password);
  }

  magicUrlLogin(email: string): void {
    this.account.createMagicURLSession(
      ID.unique(),
      email,
      `${process.env.NEXT_PUBLIC_APPURL}/landing`
    );
  }

  createEvent(
    EventName: string,
    Date: string,
    Tech: string,
    Attendees: number,
    Price: number,
    Venue: string,
    Speakers: string,
    Sponsors: string,
    Approval: boolean,
    Description: string,
    Audience: string
  ): void {
    console.log("Event function called", this.user.$id);

    try {
      this.account
        .get()
        .then((res) => {
          this.user = res;
          const serverConfig = new ServerConfig();
          serverConfig.createColl(this.user.$id, this.user.name);
          console.table(this.user);
          try {
            const promise = this.databases.createDocument(
              this.databaseId,
              this.user.$id,
              ID.unique(),
              {
                EventName: EventName,
                Date: Date,
                Tech: Tech,
                Attendees: Attendees,
                Price: Price,
                Venue: Venue,
                Speakers: Speakers,
                Sponsors: Sponsors,
                Approval: Approval,
                Description: Description,
                Audience: Audience,
              }
            );
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AppwriteConfig;
