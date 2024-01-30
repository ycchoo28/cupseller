import React, { useEffect, useState } from "react";
import { useCart } from "../../../zustand/cart";

const ProductInfo = ({ productInfo }) => {
  const addToCart = useCart((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariety, setSelectedVariety] = useState("");

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

  const handleVarietySelect = (varietyOption) => {
    setSelectedVariety(varietyOption);
  };

  const handleAddToCart = () => {
    const product = {
      ...productInfo, // Include all fields from productInfo
      quantity: quantity, // Add the quantity separately
      selectedVariety: selectedVariety,
    };
    addToCart(product);
  };

  console.log("palapapapa", productInfo);

  if (!productInfo.variety) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>

      {/* Buttons for Variety selection */}
      <div className="font-medium text-lg">
        <span className="font-normal">Variety:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {productInfo.variety.map((varietyOption, index) => (
          <button
            key={index}
            onClick={() => handleVarietySelect(varietyOption)}
            className={`bg-gray-300 px-3 py-2 rounded border ${
              selectedVariety === varietyOption
                ? "border-black border-2"
                : "border-gray-300"
            }`}
          >
            {varietyOption}
          </button>
        ))}
      </div>

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
        <span className="text-base font-medium"> Categories:</span>{" "}
        {productInfo.category}
      </p>
    </div>
  );
};

export default ProductInfo;
