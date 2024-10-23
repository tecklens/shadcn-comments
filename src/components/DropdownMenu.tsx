import React, {useEffect, useRef, useState} from "react";
import {EllipsisVertical} from "lucide-react";
import {Comment} from "../types/comment";
import {User} from "../types/user";

export function DropdownMenu({comment, openEditor, currentUser, deleteComment}: {
  comment: Comment,
  openEditor: () => void,
  deleteComment: () => void,
  currentUser: User
}) {
  const ref = useRef<any>()
  const [open, setOpen] = useState(false)

  const copyToClipboard = async () => {
    const textToCopy = window.location.host + `#comment-${comment.id}`;
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy ?? '');
      setOpen(false)
    }
  }

  const del = () => {
    setOpen(false)
    if (confirm('Are you sure you want to delete this?')) {
      deleteComment()
    }
  }

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (open) setOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, ref]);

  return (
    <div className={'dropdown'}>
      <div onClick={() => setOpen(!open)} className={'w-8 h-8 flex justify-center items-center cursor-pointer dropbtn'}>
        <EllipsisVertical size={18}/>
      </div>
      <div
        ref={ref}
        className={`dropdown-content border rounded-lg overflow-hidden cursor-pointer ${open ? '!block' : ''}`}>
        <div
          className={'px-3 py-2 text-sm hover:bg-blue-500 hover:text-white'}
          onClick={copyToClipboard}
        >
          <div>Copy link</div>
        </div>
        {currentUser.id === comment.user.id && <div
          onClick={() => {
            openEditor()
            setOpen(false)
          }}
          className={'px-3 py-2 text-sm hover:bg-blue-500 hover:text-white'}
        >
          <div>Edit</div>
        </div>}
        {currentUser.id === comment.user.id && <div
          className={'px-3 py-2 text-sm text-red-600 hover:bg-blue-500'}
          onClick={del}
        >
          <div>Delete</div>
        </div>}
      </div>
    </div>
  )
}