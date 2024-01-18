import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const item = props.item;
  console.log('itememe', item);
  const _id = item.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props.item;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % item.images.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + item.images.length) % item.images.length;
    setCurrentImageIndex(prevIndex);
  };
  return (
    <div onClick={handleProductDetails} className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={item.img} />
        </div>
        {/* <div>
          <Image className="w-full h-full" imgSrc={item.images[currentImageIndex]} />
        </div> */}
        <div className="absolute top-6 left-8">
          {item.badge && <Badge text="New" />}
        </div>
        <div className="absolute top-6 right-8">
          {/* Add navigation arrows */}
          <button onClick={handlePrevImage}>
            <GiReturnArrow />
          </button>
          <button onClick={handleNextImage}>
            <GiReturnArrow />
          </button>
        </div>
        {/* <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: item._id,
                    name: item.productName,
                    quantity: 1,
                    image: item.img,
                    badge: item.badge,
                    price: item.price,
                    colors: item.color,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div> */}
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {item.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${item.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{item.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
