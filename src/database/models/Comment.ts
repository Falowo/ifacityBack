import {
    modelOptions,
    mongoose,
    prop,
    Ref,
  } from "@typegoose/typegoose";
  import { User } from "./User";
  import { Post } from "./Post";
  
  @modelOptions({
    schemaOptions: {
      timestamps: true,
    },
  })
  export class Comment {
    public _id?: mongoose.Schema.Types.ObjectId;
  
    // public createdAt?: Date;
  
    @prop({
      ref: () => User,
      required: true,
    })
    public userId: Ref<User>;

    @prop({
      ref: () => Post,
      required: true,
    })
    public postId: Ref<Post>;

  
    @prop({
      maxlength: 512,
    })
    public content?: string;
  
    @prop({
      maxlength: 256,
    })
    public imageFileName?: string;
  
    
    @prop({
      maxlength: 256,
    })
    public audioFileName?: string;
  
    @prop({
      ref: () => User,
    })
    public likingUserIds?: Ref<User>[];

  }
  