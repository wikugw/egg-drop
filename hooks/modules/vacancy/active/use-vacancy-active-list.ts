import { api } from "@/src/lib/fetch-json";
import { VacancyActiveListResponse } from "@/src/types/modules/vacancy/active/list/reponse";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useVacancyActiveList(
  page: number,
  pageLength: number,
  selectedDate: Date
) {
  return useQuery({
    queryKey: ["vacancy-active-list", page, pageLength],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("page", String(page));
      params.append("pageLength", String(pageLength));
      params.append("selectedDate", String(selectedDate.toISOString()));

      const res: ApiSuccess<VacancyActiveListResponse> = await api.get(
        `/api/vacancies/active/list?${params.toString()}`
      );

      return res.data;
    },
  });
}
