"use client";

import { usePositionList } from "@/hooks/modules/department/use-position-list";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormComboboxField } from "../FormComboBoxField";

// Import the reusable FormComboboxField

// --- 2. Define Component Props ---
interface Props<T extends FieldValues> {
  departmentId?: string;
  control: Control<T>; // From react-hook-form
  name: Path<T>; // The field name in the form schema
  label?: string; // Optional: Override the default label
  placeholder?: string; // Optional: Override the default placeholder
  className?: string;
}

/**
 * A specialized Form Field for selecting a Department using a searchable Combobox.
 * @param {Props} props - Props inherited from FormComboboxField
 */
export function PositionDropdown<T extends FieldValues>({
  departmentId,
  control,
  name,
  label = "Position", // Default label
  placeholder = "Select a Position...", // Default placeholder
  className,
}: Props<T>) {
  const { data, isLoading } = usePositionList(departmentId);

  return (
    <FormComboboxField
      control={control}
      name={name}
      label={label}
      // Pass the fixed department data
      items={data ?? []}
      placeholder={isLoading ? "getting data" : placeholder}
      searchPlaceholder="Search Positions..."
      className={className}
    />
  );
}
