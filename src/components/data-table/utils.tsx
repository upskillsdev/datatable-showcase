import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from '@heroui/react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Pin, PinOff } from 'lucide-react';

import { DateCell } from './data-table/date-cell';
import { Employee } from './types';

export type EmployeeColumnDef = ColumnDef<Employee>;

type GetColumnsOptions = {
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
};


export const formatDate = (date?: string) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

export const formatNumber = (num: number, currency?: string) => {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
    currency: currency,
    style: currency ? 'currency' : undefined,
  }).format(num);
};

const isDateBetween = (
  row: Row<Employee>,
  columnId: keyof Employee,
  filterValue: string[]
) => {
  const startFilterDate = filterValue?.[0];
  const endFilterDate = filterValue?.[1];
  const currentDate = row.original[columnId] as string | undefined;

  if (!currentDate) return false;

  const isBetween =
    currentDate >= startFilterDate && currentDate <= endFilterDate;
  return isBetween;
};

export const getColumns = ({
  enableRowSelection,
  enableMultiRowSelection,
}: GetColumnsOptions) => {
  const columns: EmployeeColumnDef[] = [
    {
      id: 'pin',
      header: 'Pin',
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      enableColumnFilter: false,
      size: 50,
      cell: ({ row }) => {
        if (row.getIsPinned()) {
          return (
            <Button
              isIconOnly
              variant="light"
              color="primary"
              size="sm"
              aria-label='"Unpin row"'
              onPress={() => row.pin(false, false, false)}
            >
              <PinOff size={16} />
            </Button>
          );
        }

        return (
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                isDisabled={!row.getCanPin()}
              >
                <Pin aria-label="Pin row" size={16} className="text-muted" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Pin rows">
              <>
                <DropdownItem
                  key="pin-top"
                  onPress={() => row.pin('top', false, false)}
                >
                  Pin to top
                </DropdownItem>
                <DropdownItem
                  key="pin-bottom"
                  onPress={() => row.pin('bottom', false, false)}
                >
                  Pin to bottom
                </DropdownItem>
              </>
            </DropdownMenu>
          </Dropdown>
        );
      },
    },
    {
      id: 'select',
      header: ({ table }) => {
        if (!enableMultiRowSelection) return null;
        return (
          <Checkbox
            isDisabled={!enableRowSelection}
            isIndeterminate={table.getIsSomePageRowsSelected()}
            isSelected={table.getIsAllPageRowsSelected()}
            onValueChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        );
      },
      meta: {
        headerText: 'Select rows',
      },
      cell: ({ row }) => (
        <Checkbox
          isDisabled={!enableRowSelection}
          isSelected={row.getIsSelected()}
          onValueChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      enableColumnFilter: false,
      size: 50,
    },
    {
      id: 'id',
      accessorKey: 'id',
      header: 'Employee ID',
      size: 120,
      meta: {
        filterControlType: 'input',
      },
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      size: 200,
      meta: {
        filterControlType: 'input',
      },
      cell({ cell }) {
        return (
          <div className="flex items-center overflow-auto p-1">
            <User
              avatarProps={{
                src: `https://i.pravatar.cc/150?u=${cell.id}`,
                size: 'sm',
                isBordered: true,
                disableAnimation: true,
              }}
              name={cell.getValue<string>()}
            />
          </div>
        );
      },
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      size: 200,
      meta: {
        filterControlType: 'input',
      },
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Role',
      meta: {
        filterControlType: 'input',
      },
    },
    {
      id: 'country',
      accessorKey: 'country',
      header: 'Country',
      meta: {
        filterControlType: 'input',
      },
    },
    {
      id: 'annualSalary',
      accessorKey: 'annualSalary',
      header: 'Annual Salary',
      cell(props) {
        return formatNumber(Number(props.getValue()) as number, 'USD');
      },
      meta: {
        filterControlType: 'range',
      },
    },
    {
      id: 'dateOfJoining',
      accessorKey: 'dateOfJoining',
      header: 'Date of Joining',
      cell(props) {
        return <DateCell {...props} />;
      },
      meta: {
        filterControlType: 'date',
      },
      filterFn: (row, columnId, filterValue) => {
        return isDateBetween(row, columnId as keyof Employee, filterValue);
      },
    },
    {
      id: 'hireType',
      accessorKey: 'hireType',
      header: 'Hire Type',
      size: 120,
      meta: {
        filterControlType: 'select',
        filterControlOptions: [
          { value: 'Direct', label: 'Direct' },
          { value: 'Agency', label: 'Agency' },
        ],
      },
    },
    {
      id: 'contractType',
      accessorKey: 'contractType',
      header: 'Contract Type',
      size: 150,
      meta: {
        filterControlType: 'select',
        filterControlOptions: [
          { value: 'permanent', label: 'Permanent' },
          { value: 'contract', label: 'Contract' },
        ],
      },
    },
    {
      id: 'contractEndDate',
      accessorKey: 'contractEndDate',
      header: 'Contract End Date',
      cell(props) {
        return <DateCell {...props} />;
      },
      meta: {
        filterControlType: 'date',
      },
      filterFn: (row, columnId, filterValue) => {
        return isDateBetween(row, columnId as keyof Employee, filterValue);
      },
    },
    {
      id: 'probationEndDate',
      accessorKey: 'probationEndDate',
      header: 'Probation End Date',
      cell(props) {
        return <DateCell {...props} />;
      },
      meta: {
        filterControlType: 'date',
      },
      filterFn: (row, columnId, filterValue) => {
        return isDateBetween(row, columnId as keyof Employee, filterValue);
      },
    },
    {
      id: 'manager.name',
      accessorKey: 'manager.name',
      header: 'Manager Name',
      meta: {
        filterControlType: 'input',
      },
    },
  ];

  return columns;
};
