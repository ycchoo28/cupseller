import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadProduct = async (productData, imageFiles) => {
  const productCollection = collection(db, "product");

  try {
    // Upload image to Firebase Storage
    const imagesUrl = await uploadImages(imageFiles);

    // Add the image URLs to the productData
    productData.images = imagesUrl;

    const newProductItemRef = await addDoc(productCollection, productData);
    console.log(`Product item added with ID: ${newProductItemRef.id}`);
  } catch (error) {
    console.error("Error adding product item:", error.message);
    throw new Error("Error adding product item to the database");
  }
};

export const getAllProducts = async () => {
  const productCollection = collection(db, "product"); // Updated collection name to "product"

  try {
    const querySnapshot = await getDocs(productCollection);
    const productItems = [];

    querySnapshot.forEach((doc) => {
      productItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return productItems;
  } catch (error) {
    console.error("Error fetching product items:", error.message);
    throw new Error("Error fetching product items from the database");
  }
};

export const uploadImages = async (imageFiles) => {
  try {
    const timestamp = new Date().getTime();
    const imageUrls = [];

    for (const imageFile of imageFiles) {
      const imageName = `product_images/${timestamp}_${imageFile.name}`;

      // Upload each image to Firebase Storage with a unique name
      const storageRef = ref(storage, imageName);
      const snapshot = await uploadBytes(storageRef, imageFile);

      // Get download URL of the uploaded image
      const imageUrl = await getDownloadURL(snapshot.ref);
      imageUrls.push(imageUrl);
    }

    console.log('Images added with URLs:', imageUrls);
    return imageUrls;
  } catch (error) {
    console.error('Error adding images:', error.message);
    throw new Error('Error adding images to the database');
  }
};
