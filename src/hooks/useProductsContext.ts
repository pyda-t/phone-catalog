import { useContext } from "react";
import { ProductsContext } from "../context/ProductsProvider";

export const useProductsContext = () => useContext(ProductsContext);