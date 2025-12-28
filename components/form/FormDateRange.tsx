"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateRange } from "react-day-picker";
import { Control, FieldValues, Path } from "react-hook-form";
import { DateRangePicker } from "../ui/date-range";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export function FormDateRangeField<T extends FieldValues>({
  control,
  name,
  label,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <DateRangePicker
              value={field.value as DateRange | undefined}
              onChange={field.onChange}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
