import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="border p-2 rounded w-full text-left">
          {value?.from && value?.to
            ? `${format(value.from, "dd MMM yyyy")} – ${format(
                value.to,
                "dd MMM yyyy"
              )}`
            : "Select date range"}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
