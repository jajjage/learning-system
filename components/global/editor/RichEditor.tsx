import dynamic from "next/dynamic"
import "./RichEditor.css"

const ClientRichEditor = dynamic(() => import("./ClientRichEditor"), {
  ssr: false,
})

interface RichEditorProps {
  content: string
  onChange: (content: string) => void
  disabled?: boolean
  videoUrl?: string
}

export default function RichEditor(props: RichEditorProps) {
  return <ClientRichEditor {...props} />
}
