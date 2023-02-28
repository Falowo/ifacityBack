import mongoose from "mongoose";

import {
  modelOptions,
  Ref,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  public _id?: mongoose.Schema.Types.ObjectId;
  public createdAt?: Date;
  public updatedAt?: Date;

  public name?: String;
  public given_name?: String;
  public family_name?: String;
  public middle_name?: String;
  public nickname?: String;
  public preferred_username?: String;
  public profile?: String;
  public picture?: String;
  public website?: String;
  public email?: String;
  public email_verified?: boolean;
  public gender?: String;
  public birthdate?: String;
  public zoneinfo?: String;
  public locale?: String;
  public phone_number?: String;
  public phone_number_verified?: boolean;
  public address?: String;
  updated_at?: string;


  @prop({
    require: true,
    unique: true,
  })
  public sub: String;

  
  @prop({
    ref: () => User,
  })
  public friendsIds?: Ref<User>[];
  
  @prop({
    ref: () => User,
  })
  public followersIds?: Ref<User>[];

  @prop({
    ref: () => User,
  })
  public notCheckedNewFollowersIds?: Ref<User>[];

  @prop({
    ref: () => User,
  })
  public blockedIds?: Ref<User>[];

  @prop({
    default: false,
  })
  public isAdmin: boolean;

  @prop({
    default: false,
  })
  public isBabalawo: boolean;

  

  @prop({
    maxlength: 256,
  })
  public desc?: String;

  @prop({
    enum: ["FREE", "ECO",  "PREMIUM"],
  })
  public status?: String;

  

}
