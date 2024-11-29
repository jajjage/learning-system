import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

const Courses = () => {
  return (
    <div>
      <Link href="/teacher/create">
        <Button>Create Course</Button>
      </Link>
    </div>
  )
}

export default Courses
