import { getAllProductOrderQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetProductOrder = () => {
  const query = useQuery({
    queryKey: ["all-product-order"],
    queryFn: () => getAllProductOrderQueryFn(),
    staleTime: Infinity,
  });
  return query;
};

export default useGetProductOrder;
