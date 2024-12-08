import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"

const VideoEmbed = Node.create({
  name: "videoEmbed",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-video-embed]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-video-embed": "" })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoEmbedComponent)
  },
})

function VideoEmbedComponent({ node }: { node: any }) {
  const { src } = node.attrs

  if (!src) {
    return null
  }

  let embedSrc = ""
  if (src.includes("youtube.com") || src.includes("youtu.be")) {
    const videoId = src.split("v=")[1] || src.split("/").pop()
    embedSrc = `https://www.youtube.com/embed/${videoId}`
  } else if (src.includes("vimeo.com")) {
    const videoId = src.split("/").pop()
    embedSrc = `https://player.vimeo.com/video/${videoId}`
  }

  if (!embedSrc) {
    return null
  }

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={embedSrc}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export { VideoEmbed }
