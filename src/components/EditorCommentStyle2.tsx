import React, {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "./Avatar";
import {Input} from "./Input";
import {Camera, SendIcon, SmileIcon} from "lucide-react";
import {User} from "../types/user";

interface EditorCommentStyle2Props {
  value?: string;
  onChange?: (val: string) => void;
  currentUser: User;
}

export const EditorCommentStyle2 = ({
                                      value = '',
                                      onChange = () => {
                                      },
                                      currentUser,
                                    }: EditorCommentStyle2Props) => {
  const [tempValue, setTempValue] = useState('')
  return (
    <div className={`flex gap-2 w-full items-center`}>
      <Avatar className={'w-[28px] h-[28px]'}>
        <AvatarImage src={currentUser.avatarUrl}/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className={'w-full flex-1'}>
        <Input
          className={'rounded-full'}
          placeholder={`Reply as ${currentUser.fullName}`}
          value={tempValue}
          onChange={(v) => setTempValue(v.target.value)}
          onKeyDown={e => {
            if (e.code === 'Enter') {
              onChange(tempValue)
              setTempValue('')
            }
          }}
        />
      </div>
    </div>
  )
}