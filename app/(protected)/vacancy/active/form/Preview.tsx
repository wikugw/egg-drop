import { Loading } from "@/components/ui/loading";
import { NotFound } from "@/components/ui/not-found";
import { useVacancyDetail } from "@/hooks/modules/vacancy/master/use-vacancy-detail";
import { toIdr } from "@/src/helper/currency";

type Props = {
  id?: string;
};

export default function VacancyPreview({ id }: Props) {
  const { data, isLoading } = useVacancyDetail(id);

  if (!id) {
    return (
      <div className="text-center text-muted-foreground">Select Vacancy Id</div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {data.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {data.departmentName} • {data.positionName}
          </p>
        </div>
      </div>

      {/* Salary */}
      <div className="flex gap-2 text-sm">
        <span className="text-muted-foreground">Salary Range:</span>
        <span className="font-medium">
          {toIdr(data.salaryMin)} – {toIdr(data.salaryMax)}
        </span>
      </div>

      {/* Description */}
      <section className="space-y-2 mt-2">
        <h2 className="font-medium text-lg mb-0">Description</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.description}
        </p>
      </section>

      {/* Requirements */}
      <section className="space-y-2 mt-2">
        <h2 className="font-medium text-lg mb-0">Requirements</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.requirements}
        </p>
      </section>

      {/* Responsibilities */}
      <section className="space-y-2 mt-2">
        <h2 className="font-medium text-lg mb-0">Responsibilities</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.responsibilities}
        </p>
      </section>
    </div>
  );
}
