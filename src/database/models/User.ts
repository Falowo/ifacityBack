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

  @prop()
  public name?: String;

  @prop()
  public given_name?: String;

  @prop()
  public family_name?: String;

  @prop()
  public middle_name?: String;

  @prop()
  public nickname?: String;

  @prop()
  public preferred_username?: String;
  @prop()
  public profile?: String;
  @prop()
  public picture?: String;
  @prop()
  public website?: String;
  @prop()
  public email?: String;
  @prop()
  public email_verified?: boolean;
  @prop()
  public gender?: String;
  @prop()
  public birthdate?: String;
  @prop()
  public zoneinfo?: String;
  @prop()
  public locale?: String;
  @prop()
  public phone_number?: String;
  @prop()
  public phone_number_verified?: boolean;
  @prop()
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
    enum: ["FREE", "ECO", "PREMIUM"],
  })
  public status?: String;
}
