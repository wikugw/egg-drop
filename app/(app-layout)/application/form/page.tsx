import { Suspense } from "react";
import ApplicationForm from "./ApplicationForm";

export default function ListApplicationPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <div className="flex flex-col gap-2">
        <ApplicationForm />
      </div>
    </Suspense>
  );
}
