import { create } from "zustand";

export const useCart = create((set, get) => ({
  userInformation: [],
  shoppingCart: [],
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
  },
  increaseQuantity: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },
  
  increaseQuantity: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },

  decreaseQuantity: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item._id === product._id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  },  
  
  deleteItem: (productId) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.filter((item) => item._id !== productId),
    }));
  },

  resetCart: () => {
    set({ shoppingCart: [] });
  },
  
}));
