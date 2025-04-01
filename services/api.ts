// import axios from "axios";
import { Product } from "@/types/product";
import products from "../db.json";

// const api = axios.create({
//   baseURL: "http://localhost:3000", // URL do JSON Server
// });

export const fetchProducts = async (page: number, limit: number): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products.products);
        }, 5000)
    })
};