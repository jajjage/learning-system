import Image from "next/image"
import React from "react"

const Logo = () => {
  return (
    <div>
      <Image height={130} width={130} alt="logo" src={"/logo.svg"} />
    </div>
  )
}

export default Logo
