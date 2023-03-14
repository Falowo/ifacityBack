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
export class Odu {
  public _id?: mongoose.Schema.Types.ObjectId;
  public createdAt?: Date;
  public updatedAt?: Date;
  @prop()
  binId: number;
  @prop()
  leg0: boolean[];
  @prop()
  leg1: boolean[];
  @prop()
  oduNames?: string[];
  @prop({ ref: () => Post })
  posts?: Ref<Post>[];
}
