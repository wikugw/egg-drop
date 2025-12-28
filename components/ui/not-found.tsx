import empty from "@/src/assets/empty.json";
import Lottie from "lottie-react";

export function NotFound() {
  return (
    <Lottie animationData={empty} loop={true} className="w-48 h-48 m-auto" />
  );
}
