import * as React from "react"
import {ACTIONS, ACTIONS_TYPE} from "../types/comment";

interface EmojiSelectProps {
  className?: string;
  value?: string[];
  onSelect: (id: string[], changeValue: ACTIONS_TYPE) => void;
  onUnSelect: (id: string[], changeValue: ACTIONS_TYPE) => void;
}

export default function EmojiSelect({className = '', value, onSelect, onUnSelect}: EmojiSelectProps) {
  return (
    <div className={`inline-flex gap-1 ${className}`}>
      {
        ACTIONS.map(e => (
          <div
              key={e.id}
            className={`p-1 h-7 w-7 flex justify-center items-center rounded-lg cursor-pointer ${value?.includes(e.id) ? 'bg-primary' : 'hover:bg-primary/90'}`}
            onClick={() => {
              if (value?.includes(e.id))
                onUnSelect(value?.filter(f => f != e.id), e.id)
              else onSelect(value ? [...value, e.id] : [e.id], e.id)
            }}
          >
            {e.emoji}
          </div>
        ))
      }
    </div>
  )
}