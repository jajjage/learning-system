import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GraduationCap, Users } from "lucide-react"

type RoleSelectionProps = {
  selectedRole: "student" | "teacher" | null
  onSetSelectRole: (role: "student" | "teacher") => void
}

export default function RoleSelection({
  selectedRole,
  onSetSelectRole,
}: RoleSelectionProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent mb-6">
        I want to explore as a:
      </h2>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onSetSelectRole("student")}
          className={cn(
            "flex items-center",
            selectedRole === "student" &&
              "bg-gradient-to-r from-purple-500 to-blue-400",
          )}
        >
          <GraduationCap className="mr-2 h-5 w-5" />
          Student
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onSetSelectRole("teacher")}
          className={cn(
            "flex items-center",
            selectedRole === "teacher" &&
              "bg-gradient-to-r from-purple-500 to-blue-400",
          )}
        >
          <Users className="mr-2 h-5 w-5" />
          Teacher
        </Button>
      </div>
    </div>
  )
}
