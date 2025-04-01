import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product } from "../types/product";
import EnhancedImageViewing from "react-native-image-viewing";
import { FontAwesome } from "@expo/vector-icons";
import { store } from "@/store/store";
import { addToCart } from "@/store/checkoutSlice";

export default function ProductDetailsScreen() {
  const { product } = useLocalSearchParams();
  const parsedProduct: Product = product ? JSON.parse(product as string) : null;
  const router = useRouter();

  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!parsedProduct) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  const handleBuy = () => {
    setLoading(true)
    store.dispatch(addToCart(parsedProduct))
    setTimeout(() => setLoading(false), 3000)
    // router.back(); // Volta para a tela anterior após a "compra"
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'black', paddingVertical: 10, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={() => router.dismiss()}>
            <FontAwesome name="chevron-circle-left" size={24} color={'white'} />
        </TouchableOpacity>
        <Text style={{color:'white', fontWeight: 'bold', fontSize: 16}}>{parsedProduct.nome}</Text>
        <FontAwesome name="arrow-left" size={28} color={'transparent'} />
      </View>
      <TouchableOpacity onPress={() => setImageModal(true)}>
        <Image
        source={{ uri: parsedProduct.imagem }}
        style={styles.image}
        resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.details}>
        <Text style={styles.name}>{parsedProduct.nome}</Text>
        <Text style={styles.description}>{parsedProduct.descricao}</Text>
        <Text style={styles.price}>R$ {parsedProduct.preco.toFixed(2)}</Text>
        {/* <Text style={styles.info}>Quantidade: {parsedProduct.quantidade}</Text>
        <Text style={styles.info}>Categoria: {parsedProduct.categoria}</Text>
        <Text style={styles.info}>
          Data de Cadastro: {new Date(parsedProduct.dataCadastro).toLocaleDateString()}
        </Text>
        <Text style={styles.info}>ID: {parsedProduct.id}</Text> */}
      </View>
    </ScrollView>
    <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        {  loading ?
        <ActivityIndicator color={'#ccc'}/>
        :
        <Text style={styles.buyButtonText}>Adicionar ao carrinho</Text>
        }
    </TouchableOpacity>

    <EnhancedImageViewing
        imageIndex={0}
        visible={imageModal}
        images={[{uri: parsedProduct.imagem}]}
        onRequestClose={() => setImageModal(false)}
        doubleTapToZoomEnabled
    />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white'
  },
  details: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  buyButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    margin: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});