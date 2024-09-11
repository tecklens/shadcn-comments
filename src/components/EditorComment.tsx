import React, {useEffect, useState} from "react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo
} from "@mdxeditor/editor";
import {Avatar, AvatarFallback, AvatarImage} from "./Avatar";
import {Button} from "./Button";
import {User} from "../types/user";

interface EditorCommentProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string,
  onUpload?: (image: File) => Promise<string>;
  theme: 'light' | 'dark' | 'system',
  currentUser: User;
}

export const EditorComment = ({
                                value = '', onChange = () => {
  },
                                placeholder = 'Add your comment here...',
                                onUpload,
                                theme,
                                currentUser,
                              }: EditorCommentProps) => {
  const [tempValue, setTempValue] = useState('')

  useEffect(() => {
    setTempValue(value)
  }, [value])

  return (
    <div className={`flex flex-col gap-2 w-full editor-content-container`}>
      <div className={`flex gap-4 w-full`}>
        <Avatar className={'w-[32px] h-[32px]'}>
          <AvatarImage src={currentUser?.avatarUrl}/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className={'w-full flex-1'}>
          <MDXEditor
            markdown={tempValue}
            onChange={setTempValue}
            placeholder={placeholder}
            className={`border rounded-lg prose-sm md:prose max-w-full editor-content ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
            contentEditableClassName={`overflow-y-auto py-2 whitespace-normal text-start`}
            plugins={[
              toolbarPlugin({
                toolbarContents: () => (
                  <div className={'flex gap-1'}>
                    {' '}
                    <UndoRedo/>
                    <ListsToggle/>
                    <Separator/>
                    <InsertImage/>
                    {/*<Select  items={}/>*/}
                    <div className={'hidden md:flex gap-1'}>
                      <BoldItalicUnderlineToggles/>
                      <BlockTypeSelect/>
                      <CreateLink/>
                      <InsertTable/>
                    </div>
                  </div>
                )
              }),
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              tablePlugin(),
              imagePlugin({
                imageUploadHandler: onUpload,
              }),
              linkPlugin(),
              linkDialogPlugin(),
            ]}
          />
        </div>
      </div>
      <div className={'flex justify-end'}>
        <Button disabled={!tempValue} onClick={() => {
          onChange(tempValue)
          setTempValue('')
        }} className={'h-8'}>Comment</Button>
      </div>
    </div>
  )
}