"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GenericCombobox } from "../ui/combo-box";

// Assuming the item structure from the GenericCombobox component
interface ComboboxItem {
  value: string;
  label: string;
}

// --- 1. Define Component Props ---
interface Props<T extends FieldValues> {
  control: Control<T>; // From react-hook-form
  name: Path<T>; // The field name
  label: string;
  items: ComboboxItem[]; // The list of options
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

export function FormComboboxField<T extends FieldValues>({
  control,
  name,
  label,
  items,
  placeholder,
  searchPlaceholder,
  className,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {/* 2. Connect GenericCombobox to RHF's field object */}
            <GenericCombobox
              items={items}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              selectedItem={field.value} // RHF reads the current value
              onValueChange={field.onChange} // RHF updates the value when Combobox changes
              className={className}
              // Optional: You can spread field here if GenericCombobox needed onBlur or ref
              // but for a controlled select, onChange and value are usually enough.
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
