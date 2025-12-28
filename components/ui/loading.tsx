import loading from "@/src/assets/Loader cat.json";
import Lottie from "lottie-react";

export function Loading() {
  return (
    <Lottie animationData={loading} loop={true} className="w-48 h-48 m-auto" />
  );
}
