import type { Row } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProductType } from "@/types/api.type";
import { useState } from "react";
import EditProductDialog from "../edit-product-dialog";
import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import { deleteProductMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface DataTableRowActionsProps {
  row: Row<ProductType>;
}
export default function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [openDeleteDialog, setOpenDialog] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProductMutationFn,
  });

  const product = row.original;
  const productId = product._id as string;
  const productName = product.name as string;

  const handleConfirm = () => {
    mutate(
      { productId },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["all-product"],
          });
          toast({
            title: "Success",
            description: data.message,
            variant: "success",
          });
          setTimeout(() => setOpenDialog(false), 100);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  // const handleEdit = (studentId: string) => {
  //   router.push(`/students/${studentId}`);
  // };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* Edit Task Option */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenEditDialog(true)}
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit Product
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Delete Task Option */}
          <DropdownMenuItem
            className="!text-destructive cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            Delete Product
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductDialog
        product={product}
        isOpen={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      />

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={isPending}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        title="Delete Task"
        description={`Are you sure you want to delete ${productName}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
