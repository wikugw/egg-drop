import { api } from "@/src/lib/fetch-json";
import { ComboboxItem } from "@/src/types/generic/combo-box-item";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useDepartmentList() {
  return useQuery({
    queryKey: ["department"],
    queryFn: async () => {
      const res: ApiSuccess<ComboboxItem[]> = await api.get(
        `/api/departments/lookup`
      );
      return res.data ?? [];
    },
  });
}
