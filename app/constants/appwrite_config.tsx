import { Client, Account, Models, ID, Databases, Storage } from "appwrite";
import { User } from "./interface";

class AppwriteConfig {
  databaseId: string = `${process.env.NEXT_PUBLIC_DATABASEID}`;
  activeCollId: string = `${process.env.NEXT_PUBLIC_EVENT_COLLID}`;

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
      const promise = this.account.createOAuth2Session(
        "google",
        `${process.env.NEXT_PUBLIC_APPURL}/landing`,
        "",
        []
      );
    } catch (error) {
      console.log(error);
    }
    this.getCurUser();
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
          localStorage.setItem("userInfo", JSON.stringify(this.user));
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

  signOut(id: string): boolean {
    try {
      this.account.deleteSession(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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
    console.log("Event function called");

    try {
      const promise = this.databases.createDocument(
        this.databaseId,
        this.activeCollId,
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
      ).then((res) => {
        console.table(res);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AppwriteConfig;
