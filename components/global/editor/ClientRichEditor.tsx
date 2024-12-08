"use client"

import { useEffect, useRef } from "react"
import { EditorContent } from "@tiptap/react"
import { useRichEditor } from "./useRichEditor"
import Toolbar from "./Toolbar"
import VideoPlayer from "./VideoPlayer"

interface ClientRichEditorProps {
  content: string
  onChange: (content: string) => void
  disabled?: boolean
  videoUrl?: string
}

export default function ClientRichEditor({
  content,
  onChange,
  disabled = false,
  videoUrl,
}: ClientRichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editor = useRichEditor({
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && !disabled) {
      editor.commands.focus("end")
    }
  }, [editor, disabled])

  if (!editor) {
    return null
  }

  return (
    <div className="w-full border border-gray-200 rounded-lg shadow-sm">
      <Toolbar editor={editor} disabled={disabled} />
      <div className="relative">
        {videoUrl && <VideoPlayer url={videoUrl} />}
        <EditorContent
          editor={editor}
          className="prose max-w-none p-4"
          ref={editorRef}
        />
      </div>
    </div>
  )
}
