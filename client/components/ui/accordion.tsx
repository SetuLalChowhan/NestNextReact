"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: any) => void;
  collapsible?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      defaultValue,
      value,
      onValueChange,
      collapsible = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [openItems, setOpenItems] = React.useState<string[]>(() => {
      if (value !== undefined)
        return Array.isArray(value) ? value : value ? [value] : [];
      if (defaultValue !== undefined)
        return Array.isArray(defaultValue)
          ? defaultValue
          : defaultValue
          ? [defaultValue]
          : [];
      return [];
    });

    React.useEffect(() => {
      if (value !== undefined) {
        setOpenItems(Array.isArray(value) ? value : value ? [value] : []);
      }
    }, [value]);

    const toggleItem = (itemValue: string) => {
      let nextItems: string[];
      if (type === "single") {
        if (openItems.includes(itemValue)) {
          nextItems = collapsible ? [] : [itemValue];
        } else {
          nextItems = [itemValue];
        }
      } else {
        if (openItems.includes(itemValue)) {
          nextItems = openItems.filter((i) => i !== itemValue);
        } else {
          nextItems = [...openItems, itemValue];
        }
      }
      setOpenItems(nextItems);
      onValueChange?.(type === "single" ? nextItems[0] || "" : nextItems);
    };

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItemContext = React.createContext<{ value: string } | null>(null);

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          className={cn(
            "rounded-xl border border-border bg-card overflow-hidden transition-all shadow-2xs",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);

  if (!accordion || !item) {
    throw new Error("AccordionTrigger must be inside AccordionItem");
  }

  const isOpen = accordion.openItems.includes(item.value);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => accordion.toggleItem(item.value)}
      className={cn(
        "flex w-full items-center justify-between p-3.5 text-xs font-semibold text-foreground transition-all hover:bg-muted/40 cursor-pointer text-left",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);

  if (!accordion || !item) {
    throw new Error("AccordionContent must be inside AccordionItem");
  }

  const isOpen = accordion.openItems.includes(item.value);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-xs transition-all duration-200 bg-muted/20 border-t border-border",
        isOpen ? "max-h-96 opacity-100 p-4" : "max-h-0 opacity-0 p-0 border-t-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
