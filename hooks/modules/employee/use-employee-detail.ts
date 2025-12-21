import { api } from "@/src/lib/fetch-json";
import { EmployeeResponse } from "@/src/types/modules/employee/response";
import { ApiSuccess } from "@/src/types/responses/generic-response";
import { useQuery } from "@tanstack/react-query";

export function useEmployeeDetail(email?: string) {
  return useQuery({
    queryKey: ["vacancy", email],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (email) {
        params.append("email", email);
      } else {
        return null;
      }

      const res: ApiSuccess<EmployeeResponse> = await api.get(
        `/api/employees?${params.toString()}`
      );
      return res.data;
    },
    enabled: !!email,
  });
}
