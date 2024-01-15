import React, { useEffect, useState } from "react";
import { useCart } from "../../../zustand/cart";

const ProductInfo = ({ productInfo }) => {
  const addToCart = useCart((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const inputQuantity = parseInt(e.target.value, 10) || 1;
    setQuantity(inputQuantity);
  };

  const handleAddToCart = () => {
    const product = {
      ...productInfo, // Include all fields from productInfo
      quantity: quantity, // Add the quantity separately
    };
    addToCart(product);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      {/* Quantity input with plus and minus buttons */}
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="bg-gray-300 px-3 py-2 rounded-l"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="mx-2 p-2 border border-gray-400 text-center w-16"
        />
        <button
          onClick={handleIncrement}
          className="bg-gray-300 px-3 py-2 rounded-r"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
