import { create } from "zustand";

export const useProduct = create((set, get) => ({
  selectedCategory: null,
  setCategory: (category) => {
    try {
      set(() => ({ selectedCategory: null }));
      set(() => ({ selectedCategory: category }));
    } catch (error) {
      console.log("setcategory error", error);
    }
  },
  products: [],
  setProducts: products => {
  	try {
  		set(() => ({ products: products }));
  	} catch (error) {
  		console.log('setProducts error', error);
  	}
  },
}));
