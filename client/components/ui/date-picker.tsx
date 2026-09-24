"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  date?: Date | null
  setDate: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  date,
  setDate,
  placeholder = "Pick a date",
  className,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(
    date ? date.toISOString().split("T")[0] : ""
  )

  React.useEffect(() => {
    if (date) {
      setInputValue(date.toISOString().split("T")[0])
    } else {
      setInputValue("")
    }
  }, [date])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    if (val) {
      const parsed = new Date(val)
      if (!isNaN(parsed.getTime())) {
        setDate(parsed)
      }
    } else {
      setDate(undefined)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal h-9 bg-transparent",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
          {date ? date.toLocaleDateString() : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-muted-foreground">Select Date</div>
          <Input
            type="date"
            value={inputValue}
            onChange={handleInputChange}
            className="h-9"
          />
          <div className="flex items-center justify-between gap-2 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const today = new Date()
                setDate(today)
                setOpen(false)
              }}
              className="text-xs h-7"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDate(undefined)
                setOpen(false)
              }}
              className="text-xs h-7 hover:text-destructive"
            >
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
