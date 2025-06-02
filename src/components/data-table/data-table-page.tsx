import { DataTable } from "./data-table/data-table";
import mockEmployees from "./mock-data";
import { getColumns } from "./utils";

export const DataTablePage = () => {
  const columns = getColumns({
    enableRowSelection: true,
    enableMultiRowSelection: true,
  });

  return (
    <DataTable
      data={mockEmployees}
      columns={columns}
      enableRowPinning
      enableStickyHeader
      keepPinnedRows
    />
  );
};
