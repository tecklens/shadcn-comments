import {User} from "./user";

export const LIST_EMOJI = [
  '👍',
  '👎',
  '😄',
  '🎉',
  '😕',
  '❤️',
  '🚀',
  '👀',
]

export enum ACTIONS_TYPE {
  THUMB_UP = 'THUMB_UP',
  THUMB_DOWN = 'THUMB_DOWN',
  LAUGH = 'LAUGH',
  HOORAY = 'HOORAY',
  CONFUSED = 'CONFUSED',
  HEART = 'HEART',
  ROCKET = 'ROCKET',
  EYE = 'EYE',
  UPVOTE = 'UPVOTE'
}

export const ACTIONS = [
  {
    id: ACTIONS_TYPE.THUMB_UP,
    emoji: LIST_EMOJI[0]
  },
  {
    id: ACTIONS_TYPE.THUMB_DOWN,
    emoji: LIST_EMOJI[1]
  },
  {
    id: ACTIONS_TYPE.LAUGH,
    emoji: LIST_EMOJI[2]
  },
  {
    id: ACTIONS_TYPE.HOORAY,
    emoji: LIST_EMOJI[3]
  },
  {
    id: ACTIONS_TYPE.CONFUSED,
    emoji: LIST_EMOJI[4]
  },
  {
    id: ACTIONS_TYPE.HEART,
    emoji: LIST_EMOJI[5]
  },
  {
    id: ACTIONS_TYPE.ROCKET,
    emoji: LIST_EMOJI[6]
  },
  {
    id: ACTIONS_TYPE.EYE,
    emoji: LIST_EMOJI[7]
  },
]

export type Comment = {
  user: User,
  id: string,
  parentId?: string;
  text: string,
  replies?: Comment[],
  createdAt: Date;
  actions?: {[key in ACTIONS_TYPE]: number};
  selectedActions?: ACTIONS_TYPE[];
  allowUpvote?: boolean;
}