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
      <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1a73e8] to-[#4285f4] bg-clip-text text-transparent mb-6">
        I want to explore as a:
      </h2>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onSetSelectRole("student")}
          className={cn(
            "flex items-center border-2 transition-all duration-300",
            selectedRole === "student"
              ? "bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white border-transparent"
              : "hover:border-[#1a73e8] hover:text-[#1a73e8]",
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
            "flex items-center border-2 transition-all duration-300",
            selectedRole === "teacher"
              ? "bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white border-transparent"
              : "hover:border-[#1a73e8] hover:text-[#1a73e8]",
          )}
        >
          <Users className="mr-2 h-5 w-5" />
          Teacher
        </Button>
      </div>
    </div>
  )
}
