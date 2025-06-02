import { DataTablePage } from "@/components/data-table/data-table-page";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="max-h-[70vh] overflow-y-auto">
        <DataTablePage/>
      </div>
    </DefaultLayout>
  );
}
