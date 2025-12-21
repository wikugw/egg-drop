import ListHeader from "./components/ListHeader";
import Table from "./components/Table";

export default function VacancyActiveListPage() {
  return (
    <div className="flex flex-col gap-2">
      <ListHeader />
      <Table />
    </div>
  );
}
