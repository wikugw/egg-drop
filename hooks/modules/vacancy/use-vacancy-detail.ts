import { api } from "@/src/lib/fetch-json";
import { useQuery } from "@tanstack/react-query";

export function useVacancyDetail(id?: number | string) {
  return useQuery({
    queryKey: ["vacancy", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await api.get(`/api/vacancies/${id}`);
      return res.data?.data;
    },
    enabled: !!id,
  });
}
