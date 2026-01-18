import { Applicant } from "@/src/lib/db/schema";
import { api } from "@/src/lib/fetch-json";
import { ApiSuccess } from "@/src/types/responses/generic-response";

export const checkApplicant = async (email: string) => {
  const params = new URLSearchParams();

  params.append("email", String(email));

  const res = await api.get<ApiSuccess<Applicant>>(
    `/api/applications/check-email?${params.toString()}`
  );
  return res;
};
