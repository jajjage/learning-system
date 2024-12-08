import React from "react"

interface VideoPlayerProps {
  url: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className="relative aspect-video mt-2 mb-4">
      <video className="w-full h-full rounded-md" controls src={url}>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer
