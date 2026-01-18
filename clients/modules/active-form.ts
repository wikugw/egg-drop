import { api } from "@/src/lib/fetch-json";
import { VacancyActiveFormType } from "@/src/lib/validation/vacancy-active";
import { VacancyActiveCheckResponse } from "@/src/types/modules/vacancy/active/check-active/check-response";
import { ApiSuccess } from "@/src/types/responses/generic-response";

export const checkVacancyActive = async (id: string, selectedDate: Date) => {
  const params = new URLSearchParams();

  params.append("id", String(id));
  params.append("selectedDate", String(selectedDate.toISOString()));

  const res = await api.get<ApiSuccess<VacancyActiveCheckResponse>>(
    `/api/vacancies/active/check-active?${params.toString()}`
  );
  return res;
};

export const postVacancy = async (values: VacancyActiveFormType) => {
  return api.post("/api/vacancies/active/post", values);
};
