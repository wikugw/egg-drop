import { api } from "@/src/lib/fetch-json";
import { ComboboxItem } from "@/src/types/generic/combo-box-item";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function usePositionList(departmentId?: string) {
  return useQuery({
    queryKey: ["position", departmentId],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (departmentId) {
        params.append("departmentId", departmentId);
      }

      const res: ApiSuccess<ComboboxItem[]> = await api.get(
        `/api/positions/lookup?${params.toString()}`
      );
      return res.data ?? [];
    },
    enabled: !!departmentId,
  });
}
