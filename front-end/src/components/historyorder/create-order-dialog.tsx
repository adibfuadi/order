import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CreateOrderForm from "./create-order-form";

const OrderCreate = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            New Order
          </Button>
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogContent className="max-h-auto sm:max-w-lg dark:border-[1px]">
          {/* <CreateTaskForm projectId={props.projectId} onClose={onClose} /> */}
          <CreateOrderForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderCreate;
