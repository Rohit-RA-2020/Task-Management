"use client";

import { Client, Account, Models, ID, Databases, Storage } from "appwrite";
import { User } from "./interface";
import sdk, { Permission, Role } from "node-appwrite";

interface Sponsors {
  id: number;
  name: string;
  url: string;
}
class ServerConfig {
  client: sdk.Client = new sdk.Client();
  regDb: string = `${process.env.NEXT_PUBLIC_REGDB}`;
  sponDb: string = `${process.env.NEXT_PUBLIC_SPODB}`;
  databases: sdk.Databases = new sdk.Databases(this.client);

  constructor() {
    this.client
      .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`)
      .setKey(`${process.env.NEXT_PUBLIC_DBKEY}`);
  }

  createRegColl(id: string, name: string) {
    this.databases
      .createCollection(this.regDb, id, name, [
        Permission.read(Role.any()), // Anyone can view this document
        Permission.update(Role.any()), // Writers can update this document
        Permission.create(Role.any()), // Admins can update this document
        Permission.delete(Role.any()), // Admins can delete this document
      ])
      .then((res) => {
        this.databases.createStringAttribute(this.regDb, id, "name", 50, false);
        this.databases.createStringAttribute(this.regDb, id, "email", 50, false);
        this.databases.createStringAttribute(this.regDb, id, "confirm", 50, false, "");
        
      });
  }

  createSponColl(id: string, name: string, sponsor: Sponsors[], user:string) {
    this.databases
      .createCollection(this.sponDb, id, name, [
        Permission.read(Role.any()), // Anyone can view this document
        Permission.update(Role.user(user)), // Writers can update this document
        Permission.create(Role.user(user)), // Admins can update this document
        Permission.delete(Role.user(user)), // Admins can delete this document
      ])
      .then((res) => {
        this.databases
          .createStringAttribute(this.sponDb, id, "name", 50, false)
          .then((res) => {
            this.databases
              .createStringAttribute(this.sponDb, id, "url", 50, false)
              .then((res) => {
                for (var i = 0; i < sponsor.length; i++) {
                  this.databases.createDocument(this.sponDb, id, ID.unique(), {
                    name: sponsor[i].name,
                    url: sponsor[i].url,
                  });
                }
              });
          });
      });
  }
}

class AppwriteConfig {
  databaseId: string = `${process.env.NEXT_PUBLIC_DATABASEID}`;
  activeCollId: string = `${process.env.NEXT_PUBLIC_EVENT_COLLID}`;
  bannerBucketId: string = `${process.env.NEXT_PUBLIC_EVENTBUCKET}`;
  regDbId: string = `${process.env.NEXT_PUBLIC_REGDB}`;

  client: Client = new Client();
  account: Account = new Account(this.client);
  databases: Databases = new Databases(this.client);
  regDb: Databases = new Databases(this.client);
  storage: Storage = new Storage(this.client);
  user: User = {} as User;

  constructor() {
    this.client
      .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
      .setProject(`${process.env.NEXT_PUBLIC_PROJECTID}`);
  }

  googlelog(): void {
    try {
      const promise = this.account.createOAuth2Session(
        "google",
        `${process.env.NEXT_PUBLIC_APPURL}/login/sucess`,
        `${process.env.NEXT_PUBLIC_APPURL}/login/failure`,
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
        `${process.env.NEXT_PUBLIC_APPURL}/login/sucess`,
        `${process.env.NEXT_PUBLIC_APPURL}/login/failure`,
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
      `${process.env.NEXT_PUBLIC_APPURL}/login/sucess`
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
    sponsor: Sponsors[],
    approval: string,
    twitter: string,
    website: string,
    linkedin: string,
    instagram: string
  ): Promise<String> {
    try {
      this.storage
        .createFile(this.bannerBucketId, ID.unique(), banner)
        .then((res) => {
          this.databases
            .createDocument(this.databaseId, this.activeCollId, ID.unique(), {
              eventname: eventname,
              description: description,
              url: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${this.bannerBucketId}/files/${res.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECTID}&mode=admin`,
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
              approval: approval,
              created: JSON.parse(localStorage.getItem("userInfo") || "{}").$id,
              twitter: twitter,
              website: website,
              linkedin: linkedin,
              instagram: instagram,
              registrations: [],
            })
            .then((res) => {
              const serverConfig = new ServerConfig();
              serverConfig.createRegColl(res.$id, eventname);
              serverConfig.createSponColl(res.$id, eventname, sponsor, JSON.parse(localStorage.getItem("userInfo") || "{}").$id);
              return Promise.resolve("sucess");
            });
        });
    } catch (error) {
      console.log("error block 1");
      throw error;
    }
    return Promise.resolve("sucess");
  }
}

export {AppwriteConfig, ServerConfig};
