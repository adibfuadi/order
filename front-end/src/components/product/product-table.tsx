import { FC, useState } from "react";
import { getColumns } from "./table/column";
import { DataTable } from "./table/table";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
// import { DataTableFacetedFilter } from "./table/table-faceted-filter";
import useTaskTableFilter from "@/hooks/use-task-table-filter";
import { useQuery } from "@tanstack/react-query";
import { getAllProductQueryFn } from "@/lib/api";
import type { ProductType } from "@/types/api.type";

type Filters = ReturnType<typeof useTaskTableFilter>[0];
type SetFilters = ReturnType<typeof useTaskTableFilter>[1];

interface DataTableFilterToolbarProps {
  isLoading?: boolean;
  projectId?: string;
  filters: Filters;
  setFilters: SetFilters;
}

const ProductTable = () => {
  const param = useParams();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useTaskTableFilter();
  const columns = getColumns();

  const { data, isLoading } = useQuery({
    queryKey: ["all-product", pageSize, pageNumber, filters],
    queryFn: () =>
      getAllProductQueryFn({
        keyword: filters.keyword,
        pageNumber,
        pageSize,
      }),
    staleTime: 0,
  });

  const product: ProductType[] = data?.product || [];
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
        data={product}
        columns={columns}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
        filtersToolbar={
          <DataTableFilterToolbar
            isLoading={isLoading}
            filters={filters}
            setFilters={setFilters}
          />
        }
      />
    </div>
  );
};

const DataTableFilterToolbar: FC<DataTableFilterToolbarProps> = ({
  filters,
  setFilters,
}) => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-start space-y-2 mb-2 lg:mb-0 lg:space-x-2  lg:space-y-0">
      <Input
        placeholder="Filter tasks..."
        value={filters.keyword || ""}
        onChange={(e) =>
          setFilters({
            keyword: e.target.value,
          })
        }
        className="h-8 w-full lg:w-[250px]"
      />
    </div>
  );
};

export default ProductTable;
