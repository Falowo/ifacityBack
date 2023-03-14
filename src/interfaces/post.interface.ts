export enum ETheme {
  "darkTheme",
  "lightTheme",
}
export interface IComment {
  _id?: string;
  postId: string;
  content: string;
  userId: string;
  imageFileName?: string;
  audioFileName?: string;
  likingUserIds?:string[];
  isEditing?: boolean;
}

export interface IPost {
  _id?: string;
  oduBinId?: number;
  pageId?: string;
  userId?: string;
  content?:string;
  imageFileNames?: string[];
  audioFileNames?: string[];
  videoFileNames?: string[];
  comments?: IComment[];
  hashTags?: string[];
  locals?: string[];
  targetUserIds?: string[];
  likingUserIds?: string[];
  theme?: string;
  isEditing?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClassicPage {
  _id?: string;
  title?: string;
  posts?: IPost[];
  theme?: ETheme;
}

