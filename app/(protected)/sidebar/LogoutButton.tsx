"use client";

import { confirmDialog } from "@/components/dialog/confirm-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { api } from "@/src/lib/fetch-json";
import { LogoutResponse } from "@/src/types/responses/logout";
import { useMutation } from "@tanstack/react-query";

export function LogoutButton() {
  const mutation = useMutation({
    mutationFn: async () => {
      return api.post<LogoutResponse, undefined>("/api/auth/logout", undefined);
    },
    onSuccess: () => {
      window.location.href = "/login";
    },
  });
  const handleLogout = async () => {
    const ok = await confirmDialog({
      title: "Log Out?",
      description: "Are you sure?",
      confirmText: "Yes",
      cancelText: "Cancel",
    });

    if (!ok) return;

    // Call logout API
    mutation.mutate();
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <span>Sign out</span>
    </DropdownMenuItem>
  );
}
