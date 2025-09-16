import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getProducts";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
