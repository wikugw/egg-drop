import { api } from "@/src/lib/fetch-json";
import { VacancyMasterListResponse } from "@/src/types/modules/vacancy/master/list/reponse";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useVacancyMasterList() {
  return useQuery({
    queryKey: ["vacancy-master-list"],
    queryFn: async () => {
      const res: ApiSuccess<VacancyMasterListResponse> = await api.get(
        `/api/vacancies/master/list`
      );
      console.log(res);
      return res.data?.data;
    },
  });
}
