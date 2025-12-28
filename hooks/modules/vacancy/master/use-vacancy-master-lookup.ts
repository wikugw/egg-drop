import { api } from "@/src/lib/fetch-json";
import { ComboboxItem } from "@/src/types/generic/combo-box-item";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useVacancyMasterLookup(
  departmentId: string,
  positionId: string
) {
  return useQuery({
    queryKey: ["vacancy-master-lookup", departmentId, positionId],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("departmentId", departmentId);
      params.append("positionId", positionId);

      const res: ApiSuccess<ComboboxItem[]> = await api.get(
        `/api/vacancies/master/lookup?${params.toString()}`
      );

      return res.data ?? [];
    },
  });
}
