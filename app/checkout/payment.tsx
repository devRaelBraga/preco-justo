import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Notifications from 'expo-notifications';
import { RootState } from "../../store/store";
import { clearCart } from "../../store/checkoutSlice";
import { useRouter } from "expo-router";
import { generatePixCode } from "@/services/pix";

export default function PaymentScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { totalValue } = useSelector((state: RootState) => state.checkout);
  const [pixCode, setPixCode] = useState('');

  const handleCopyCode = () => {
    Clipboard.setString(pixCode);
    Alert.alert("Sucesso", "Código PIX copiado para a área de transferência!");
  };

  const handleConfirmPayment = () => {
    console.log("Pagamento via PIX confirmado. Código:", pixCode);
    dispatch(clearCart());
    Alert.alert("Pagamento Concluído", "Sua compra foi realizada com sucesso!");
    router.dismissAll();
    sendTestNotification();
  };

  async function sendTestNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Compra confirmada!",
            body: "Sua compra foi confirmada!",
            data: { info: "teste" },
            sound: true
        },
        trigger: null, // Envia após 2 segundos
        });
    }

  useEffect(() => {
    setPixCode(generatePixCode({
        amount: totalValue
    }))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento via PIX</Text>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Valor Total: R$ {totalValue.toFixed(2)}
        </Text>
        <Text style={styles.instruction}>
          Escaneie o código abaixo ou copie o código PIX para realizar o
          pagamento:
        </Text>
        <View style={styles.pixContainer}>
          <Text style={styles.pixCode} selectable>
            {pixCode}
          </Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
            <Text style={styles.copyButtonText}>Copiar Código</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPayment}
      >
        <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  summary: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    textAlign: 'center'
  },
  pixContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  pixCode: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  copyButton: {
    backgroundColor: "#0288d1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  copyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});