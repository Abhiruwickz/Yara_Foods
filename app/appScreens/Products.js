import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { Real_time_database } from '../../firebaseConfig';
import { router } from 'expo-router';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(Real_time_database, 'products');

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProducts(productList);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });

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
    <ScrollView>
      <View className="flex-1 p-4 mt-8">
        <View className="flex flex-row justify-between items-center mb-5">
          <Text className="text-2xl font-bold">Products</Text>
          <TouchableOpacity onPress={() => router.navigate("../(tabs)/AddProduct")}>
            <Image source={require('../../assets/images/plus.png')} className="w-[24px] h-[24px]" />
          </TouchableOpacity>
        </View>
        {products.map(item => (
          <View key={item.id} className="mb-4 p-4 border border-gray-800 rounded-xl bg-slate-100 flex-row justify-between">
            <View>
              <Text className="font-semibold">Product Name: {item.productName}</Text>
              <Text className="font-semibold">Batch No: {item.batchNo}</Text>
              <Text className="font-semibold">Product Size: {item.productSize}</Text>
              <Text className="font-semibold">Date: {item.date}</Text>
              <Text className="font-semibold">Quantity: {item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push({ pathname: "../appScreens/EditProduct", params: item })}>
              <Image source={require('../../assets/images/edit.png')} className="w-[24px] h-[24px]" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Products;
