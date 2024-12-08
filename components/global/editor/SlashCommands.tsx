// import { useState, useEffect, useRef } from "react"
// import { Editor } from "@tiptap/react"
// import { Command } from "cmdk"

// interface SlashCommandsProps {
//   editor: Editor
//   onClose: () => void
// }

// const commands = [
//   {
//     name: "Heading 1",
//     action: (editor: Editor) =>
//       editor.chain().focus().toggleHeading({ level: 1 }).run(),
//   },
//   {
//     name: "Heading 2",
//     action: (editor: Editor) =>
//       editor.chain().focus().toggleHeading({ level: 2 }).run(),
//   },
//   {
//     name: "Bullet List",
//     action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
//   },
//   {
//     name: "Numbered List",
//     action: (editor: Editor) =>
//       editor.chain().focus().toggleOrderedList().run(),
//   },
//   {
//     name: "Quote",
//     action: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
//   },
//   {
//     name: "Code Block",
//     action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
//   },
//   {
//     name: "Image",
//     action: (editor: Editor) => {
//       const url = window.prompt("Enter the image URL")
//       if (url) {
//         editor.chain().focus().setImage({ src: url }).run()
//       }
//     },
//   },
//   {
//     name: "Video",
//     action: (editor: Editor) => {
//       const url = window.prompt("Enter the video URL (YouTube or Vimeo)")
//       if (url) {
//         editor.chain().focus().setVideoEmbed({ src: url }).run()
//       }
//     },
//   },
// ]

// export default function SlashCommands({ editor, onClose }: SlashCommandsProps) {
//   const [search, setSearch] = useState("")
//   const inputRef = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     inputRef.current?.focus()
//   }, [])

//   return (
//     <div className="absolute z-50 w-64 bg-white border border-gray-200 rounded-md shadow-lg">
//       <Command>
//         <Command.Input
//           ref={inputRef}
//           value={search}
//           onValueChange={setSearch}
//           placeholder="Type a command or search..."
//         />
//         <Command.List>
//           {commands.map((command) => (
//             <Command.Item
//               key={command.name}
//               onSelect={() => {
//                 command.action(editor)
//                 onClose()
//               }}
//             >
//               {command.name}
//             </Command.Item>
//           ))}
//         </Command.List>
//       </Command>
//     </div>
//   )
// }
