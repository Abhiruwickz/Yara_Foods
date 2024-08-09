import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ref, onValue } from "firebase/database"; // Import necessary functions
import { Real_time_database } from "../../firebaseConfig"; // Import your configured database

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(Real_time_database, 'products');
    
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the products data from an object to an array
        const productList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProducts(productList);
      } else {
        setProducts([]); // In case there are no products
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No products available.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 mt-20">
        <Text className="text-2xl font-bold mb-5">Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 border border-gray-300 rounded">
            <Text className="font-semibold">Product Name: {item.productName}</Text>
            <Text>Batch No: {item.batchNo}</Text>
            <Text>Product Size: {item.productSize}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Products;
