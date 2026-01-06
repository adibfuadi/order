import { FC, useState } from "react";
import { getColumns } from "./table/column";
import { DataTable } from "./table/table";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
// import { DataTableFacetedFilter } from "./table/table-faceted-filter";
import { useQuery } from "@tanstack/react-query";
import { getAllOrderQueryFn } from "@/lib/api";
import type { OrderType } from "@/types/api.type";

const ProductTable = () => {
  const param = useParams();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = getColumns();

  const { data, isLoading } = useQuery({
    queryKey: ["all-order", pageSize, pageNumber],
    queryFn: () =>
      getAllOrderQueryFn({
        pageNumber,
        pageSize,
      }),
    staleTime: 0,
  });

  const order: OrderType[] = data?.order || [];
  const totalCount = data?.pagination.totalCount || 0;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  // Handle page size changes
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  return (
    <div className="w-full relative">
      <DataTable
        isLoading={isLoading}
        data={order}
        columns={columns}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
      />
    </div>
  );
};

export default ProductTable;
