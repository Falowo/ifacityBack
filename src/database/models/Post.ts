import {
  modelOptions,
  mongoose,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Comment } from "./Comment";
import { Odu } from "./Odu";
import { Page } from "./Page";
import { User } from "./User";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Post {
  public _id?: mongoose.Schema.Types.ObjectId;
  public createdAt?: Date;
  public updatedAt?: Date;

  @prop({
    ref: () => User,
    required: true,
  })
  public userId: Ref<User>;

  @prop({
    ref: () => Page,
  })
  public pageId?: Ref<Page>;

  @prop({
    ref: () => Odu,
  })
  public oduId?: Ref<Odu>;

  @prop({
    min: 0,
    max: 255,
  })
  public oduBinId?: number;

  @prop({
    maxlength: 256000,
  })
  public content?: string;

  @prop({
    maxlength: 256,
  })
  public audioFileNames?: string[];

  @prop({
    maxlength: 256,
  })
  public imageFileNames?: string[];

  @prop({
    maxlength: 256,
  })
  public videoFileNames?: string[];

  @prop({
    ref: () => Comment,
  })
  public commentIds?: Ref<Comment>[];

  @prop({
    maxlength: 32,
  })
  hashTags?: string[];

  @prop({
    maxlength: 2,
  })
  public locals?: string[];

  @prop({
    ref: () => User,
  })
  public targetUserIds?: Ref<User>[];

  @prop({
    ref: () => User,
  })
  public likingUserIds?: Ref<User>[];

  @prop({
    maxlength: 32,
  })
  public theme?: string;
}
