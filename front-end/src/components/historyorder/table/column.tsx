/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import type { OrderType } from "@/types/api.type";
import DataTableRowActions from "./table-row-actions";

export const getColumns = (): ColumnDef<OrderType>[] => {
  const columns: ColumnDef<OrderType>[] = [
    {
      id: "_id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ??
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm lg:max-w-[100px]">{row.original._id}</span>
        );
      },
    },
    {
      accessorKey: "TotalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Amount" />
      ),
      cell: ({ row }) => {
        return (
          <span className="text-sm lg:max-w-[100px]">
            {row.original.totalAmount}
          </span>
        );
      },
    },
  ];

  return columns;
};
