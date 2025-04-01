import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../services/api";
import { Product } from "@/types/product";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40) / 2; // Largura do card ajustada para 2 colunas

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const newProducts = await fetchProducts(page, 10); // Limite de 10 por página
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItem product={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Duas colunas
      columnWrapperStyle={styles.columnWrapper}
      onEndReached={loadProducts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? <ActivityIndicator style={{marginVertical: 40}} size="large" color="#ccc" /> : null
      }
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
  },
});