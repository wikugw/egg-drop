import Swal, { SweetAlertResult } from "sweetalert2";

const isDark = () => {
  return document.documentElement.classList.contains("dark");
};

export const errorAlert = (message: string) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    theme: isDark() ? "dark" : "light",
  });
};

export const successAlert = (message = "Success") => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    theme: isDark() ? "dark" : "light",
  });
};

interface ConfirmationOptions {
  title: string;
  text: string;
  confirmText?: string; // Dibuat opsional dengan default
  cancelText?: string; // Dibuat opsional dengan default
  icon?: "success" | "error" | "warning" | "info" | "question";
}

export const confirmationModal = ({
  title,
  text,
  confirmText = "Ya, Lanjutkan", // Default value
  cancelText = "Batal", // Default value
  icon = "info", // Default value
}: ConfirmationOptions): Promise<SweetAlertResult> => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    theme: isDark() ? "dark" : "light",
  });
};
