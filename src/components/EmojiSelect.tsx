import * as React from "react"
import {ACTIONS} from "../types/comment";

interface EmojiSelectProps {
  className?: string;
  value?: string[];
  onValueChange: (id: string[]) => void;
}

export default function EmojiSelect({className = '', value, onValueChange}: EmojiSelectProps) {
  return (
    <div className={`inline-flex gap-1 ${className}`}>
      {
        ACTIONS.map(e => (
          <div
              key={e.id}
            className={`p-1 h-7 w-7 flex justify-center items-center rounded-lg cursor-pointer ${value?.includes(e.id) ? 'bg-primary' : 'hover:bg-primary/90'}`}
            onClick={() => {
              if (value?.includes(e.id))
                onValueChange(value?.filter(f => f != e.id))
              else onValueChange(value ? [...value, e.id] : [e.id])
            }}
          >
            {e.emoji}
          </div>
        ))
      }
    </div>
  )
}