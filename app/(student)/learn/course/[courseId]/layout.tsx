import { CourseSidebar } from "../_components/CourseSidebar"

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid h-screen grid-cols-[64px,1fr]">
      <CourseSidebar />
      <main className="flex flex-col overflow-hidden">{children}</main>
    </div>
  )
}
