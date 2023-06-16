export interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  password?: string | undefined;
  hash?: string | undefined;
  hashOptions?: object | undefined;
  registration: string;
  status: boolean;
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  prefs: Prefs;
}

export interface HashOptions {
  type: string;
  memoryCost: number;
  timeCost: number;
  threads: number;
}

export interface Prefs {}
