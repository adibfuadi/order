/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { createProductMutationFn } from "@/lib/api";
import { Loader, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { useEffect, useState } from "react";
import AddProductForm from "./add-product-form";
import axios from "axios";

export default function CreateOrderForm(props: { onClose: () => void }) {
  const { onClose } = props;

  const queryClient = useQueryClient();

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => val > 0, { message: "Price is required" }),
    stock: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => val > 0, { message: "Stock is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProductMutationFn,
  });

  // const { signUp, loading, error } = useAuth();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    const payload = {
      data: {
        ...values,
      },
    };

    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["all-product"],
        });

        toast({
          title: "Success",
          description: "Product created successfully",
          variant: "success",
        });
        onClose();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  interface ProductStored {
    id: string;
    name: string;
    price: number;
    stock: number;
    quantity: number;
  }

  const [isOpen, setIsOpen] = React.useState(false);

  const onCloseProduct = () => {
    setIsOpen(false);
  };

  const [products, setProducts] = useState<ProductStored[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("productOrders") || "[]");
    setProducts(stored);
  }, [isOpen]);

  const handleRemove = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("productOrders", JSON.stringify(updated));
  };

  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (products.length === 0) return;

    setLoading(true);

    try {
      const payload = {
        totalAmount: products.reduce((sum, p) => sum + p.price * p.quantity, 0),
        products: products.map((p) => ({
          productId: p.id,
          price: p.price,
          quantity: p.quantity,
        })),
      };

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/order/create`,
        payload,
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("productOrders");
      setProducts([]);

      toast({
        title: "Success",
        description: "Product created successfully",
        variant: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["all-order"],
      });

      onClose();
    } catch (err: any) {
      console.error(err);
      toast({
        title: "error",
        description: "Product created failed: " + err.message,
        variant: "success",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto w-full max-w-full">
      <div className="h-full">
        <div className="mb-5 border-b pb-2">
          <h1 className="mb-1 text-center text-xl font-semibold tracking-[-0.16px] sm:text-left dark:text-[#fcfdffef]">
            Order Here
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Order your desired products by filling out the form below.
          </p>
        </div>
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
            <AddProductForm onClose={onCloseProduct} />
          </DialogContent>
        </Dialog>
        {/* Table */}
        <div className="mt-5">
          <h2 className="text-lg font-semibold mb-2">Your Selected Products</h2>
          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No products selected yet.
            </p>
          ) : (
            <table className="w-full border border-gray-300 dark:border-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-2 border-b">Name</th>
                  <th className="p-2 border-b">Price</th>
                  <th className="p-2 border-b">Stock</th>
                  <th className="p-2 border-b">Quantity</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="text-center border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">${p.price * p.quantity}</td>
                    <td className="p-2">{p.stock}</td>
                    <td className="p-2">{p.quantity}</td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemove(p.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Button
          className="mt-2"
          onClick={handleOrder}
          disabled={products.length === 0 || loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </Button>{" "}
      </div>
    </div>
  );
}
