import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Image } from 'react-native';
import { ref, onValue } from "firebase/database"; // Import necessary functions
import { Real_time_database } from "../../firebaseConfig"; // Import your configured database
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

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
    <View className="flex-1 p-4 mt-8">
      <View className="flex flex-row gap-60 ">
        <Text className="text-2xl font-bold mb-5">Products</Text>
        <TouchableOpacity onPress={() => router.navigate("../(tabs)/AddProduct")}>
        <Image source={require("../../assets/images/plus.png")} className="w-[24px] h-[24px]" />
        </TouchableOpacity>
        </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 border border-gray-800 rounded-xl bg-slate-100">
            <Text className="font-semibold">Product Name: {item.productName}</Text>
            <Text className="font-semibold">Batch No: {item.batchNo}</Text>
            <Text className="font-semibold">Product Size: {item.productSize}</Text>
            <Text className="font-semibold">Date: {item.date}</Text>
            <Text className="font-semibold">Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Products;
