"use client";

import { useEmployeeDetail } from "@/hooks/modules/employee/use-employee-detail";
import { USER_EMAIL } from "@/src/constant/local-storage";
import { getFromLocalStorage } from "@/src/helper/local-storage";
import { setEmployee } from "@/src/store/slices/employee-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function EmployeeInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = getFromLocalStorage<string>(USER_EMAIL) ?? "";
  const { data } = useEmployeeDetail(email);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setEmployee(data));
    }
  }, [data, dispatch]);

  return <>{children}</>;
}
