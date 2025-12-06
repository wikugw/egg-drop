"use client";

import { useDepartmentList } from "@/hooks/modules/department/use-department-list";
import { Control, FieldValues, Path } from "react-hook-form";
import { FormComboboxField } from "../FormComboBoxField";

// Import the reusable FormComboboxField

// --- 2. Define Component Props ---
interface Props<T extends FieldValues> {
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
export function DepartmentDropdown<T extends FieldValues>({
  control,
  name,
  label = "Department", // Default label
  placeholder = "Select a department...", // Default placeholder
  className,
}: Props<T>) {
  const { data, isLoading } = useDepartmentList();

  return (
    <FormComboboxField
      control={control}
      name={name}
      label={label}
      // Pass the fixed department data
      items={data ?? []}
      placeholder={isLoading ? "getting data" : placeholder}
      searchPlaceholder="Search departments..."
      className={className}
    />
  );
}
