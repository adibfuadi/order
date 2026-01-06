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
import { Loader } from "lucide-react";

export default function CreateProductForm(props: { onClose: () => void }) {
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
  return (
    <div className="h-auto w-full max-w-full">
      <div className="h-full">
        <div className="mb-5 border-b pb-2">
          <h1 className="mb-1 text-center text-xl font-semibold tracking-[-0.16px] sm:text-left dark:text-[#fcfdffef]">
            Create Product
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Organize and manage product, resources
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full gap-3">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type here..."
                          className="!h-[48px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Type here..."
                          className="!h-[48px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm dark:text-[#f1f7feb5]">
                      Stock
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type stock..."
                        className="!h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant={"outline"} onClick={props.onClose} type="button">
                Cancel
              </Button>
              <Button
                disabled={isPending}
                className="flex h-[40px]"
                type="submit"
              >
                {isPending && <Loader className="animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
