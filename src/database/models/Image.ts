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
  export class Image {
    public _id?: mongoose.Schema.Types.ObjectId;
  
    @prop({
      ref: () => Post,
      required: true,
    })
    public postId: Ref<Post>;
  
    @prop({
      ref: () => User,
      required: true,
    })
    public senderId: Ref<User>;
  
    @prop({
      required: true,
    })
    public text: string;
    // abort or error
    // 10: pending
    // 20: sent
    // 30: received by all users
    // 40: checked by all users
    // 50: abort
  
    @prop({
      enum: [0, 10, 20, 30, 40],
      default: 1,
    })
    public status: Number;
  
    @prop({
      ref: () => User,
    })
    public receivedByIds: Ref<User>[];
  
    @prop({
      ref: () => User,
    })
    public checkedByIds: Ref<User>[];
    // @prop({
    //   required: function () {
    //     return !this.text;
    //   },
    // })
    // public img?: string;
  }
  