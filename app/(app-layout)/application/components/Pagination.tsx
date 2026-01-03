import { Button } from "@/components/ui/button";

type NextPrevPagintaionProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function NextPrevPagintaion({
  page,
  totalPages,
  onPrev,
  onNext,
}: NextPrevPagintaionProps) {
  return (
    <div className="flex items-center justify-between pt-4">
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={onPrev}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
