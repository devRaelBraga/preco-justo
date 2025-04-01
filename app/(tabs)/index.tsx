import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import ProductList from "../../components/ProductList";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        
        <FontAwesome name="500px" size={28} color={'transparent'}/>
        <Text style={styles.title}>Smartphones</Text>

        <TouchableOpacity onPress={() => router.push('/checkout/checkout')}>
          <FontAwesome name="shopping-cart" size={28}/>
        </TouchableOpacity>
      </View>
      <ProductList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
});