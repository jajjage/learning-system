import { Button } from "@/components/ui/button"
import { GraduationCap, Users } from "lucide-react"

type RoleSelectionProps = {
  selectedRole: "student" | "teacher" | null
  onSelectRole: (role: "student" | "teacher") => void
}

export default function RoleSelection({
  selectedRole,
  onSelectRole,
}: RoleSelectionProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        I want to explore as a:
      </h2>
      <div className="flex space-x-4">
        <Button
          variant={selectedRole === "student" ? "default" : "outline"}
          size="lg"
          onClick={() => onSelectRole("student")}
          className="flex items-center"
        >
          <GraduationCap className="mr-2 h-5 w-5" />
          Student
        </Button>
        <Button
          variant={selectedRole === "teacher" ? "default" : "outline"}
          size="lg"
          onClick={() => onSelectRole("teacher")}
          className="flex items-center"
        >
          <Users className="mr-2 h-5 w-5" />
          Teacher
        </Button>
      </div>
    </div>
  )
}
