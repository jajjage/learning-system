import { Controller } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface FormFieldProps {
  name: keyof FormData
  label: string
  icon: React.ElementType
  control: any
  errors: any
  type?: string
}

function FormField({
  name,
  label,
  icon: Icon,
  control,
  errors,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Icon className="text-gray-400" size={20} />
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={name}
            type={type}
            className={`transition-all duration-300 ${errors[name] ? "ring-2 ring-red-500" : ""}`}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  )
}

export default FormField
