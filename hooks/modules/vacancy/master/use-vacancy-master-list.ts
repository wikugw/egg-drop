import { api } from "@/src/lib/fetch-json";
import { VacancyMasterListResponse } from "@/src/types/modules/vacancy/master/list/reponse";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useVacancyMasterList(page: number, pageLength: number) {
  return useQuery({
    queryKey: ["vacancy-master-list", page, pageLength],
    queryFn: async () => {
      const res: ApiSuccess<VacancyMasterListResponse> = await api.get(
        `/api/vacancies/master/list?page=${page}&pageLength=${pageLength}`
      );

      return res.data;
    },
  });
}
