import React from "react";
import { ImCross } from "react-icons/im";
import { useCart } from "../../zustand/cart";

const ItemCard = ({ item }) => {

  const { deleteItem, decreaseQuantity, increaseQuantity } = useCart((state) => ({
    deleteItem: state.deleteItem,
    decreaseQuantity: state.decreaseQuantity,
    increaseQuantity: state.increaseQuantity,
  }));

  console.log('itememememem', item);


  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2 px-6">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => deleteItem(item._id)}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.images[0]} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.productName}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-0 mdl:px-0 gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold md:pr-6">
          {item.variety}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => decreaseQuantity({ _id: item._id })}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={() => increaseQuantity({ _id: item._id })}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="flex w-1/3 items-center text-lg font-semibold justify-center md:justify-start">
          ${item.price}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
