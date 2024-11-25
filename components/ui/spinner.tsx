import { Loader2 } from 'lucide-react'

export function Spinner({ className = '', ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={`flex justify-center items-center ${className}`} {...props}>
      <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
    </div>
  )
}

