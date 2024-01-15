import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { useCart } from "../../zustand/cart";

const Cart = () => {
  const { shoppingCart, resetCart } = useCart((state) => ({
    shoppingCart: state.shoppingCart,
    resetCart: state.resetCart,
  }));
  const [totalAmt, setTotalAmt] = useState("");

  useEffect(() => {
    let price = 0;
    shoppingCart.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [shoppingCart]);

  const generateWhatsAppLink = (products) => {
    const message = products
      .map(
        (product) =>
          `  ${product.productName}\n    - Quantity: ${product.quantity}\n    - SKU: ${product.sku}\n    - Price: ${product.price}`
      )
      .join("\n\n");
    const text = `Client Name: Zangzang\nAddress: Konichiwa\n\nProducts:\n${message}\n\nTotal Price: $${totalAmt}`;
    const phoneNumber = "+60174849113"; // Your WhatsApp business number
    return `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(text)}`;
  };

  const handleSendToWhatsApp = () => {
    const whatsappLink = generateWhatsAppLink(shoppingCart);
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {shoppingCart.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {shoppingCart.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => resetCart()}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Remove All
          </button>

          {/* <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <p className="text-sm mdl:text-base font-semibold">
                Apply Coupon
              </p>
            </div>
            <p className="text-lg font-semibold">Update Cart</p>
          </div> */}
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="text-sm font-semibold tracking-wide font-titleFont">
                    Calculated at next step
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                  <button onClick={handleSendToWhatsApp} className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
