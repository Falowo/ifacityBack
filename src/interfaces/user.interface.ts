export interface IUser {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: String;
  given_name?: String;
  family_name?: String;
  middle_name?: String;
  nickname?: String;
  preferred_username?: String;
  profile?: String;
  picture?: String;
  website?: String;
  email?: String;
  email_verified?: boolean;
  gender?: String;
  birthdate?: String;
  zoneinfo?: String;
  locale?: String;
  phone_number?: String;
  phone_number_verified?: boolean;
  address?: String;
  updated_at?: string;
  sub: String;
  friendsIds?: string[];
  followersIds?: string[];
  notCheckedNewFollowersIds?: string[];
  blockedIds?: string[];
  isAdmin: boolean;
  isBabalawo: boolean;
  desc?: String;
  status?: "FREE" | "ECO" | "PREMIUM";
  [key: string]: any;
}


export interface User {
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: string;
  updated_at?: string;
  sub?: string;
  [key: string]: any;
}
