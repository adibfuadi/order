import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ProductType } from "@/types/api.type";
import EditProductForm from "./edit-product-form";

const EditProductDialog = ({
  product,
  isOpen,
  onClose,
}: {
  product: ProductType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog modal={true} open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-auto my-5 border-0">
        <EditProductForm product={product} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
