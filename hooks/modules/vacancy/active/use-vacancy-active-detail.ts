import { api } from "@/src/lib/fetch-json";
import { VacancyActiveDetailResponse } from "@/src/types/modules/vacancy/detail/response";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useVacancyActiveDetail(id?: string) {
  return useQuery({
    queryKey: ["vacancy-active", id],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (id) {
        params.append("id", id);
      } else {
        return null;
      }

      const res: ApiSuccess<VacancyActiveDetailResponse> = await api.get(
        `/api/vacancies/active?${params.toString()}`
      );
      return res.data;
    },
    enabled: !!id,
  });
}
