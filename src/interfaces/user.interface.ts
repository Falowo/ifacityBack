export interface IUser {
  token?: string;
  _id?: string;
  sub?: string;
  username: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  coverPicture?: string;
  followersId?: string[];
  followingsId?: string[];
  friendRequestsFrom?: string[];
  friendRequestsTo?: string[];
  friends?: string[];
  blocked?: string[];
  notCheckedFriendRequestsFrom?: string[];
  notCheckedAcceptedFriendRequestsBy?: string[];
  isAdmin?: boolean;
  desc?: string;
  city?: string;
  from?: string;
  relationship?: number;
  birthDate?: Date;
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
