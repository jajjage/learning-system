import { Editor } from "@tiptap/react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react"

interface ToolbarProps {
  editor: Editor
  disabled?: boolean
}

export default function Toolbar({ editor, disabled = false }: ToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={disabled}
        aria-label="Toggle bold"
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={disabled}
        aria-label="Toggle italic"
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        disabled={disabled}
        aria-label="Toggle underline"
      >
        <Underline className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={disabled}
        aria-label="Toggle strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        disabled={disabled}
        aria-label="Toggle code"
      >
        <Code className="w-4 h-4" />
      </Toggle>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          const url = window.prompt("Enter the URL")
          if (url) {
            editor.chain().focus().setLink({ href: url }).run()
          }
        }}
        disabled={disabled}
        aria-label="Insert link"
      >
        <Link className="w-4 h-4" />
      </Button>
      <Toggle
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        disabled={disabled}
        aria-label="Align left"
      >
        <AlignLeft className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        disabled={disabled}
        aria-label="Align center"
      >
        <AlignCenter className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        disabled={disabled}
        aria-label="Align right"
      >
        <AlignRight className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        disabled={disabled}
        aria-label="Toggle bullet list"
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={disabled}
        aria-label="Toggle ordered list"
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>
    </div>
  )
}
