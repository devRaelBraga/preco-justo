import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product";

// Tipo para itens no carrinho (produto + quantidade)
interface CartItem {
  product: Product;
  quantity: number;
}

// Estado inicial do carrinho
interface CheckoutState {
  items: CartItem[];
  totalItems: number; // Quantidade total de produtos (soma das quantidades)
  totalValue: number; // Valor total do carrinho
}

const initialState: CheckoutState = {
  items: [],
  totalItems: 0,
  totalValue: 0,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalValue = state.items.reduce(
        (sum, item) => sum + item.product.preco * item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }

        state.totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalValue = state.items.reduce(
          (sum, item) => sum + item.product.preco * item.quantity,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item && quantity >= 0) {
        item.quantity = quantity;

        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.product.id !== productId);
        }

        state.totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        state.totalValue = state.items.reduce(
          (sum, item) => sum + item.product.preco * item.quantity,
          0
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = checkoutSlice.actions;
export default checkoutSlice.reducer;