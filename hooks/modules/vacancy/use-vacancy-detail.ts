import { api } from "@/src/lib/fetch-json";
import { VacancyMasterDetailResponse } from "@/src/types/modules/vacancy/master/list/reponse";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useVacancyDetail(id?: string) {
  return useQuery({
    queryKey: ["vacancy", id],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (id) {
        params.append("id", id);
      } else {
        return null;
      }

      const res: ApiSuccess<VacancyMasterDetailResponse> = await api.get(
        `/api/vacancies/master?${params.toString()}`
      );
      return res.data;
    },
    enabled: !!id,
  });
}
