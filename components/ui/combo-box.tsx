"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// NOTE: I've updated the path for cn to the standard Vercel/Next.js setup
// but you might need to adjust it back to '@/src/lib/utils' if that's correct for your project.
import { cn } from "@/src/lib/utils";
import { ComboboxItem } from "@/src/types/generic/combo-box-item";

// --- 1. Define the Generic Item Type ---

// --- 2. Define Component Props ---
interface GenericComboboxProps {
  items: ComboboxItem[];
  placeholder?: string; // Placeholder for the button
  searchPlaceholder?: string; // Placeholder for the search input
  noResultsMessage?: string; // Message when no items are found
  selectedItem?: string; // External control for the selected value
  onValueChange: (value: string) => void; // Callback for when a value is selected
  className?: string; // Class name for the button width/styling
}

export function GenericCombobox({
  items,
  placeholder = "Select an item...",
  searchPlaceholder = "Search...",
  noResultsMessage = "No item found.",
  selectedItem,
  onValueChange,
  className,
}: GenericComboboxProps) {
  const [open, setOpen] = React.useState(false);

  // Use the external prop if provided, otherwise manage internal state (though typically you use one or the other)
  // We'll primarily rely on the `selectedItem` prop passed from the parent component.
  const value = selectedItem || "";

  const handleSelect = (currentValue: string) => {
    // If the same item is clicked, deselect it (set to ""), otherwise set the new value.
    const newValue = currentValue === value ? "" : currentValue;
    onValueChange(newValue); // Communicate the change back to the parent component
    setOpen(false); // Close the popover
  };

  const selectedLabel = items.find((item) => item.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // The width is now controlled by the `className` prop, defaulting to w-[200px]
          className={cn("w-full justify-between", className)}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("w-full p-0")}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{noResultsMessage}</CommandEmpty>

            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value} // Command uses this value for filtering
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
