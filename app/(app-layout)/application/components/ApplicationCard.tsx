import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toIdr } from "@/src/helper/currency";
import { VacancyActiveResponse } from "@/src/types/modules/vacancy/active/list/reponse";
import { format } from "date-fns";

type ApplicationCardProps = {
  item: VacancyActiveResponse;
};

export default function ApplicationCard({ item }: ApplicationCardProps) {
  return (
    <Card
      key={item.id}
      className="hover:shadow-md transition flex column justify-between"
    >
      <CardHeader>
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {item.departmentName} • {item.positionName}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-sm">
          <span className="font-medium">Salary:</span> {toIdr(item.salaryMin)} –{" "}
          {toIdr(item.salaryMax)}
        </div>

        <div className="text-sm">
          <span className="font-medium">Period:</span>
          <br />
          {format(new Date(item.startDate), "dd MMM yyyy")} –{" "}
          {format(new Date(item.endDate), "dd MMM yyyy")}
        </div>

        <Button variant="outline" className="w-full mt-4">
          View Detail
        </Button>
      </CardContent>
    </Card>
  );
}
