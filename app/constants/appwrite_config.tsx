"use client";

import { Client, Account, Models, ID, Databases, Storage } from "appwrite";
import { User } from "./interface";

class AppwriteConfig {
  databaseId: string = `${process.env.NEXT_PUBLIC_DATABASEID}`;
  activeCollId: string = `${process.env.NEXT_PUBLIC_EVENT_COLLID}`;
  bannerBucketId: string = `${process.env.NEXT_PUBLIC_EVENTBUCKET}`;

  
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
      this.getCurUser();
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
      this.getCurUser();
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
    this.getCurUser();
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
    Audience: string,
    File: File,
  ): Promise<String> {
    try {
     this.storage
        .createFile(this.bannerBucketId, ID.unique(), File)
        .then((res) => {
          this.databases
            .createDocument(this.databaseId, this.activeCollId, ID.unique(), {
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
              CreatedBy: JSON.parse(localStorage.getItem("userInfo") || "{}")
                .$id,
              BannerUrl: `https://cloud.appwrite.io/v1/storage/buckets/${this.bannerBucketId}/files/${res.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECTID}&mode=admin`,
            })
            .then((res) => {
              return Promise.resolve("sucess");
            });
        });
    } catch (error) {
      throw error;
    }
    return Promise.resolve('error');
  }
}

export default AppwriteConfig;
