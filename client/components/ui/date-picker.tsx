"use client";

import * as React from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date?: Date) => void;
  date?: Date | null;
  setDate?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  date,
  setDate,
  placeholder = "Pick a date",
  className,
  disabled = false,
}: DatePickerProps) {
  const activeDate = value !== undefined ? value : date;
  const handleDateChange = (newDate?: Date) => {
    if (onChange) onChange(newDate);
    if (setDate) setDate(newDate);
  };

  const [open, setOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    activeDate || new Date()
  );

  React.useEffect(() => {
    if (activeDate) {
      setCurrentMonth(activeDate);
    }
  }, [activeDate]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  // Prev month padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month padding
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isToday = (d: Date) => isSameDay(d, new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSelect = (selectedDay: Date) => {
    if (activeDate && isSameDay(activeDate, selectedDay)) {
      handleDateChange(undefined);
    } else {
      handleDateChange(selectedDay);
    }
    setOpen(false);
  };

  const formatDisplayDate = (d: Date) => {
    return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal h-9 border-input bg-transparent text-foreground",
            !activeDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
          {activeDate ? formatDisplayDate(activeDate) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">
              {monthNames[month]} {year}
            </h4>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 p-0 flex items-center justify-center cursor-pointer"
                onClick={prevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 p-0 flex items-center justify-center cursor-pointer"
                onClick={nextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((wd) => (
              <span
                key={wd}
                className="text-[11px] font-medium text-muted-foreground uppercase py-1"
              >
                {wd}
              </span>
            ))}

            {days.map(({ date: day, isCurrentMonth }) => {
              const isSelected = activeDate ? isSameDay(day, activeDate) : false;
              const today = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleSelect(day)}
                  className={cn(
                    "h-8 w-8 rounded-md text-xs font-normal transition-colors flex items-center justify-center cursor-pointer",
                    !isCurrentMonth && "text-muted-foreground/30",
                    isCurrentMonth && "text-foreground",
                    today && !isSelected && "bg-accent/40 font-bold border border-primary/25",
                    isSelected && "bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/95",
                    isCurrentMonth && !isSelected && "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between border-t border-border pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2 cursor-pointer"
              onClick={() => {
                const today = new Date();
                handleDateChange(today);
                setOpen(false);
              }}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2 text-muted-foreground hover:text-destructive cursor-pointer"
              onClick={() => {
                handleDateChange(undefined);
                setOpen(false);
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
