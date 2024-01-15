import { create } from 'zustand';

export const useProduct = create((set, get) => ({
	selectedCategory: null,
	setCategory: category => {
		try {
			set(() => ({ selectedCategory: category }));
		} catch (error) {
			console.log('setcategory error', error);
		}
	},
    // coffeeList: [],
	// setCoffeeList: coffeeList => {
	// 	try {
	// 		set(() => ({ coffeeList }));
	// 	} catch (error) {
	// 		console.log('setCoffeeList error', error);
	// 	}
	// },
}));