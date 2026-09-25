import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "defaultValue"
  > {
  value?: number[] | number;
  defaultValue?: number[] | number;
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      ...props
    },
    ref
  ) => {
    const rawVal = Array.isArray(value)
      ? value[0]
      : value !== undefined
      ? value
      : Array.isArray(defaultValue)
      ? defaultValue[0]
      : defaultValue;
    const [currentValue, setCurrentValue] = React.useState<number>(
      rawVal ?? 0
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(Array.isArray(value) ? value[0] : value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      setCurrentValue(val);
      onValueChange?.([val]);
    };

    const percentage = Math.min(
      Math.max(((currentValue - min) / (max - min)) * 100, 0),
      100
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center h-5",
          className
        )}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
          <div
            className="absolute h-full bg-primary transition-all duration-75 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          {...props}
        />
        <div
          className="absolute block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-xs transition-transform focus-visible:outline-none pointer-events-none -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
