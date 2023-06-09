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
    eventname: string,
    description: string,
    banner: File,
    hostname: string,
    eventdate: string,
    email: string,
    country: string,
    address: string,
    city: string,
    state: string,
    postal: string,
    audience: string,
    type: string,
    attendees: number,
    price: number,
    tech: string,
    agenda: string,
    sponsor1: string,
    sponsor2: string,
    sponsor3: string,
    approval: string,
    food: string
  ): Promise<String> {
    try {
      this.storage
        .createFile(this.bannerBucketId, ID.unique(), banner)
        .then((res) => {
          this.databases
            .createDocument(this.databaseId, this.activeCollId, ID.unique(), {
              eventname: eventname,
              description: description,
              hostname: hostname,
              eventdate: eventdate,
              email: email,
              country: country,
              address: address,
              city: city,
              state: state,
              postal: postal,
              audience: audience,
              type: type,
              attendees: attendees,
              price: price,
              tech: tech,
              agenda: agenda,
              sponsor1: sponsor1,
              sponsor2: sponsor2,
              sponsor3: sponsor3,
              approval: approval,
              food: food,
              url: `https://cloud.appwrite.io/v1/storage/buckets/${this.bannerBucketId}/files/${res.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECTID}&mode=admin`,
            })
            .then((res) => {
              return Promise.resolve("sucess");
            });
        });
    } catch (error) {
      throw error;
    }
    return Promise.resolve("error");
  }
}

export default AppwriteConfig;
