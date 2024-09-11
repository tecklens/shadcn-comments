import {User} from "./user";

export type Comment = {
  user: User,
  id: string,
  parentId?: string;
  text: string,
  replies?: Comment[],
  createdAt: Date;
}