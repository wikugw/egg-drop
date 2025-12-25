import Swal from "sweetalert2";

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
