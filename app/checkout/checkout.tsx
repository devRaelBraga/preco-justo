import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearCart, updateQuantity } from "../../store/checkoutSlice";
import { Product } from "../../types/product";
import { router } from "expo-router";

interface CartItemProps {
  item: { product: Product; quantity: number };
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const CartItem = ({ item, onUpdateQuantity }: CartItemProps) => {
  const { product, quantity } = item;
  const subtotal = product.preco * quantity;

  return (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: product.imagem }}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{product.nome}</Text>
        <Text style={styles.itemPrice}>R$ {product.preco.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(product.id, quantity - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(product.id, quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtotal}>Subtotal: R$ {subtotal.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default function CartScreen() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { items, totalItems, totalValue } = useSelector(
    (state: RootState) => state.checkout
  );

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleCheckout = () => {
    console.log("Compra finalizada! Carrinho:", items);
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      router.push('/checkout/payment')
    }, 3000)

    // dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        <TouchableOpacity onPress={() => router.dismiss()} style={{marginTop: 5, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white', borderRadius: 12}}>
          <Text style={styles.emptyText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem item={item} onUpdateQuantity={handleUpdateQuantity} />
        )}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total de itens: {totalItems}
        </Text>
        <Text style={styles.summaryText}>
          Valor total: R$ {totalValue.toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          { loading ?
            <ActivityIndicator color={'#ccc'}/>
            :
            <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
          }
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20
  },
  listContainer: {
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  summary: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    marginTop: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
});