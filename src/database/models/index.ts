import { User } from "./User";
import { Post } from "./Post";
import { Message } from "./Message";
import { Conversation } from "./Conversation";
import { Page } from "./Page";
import { Odu } from "./Odu";

import { getModelForClass } from "@typegoose/typegoose";

export const UserModel = getModelForClass(User);
export const PostModel = getModelForClass(Post);
export const MessageModel = getModelForClass(Message);
export const ConversationModel =
  getModelForClass(Conversation);
export const PageModel = getModelForClass(Page);
export const OduModel = getModelForClass(Odu);
