import { api } from "@/src/lib/fetch-json";
import { VacancyActiveListResponse } from "@/src/types/modules/vacancy/active/list/reponse";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useVacancyActiveList(
  page: number,
  pageLength: number,
  selectedDate: Date,
  positionId?: string
) {
  return useQuery({
    queryKey: ["vacancy-active-list", page, pageLength, positionId],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append("page", String(page));
      params.append("pageLength", String(pageLength));
      params.append("selectedDate", String(selectedDate.toISOString()));
      params.append("positionId", String(positionId));

      const res: ApiSuccess<VacancyActiveListResponse> = await api.get(
        `/api/vacancies/active/list?${params.toString()}`
      );

      return res.data;
    },
  });
}
