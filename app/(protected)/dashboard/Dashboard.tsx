"use client";

import { useEmployeeDetail } from "@/hooks/modules/employee/use-employee-detail";
import { USER_EMAIL } from "@/src/constant/local-storage";
import { getFromLocalStorage } from "@/src/helper/local-storage";
import { setEmployee } from "@/src/store/slices/employee-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DashboardComponent() {
  const { data } = useEmployeeDetail(getFromLocalStorage(USER_EMAIL) ?? "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setEmployee(data));
    }
  }, [data, dispatch]);

  return <h1>Dashboard</h1>;
}
