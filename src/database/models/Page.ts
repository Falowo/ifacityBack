import {
  modelOptions,
  mongoose,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Post } from "./Post";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Page {
  public _id?: mongoose.Schema.Types.ObjectId;
  public createdAt?: Date;
  public updatedAt?: Date;
  @prop()
  title?: string;
  @prop({ ref: () => Post })
  posts?: Ref<Post>[];

  // 0: darkTheme
  // 1: lightTheme
  
  @prop({
    enum: [0, 1],
    default: 1,
  })
  public theme: Number;
}
