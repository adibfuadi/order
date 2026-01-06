import ProductCreate from "@/components/product/create-product-dialog";
import ProductTable from "@/components/product/product-table";
import { Card, CardContent } from "@/components/ui/card";
// import TaskTable from "@/components/workspace/task/task-table";

export default function Product() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Product</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of product!
          </p>
        </div>
        <ProductCreate />
      </div>
      {/* {Task Table} */}
      <div>
        <Card className="shadow-none w-full">
          {/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="mb-[0.2px]">{getArrowIcon()}</div>
        </div>
        <Activity
          strokeWidth={2.5}
          className="h-4 w-4  text-muted-foreground"
        />
      </CardHeader> */}
          <CardContent className="w-full pt-6">
            <ProductTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
