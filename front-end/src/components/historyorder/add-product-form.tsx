import useGetProductOrder from "@/hooks/use-get-product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export default function AddProductForm(props: { onClose: () => void }) {
  const { onClose } = props;

  const { data } = useGetProductOrder();
  const product = data?.product || [];

  const formSchema = z.object({
    productOrder: z.string().trim().min(1, {
      message: "Product is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productOrder: "",
    },
  });

  const productOptions = product?.map((productOrder) => {
    const name = productOrder.name;
    const price = productOrder.price;
    const stock = productOrder.stock;

    return {
      label: (
        <div className="flex items-center space-x-2">
          <span>{name}</span>
          <span>{price}</span>
          <span>{stock}</span>
        </div>
      ),
      value: productOrder._id,
    };
  });

  interface ProductStored {
    id: string;
    name: string;
    price: number;
    stock: number;
    quantity: number;
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedProduct = product.find((p) => p._id === values.productOrder);
    if (!selectedProduct) return;

    const existingProducts = JSON.parse(
      localStorage.getItem("productOrders") || "[]"
    ) as ProductStored[];

    // cek kalau product sudah ada → tambah quantity
    const index = existingProducts.findIndex(
      (p) => p.id === selectedProduct._id
    );
    if (index >= 0) {
      existingProducts[index].quantity += 1;
    } else {
      existingProducts.push({
        id: selectedProduct._id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        quantity: 1,
      });
    }

    localStorage.setItem("productOrders", JSON.stringify(existingProducts));
    console.log("Selected product added to localStorage:", selectedProduct);
    onClose();
  };
  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="productOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div
                        className="w-full max-h-[200px]
                           overflow-y-auto scrollbar
                          "
                      >
                        {productOptions?.map((option) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="flex place-self-end  h-[40px] text-white font-semibold"
            type="submit"
          >
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
