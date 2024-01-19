import React, { useEffect, useState } from "react";
import { uploadImages, uploadProduct } from "../../service/firebase";

const ProductForm = () => {
  // State to track form fields
  const [productData, setProductData] = useState({
    sku: "",
    category: "",
    productName: "",
    price: "",
    variety: [""],
    des: "",
  });

  useEffect(() => {
    console.log('current product', productData);
  }, [productData]);

  const handleAddVariety = () => {
    setProductData({
      ...productData,
      variety: [...productData.variety, ''], // Add a new empty string for a new variety input
    });
  };

  const handleRemoveVariety = (index) => {
    if (index > 0) {
      const updatedVarieties = [...productData.variety];
      updatedVarieties.splice(index, 1);
      setProductData({
        ...productData,
        variety: updatedVarieties,
      });
    }
  };

  const handleVarietyChange = (e, index) => {
    const { name, value } = e.target;
    const updatedVarieties = [...productData.variety];
    updatedVarieties[index] = value;
    setProductData({
      ...productData,
      variety: updatedVarieties,
    });
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("makutamahaha", productData);
      await uploadProduct(productData, imageFiles);
      // await uploadImages(imageFiles);
    } catch (error) {
      console.error("Error adding product item:", error.message);
    }
  };

  const [imageFiles, setImageFiles] = useState(null);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImageFiles(files);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}
    >
      <label style={{ display: "block", marginBottom: "10px" }}>SKU:</label>
      <input
        type="text"
        name="sku"
        value={productData.sku}
        onChange={handleInputChange}
        style={{
          border: "1px solid black",
          padding: "8px",
          borderRadius: "5px",
        }}
      />

      <label style={{ display: "block", marginBottom: "10px" }}>
        Category:
      </label>
      <input
        type="text"
        name="category"
        value={productData.category}
        onChange={handleInputChange}
        style={{
          border: "1px solid black",
          padding: "8px",
          borderRadius: "5px",
        }}
      />

      <label style={{ display: "block", marginBottom: "10px" }}>Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
        style={{ marginLeft: "10px", marginBottom: "10px" }}
      />

      <label style={{ display: "block", marginBottom: "10px" }}>
        Product Name:
      </label>
      <input
        type="text"
        name="productName"
        value={productData.productName}
        onChange={handleInputChange}
        style={{
          border: "1px solid black",
          padding: "8px",
          borderRadius: "5px",
        }}
      />

      <label style={{ display: "block", marginBottom: "10px" }}>Price:</label>
      <input
        type="text"
        name="price"
        value={productData.price}
        onChange={handleInputChange}
        style={{
          border: "1px solid black",
          padding: "8px",
          borderRadius: "5px",
        }}
      />

      {/* doesnt work yet, planning to have + button for adding variety. */}
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Variety:
      </label>
      {productData.variety.map((variety, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name={`variety-${index}`}
            value={variety}
            onChange={(e) => handleVarietyChange(e, index)}
            style={{
              border: '1px solid black',
              padding: '8px',
              borderRadius: '5px',
              marginRight: '5px',
            }}
          />
          {index > 0 && (
            <button type="button" onClick={() => handleRemoveVariety(index)}>
              - Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddVariety}>
        + Add Variety
      </button>

      <label style={{ display: "block", marginBottom: "10px" }}>
        Description:
      </label>
      <textarea
        name="des"
        value={productData.des}
        onChange={handleInputChange}
        style={{
          border: "1px solid black",
          width: "100%",
          border: "1px solid black",
        }}
      />

      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Upload Product
      </button>
    </form>
  );
};

export default ProductForm;
