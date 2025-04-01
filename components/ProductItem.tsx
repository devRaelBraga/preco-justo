import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Product } from "../types/product";
import { router } from "expo-router";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const handlePress = () => {
    router.push({
      pathname: "/product",
      params: { product: JSON.stringify(product) }
    })
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: product.imagem }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{product.nome}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.descricao}
        </Text>
        <Text style={styles.price}>R$ {product.preco.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 40) / 2; // Largura do card para 2 colunas

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    aspectRatio:1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});