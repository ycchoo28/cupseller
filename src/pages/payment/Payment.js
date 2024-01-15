import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useCart } from "../../zustand/cart";

const Payment = () => {
  const { shoppingCart } = useCart((state) => ({
    shoppingCart: state.shoppingCart,
  }));

  const generateWhatsAppLink = (products) => {
    const total = shoppingCart.reduce(
      (accumulator, product) =>
        accumulator + parseInt(product.price.slice(1)) * product.quantity,
      0
    );
    const message = products
      .map(
        (product) =>
          `  ${product.productName}\n    - Quantity: ${product.quantity}\n    - SKU: ${product.sku}\n    - Price: ${product.price}`
      )
      .join("\n\n");
    const text = `Client Name: Zangzang\nAddress: Konichiwa\n\nProducts:\n${message}\n\nTotal Price: $${total}`;
    const phoneNumber = "+60174849113"; // Your WhatsApp business number
    return `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(text)}`;
  };

  const handleSendToWhatsApp = () => {
    const whatsappLink = generateWhatsAppLink(shoppingCart);
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div>
        <h2>Your Shopping Cart</h2>
        <ul>
          {shoppingCart.map((product) => (
            <li key={product.sku}>
              {product.productName} - {product.price}
            </li>
          ))}
        </ul>
        <button onClick={handleSendToWhatsApp}>Send to WhatsApp</button>
      </div>
    </div>
  );
};

export default Payment;
