import { create } from "zustand";

export const useCart = create((set, get) => ({
  userInformation: [],
  shoppingCart: [],

  initializeCart: () => {
    // Check if there's any cart data in localStorage
    const storedCart = JSON.parse(localStorage.getItem("shoppingCart"));

    if (storedCart) {
      set({ shoppingCart: storedCart });
    }
  },

  addToCart: (product) => {
    const existingProduct = get().shoppingCart.find(
      (item) => item._id === product._id
    );
    if (existingProduct !== undefined) {
      set((state) => ({
        shoppingCart: state.shoppingCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        ),
      }));
    } else {
      set((state) => ({ shoppingCart: [...state.shoppingCart, product] }));
    }

    // Save the updated cart to localStorage
    localStorage.setItem("shoppingCart", JSON.stringify(get().shoppingCart));
  },
  increaseQuantity: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));

    localStorage.setItem("shoppingCart", JSON.stringify(get().shoppingCart));
  },

  increaseQuantity: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));

    localStorage.setItem("shoppingCart", JSON.stringify(get().shoppingCart));
  },

  decreaseQuantity: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item._id === product._id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));

    localStorage.setItem("shoppingCart", JSON.stringify(get().shoppingCart));
  },

  deleteItem: (productId) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.filter((item) => item._id !== productId),
    }));

    localStorage.setItem("shoppingCart", JSON.stringify(get().shoppingCart));
  },

  resetCart: () => {
    set({ shoppingCart: [] });
    localStorage.setItem("shoppingCart", JSON.stringify(get().shoppingCart));
  },
}));
