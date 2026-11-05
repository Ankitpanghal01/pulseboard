import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm',
        'placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20',
        'dark:border-white/10 dark:bg-[#0b0e14] dark:text-slate-100 dark:placeholder:text-slate-500',
        className,
      )}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
export default Input
