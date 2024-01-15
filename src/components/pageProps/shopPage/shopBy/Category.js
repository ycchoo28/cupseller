import React, { useState, useEffect } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useProduct } from "../../../../zustand/product";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const { selectedCategory, setCategory } = useProduct((state) => ({
    selectedCategory: state.selectedCategory,
    setCategory: state.setCategory,
  }));

  const items = [
    {
      _id: 991,
      title: "All Products",
    },
    {
      _id: 991,
      title: "Cup",
    },
    {
      _id: 991,
      title: "Jumping egg",
    },
    {
      _id: 991,
      title: "Lube",
    },
    // {
    //   _id: 990,
    //   title: "New Arrivals",
    //   icons: true,
    // },
    // {
    //   _id: 991,
    //   title: "Gudgets",
    // },
    // {
    //   _id: 992,
    //   title: "Accessories",
    //   icons: true,
    // },
    // {
    //   _id: 993,
    //   title: "Electronics",
    // },
    // {
    //   _id: 994,
    //   title: "Others",
    // },
  ];
  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => (
            <li
              key={_id}
              className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between ${
                title === selectedCategory
                  ? "font-bold text-lg underline text-black"
                  : title === "All Products" && selectedCategory === null
                  ? "font-bold text-lg underline text-black"
                  : "hover:font-bold text-lg hover:underline hover:text-black"
              } md:border-r-[2px] hoverEffect last:border-r-0`}
              onClick={() => {
                if (title == "All Products") {
                  setCategory(null);
                } else {
                  setCategory(title);
                }
              }}
            >
              {title}
              {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
