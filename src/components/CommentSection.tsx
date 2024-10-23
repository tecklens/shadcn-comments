import React, {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "./Avatar";
import {ArrowUpIcon, CircleIcon, SmileIcon} from "lucide-react";
import {EditorComment} from "./EditorComment";
import {ACTIONS, ACTIONS_TYPE, Comment} from "../types/comment";
import {User} from "../types/user";
import {EditorCommentStyle2} from "./EditorCommentStyle2";
import {makeid} from "../lib/utils";
import {MDXProvider} from "@mdx-js/react";
import PreviewComment from "./PreviewComment";
import {formatDistance} from 'date-fns';
import {Popover, PopoverContent, PopoverTrigger} from "./Popover";
import EmojiSelect from "./EmojiSelect";
import {DropdownMenu} from "./DropdownMenu";
import {EditingEditorComment} from "./EditingEditorComment";

interface CommentProps {
  className?: string;
  isMdxEditor?: boolean;
  formatDate?: string;
  value: Comment[];
  currentUser: User,
  onChange?: (value: Comment[]) => void,
  theme: 'light' | 'dark' | 'system',
  allowUpVote?: boolean;
  onVoteChange?: (checked: boolean) => void
}

interface CommentCardProps {
  comment: Comment,
  onReply: (val: string) => void,
  currentUser: User,
  allowUpVote?: boolean;
  onChange: (change: any) => void;
  onDelete: () => void;
  onVoteChange: (change: boolean) => void;
  theme: 'light' | 'dark' | 'system',
}

export const CommentCard = ({
                              comment,
                              onReply = () => {
                              },
                              currentUser,
                              allowUpVote,
                              onChange,
                              onVoteChange,
                              theme,
                              onDelete,
                            }: CommentCardProps) => {
  const [replying, setReplying] = useState(false)
  const [editing, setEditing] = useState(false)

  const actions = ACTIONS.filter(e => comment.actions && comment.actions[e.id] && comment.selectedActions?.includes(e.id))

  const upvote = (comment.actions ?? {})[ACTIONS_TYPE.UPVOTE];

  const upvoted = comment.selectedActions?.includes(ACTIONS_TYPE.UPVOTE);

  return (
    <div className={'flex flex-col gap-1'} id={`comment-${comment.id}`}>
      <div className={'flex gap-4'}>
        <Avatar className={'w-[32px] h-[32px]'}>
          <AvatarImage src={comment.user?.avatarUrl}/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={`flex flex-col w-full`}>
          <div className={'min-h-[30px] rounded-lg s-comment-card border'}>
            <div
              className={'h-[37px] w-full user rounded-t-lg flex items-center justify-between border-b'}>
              <div className={'flex items-center px-3'}>
                <span className={'font-semibold'}>{comment.user?.fullName}</span>
              </div>
              <DropdownMenu
                comment={comment}
                currentUser={currentUser}
                openEditor={() => {
                  setEditing(true)
                }}
                deleteComment={onDelete}
              />
            </div>
            <div className={'p-3'}>
              {editing ?
                <EditingEditorComment
                  currentUser={currentUser}
                  theme={theme}
                  value={comment.text}
                  onChange={(val) => {
                    onChange({
                      text: val
                    })
                    setEditing(false)
                  }}/>
                : <PreviewComment source={comment.text}/>}
            </div>
            {(allowUpVote && !editing) &&
              <div className={'flex flex-wrap items-center gap-2 md:gap-3 text-sm px-3 pb-2'}>
                <div
                  onClick={() => {
                    onVoteChange(!upvoted)
                    const currentAmount = (comment.actions || {})[ACTIONS_TYPE.UPVOTE];
                    if (upvoted) {
                      if (currentAmount)
                        onChange({
                          selectedActions: comment.selectedActions?.filter(e => e !== ACTIONS_TYPE.UPVOTE),
                          actions: {
                            ...(comment.actions || {}),
                            [ACTIONS_TYPE.UPVOTE]: currentAmount - 1,
                          }
                        })
                    } else {
                      onChange({
                        selectedActions: [...(comment.selectedActions ?? []), ACTIONS_TYPE.UPVOTE],
                        actions: {
                          ...(comment.actions || {}),
                          [ACTIONS_TYPE.UPVOTE]: currentAmount ? currentAmount + 1 : 1,
                        }
                      })
                    }
                  }}
                  className={`border ${upvoted ? `border-[#4493f8] text-[#4493f8]` : ''} rounded-xl px-2 py-0.5 inline-flex gap-1 items-center cursor-pointer`}>
                  <ArrowUpIcon size={16}/>
                  <span>{upvote ?? 0}</span>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className={'p-0.5 rounded-full border cursor-pointer'}>
                        <SmileIcon size={16}/>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className={'p-0.5'} align={'start'}>
                      <EmojiSelect
                        value={comment.selectedActions}
                        onSelect={(v, changeValue: ACTIONS_TYPE) => {
                          const currentAmount = (comment.actions || {})[changeValue];
                          onChange({
                            selectedActions: v,
                            actions: {
                              ...(comment.actions || {}),
                              [changeValue]: currentAmount ? currentAmount + 1 : 1,
                            }
                          })
                        }}
                        onUnSelect={(v, changeValue: ACTIONS_TYPE) => {
                          const currentAmount = (comment.actions || {})[changeValue];
                          if (currentAmount && currentAmount > 0)
                            onChange({
                              selectedActions: v.filter(f => f !== changeValue),
                              actions: {
                                ...(comment.actions || {}),
                                [changeValue]: currentAmount - 1,
                              }
                            })
                        }}
                        className={''}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {actions?.map(e => (
                  <div
                    key={e.id}
                    className={`border ${upvoted ? `border-[#4493f8] text-[#4493f8]` : ''} rounded-xl px-2 py-0.5 inline-flex gap-1 items-center cursor-pointer`}
                  >
                    <span>{e.emoji}</span>
                    <span>{(comment.actions ?? {})[e.id]}</span>
                  </div>
                ))}
              </div>}
          </div>
          <div className={'flex gap-2 items-center text-sm font-semibold light:text-gray-600 ml-1'}>
            <span className={'cursor-pointer text-primary'} onClick={() => setReplying(true)}>Reply</span>
            <CircleIcon size={3}/>
            <span
              className={'text-opacity-80'}>{formatDistance(Date.now(), comment.createdAt, {addSuffix: true})}</span>
          </div>
        </div>
      </div>
      {replying ?
        <div className={'ml-[48px]'}>
          <EditorCommentStyle2 onChange={onReply} currentUser={currentUser}/>
        </div>
        : null}
      {comment.replies && comment.replies.length > 0 ?
        <div className={'ml-[48px] flex flex-col gap-2'}>
          {comment.replies.map(rep => (
            <div className={'w-full flex gap-2'} key={rep.id}>
              <Avatar className={'w-[28px] h-[28px] text-sm'}>
                <AvatarImage src={comment.user?.avatarUrl}/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className={'flex flex-col'}>
                <div className={'flex'}>{rep.text}</div>
                <div className={'inline-flex gap-1 text-sm font-semibold light:text-gray-600'}>
                  <div className={'text-primary'}>{rep.user?.fullName}</div>
                  <div
                    className={'text-opacity-80'}>{formatDistance(Date.now(), rep.createdAt, {addSuffix: true})}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        : null}
    </div>
  )
}

export const CommentSection = ({
                                 className = '',
                                 formatDate,
                                 isMdxEditor,
                                 value,
                                 onChange = () => {
                                 },
                                 theme = 'light',
                                 currentUser,
                                 allowUpVote = false,
                                 onVoteChange = (change: boolean) => {
                                 }
                               }: CommentProps) => {
  return (
    <MDXProvider
      components={{
        wrapper(props) {
          return <div style={{backgroundColor: 'lightblue'}} {...props} />;
        },
      }}
    >
      <div className={`max-w-screen-md flex flex-col gap-2 w-full ${className}`}>
        <EditorComment
          currentUser={currentUser}
          theme={theme}
          onChange={(val) => {
            onChange([{
              id: makeid(8),
              user: currentUser,
              createdAt: new Date(),
              replies: [],
              text: val,
            }, ...(value ?? [])])
          }}/>
        {value.map(e => (
          <CommentCard
            currentUser={currentUser}
            onReply={(rep) => {
              if (value) {
                onChange(value.map(f => f.id === e.id ? {
                  ...f,
                  replies: [{
                    id: makeid(8),
                    parentId: e.id,
                    user: currentUser,
                    createdAt: new Date(),
                    replies: [],
                    text: rep,
                  }, ...(f.replies ?? [])]
                } : f))
              }
            }}
            onChange={(change: any) => {
              if (value)
                onChange(value.map(f => f.id === e.id ? {
                  ...f,
                  ...change,
                } : f))
            }}
            onDelete={() => {
              onChange(value.filter(f => f.id !== e.id))
            }}
            comment={e}
            key={e.id}
            allowUpVote={allowUpVote}
            theme={theme}
            onVoteChange={onVoteChange}
          />
        ))}
      </div>
    </MDXProvider>
  )
}