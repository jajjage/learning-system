import { IconBadge } from "@/components/global/IconBadge"
import {
  chapterList,
  deleteChapter,
  updateChapterPublishStatus,
} from "@/actions/chapter"
import { ArrowLeft, LayoutDashboard, ListChecks, Video } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ChapterTitleForm } from "./_components/ChapterTitleForm"
import { ChapterDescriptionForm } from "./_components/ChapterDescriptionForm"
import { ChapterAccessForm } from "./_components/ChapterAccessForm"
import { ChapterVideoForm } from "./_components/ChapterVideoForm"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { onAuthenticatedUser } from "@/actions/auth"
import { PublishBanner } from "@/components/global/PublishBanner"
import DeleteButton from "@/components/global/CourseDelete"

const ChapterIdPage = async (context: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = await onAuthenticatedUser()
  const client = new QueryClient()
  console.log(userId)
  if (!userId) {
    return redirect("/")
  }

  const resolvedParams = context.params
  const { courseId, chapterId } = resolvedParams

  const chapter = await client.fetchQuery({
    queryKey: ["chapter", chapterId],
    queryFn: () => chapterList(chapterId, courseId),
  })
  console.log(chapter)
  if (!chapter) {
    return redirect("/")
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  return (
    <HydrationBoundary state={dehydrate(client)}>
      {isComplete && (
        <PublishBanner
          initialIsPublished={chapter.isPublished}
          entityId={chapter.id}
          entityTitle="chapter"
          entityType="chapter"
          onPublishToggle={updateChapterPublishStatus}
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
            </div>
          </div>
          <DeleteButton
            entityId={chapter.id}
            entityType="chapter"
            courseId={courseId}
            onDelete={deleteChapter}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <ChapterVideoForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Access Settings</h2>
            </div>
            <ChapterAccessForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default ChapterIdPage
