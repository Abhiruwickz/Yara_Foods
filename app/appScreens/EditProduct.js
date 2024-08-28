import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { ref, update, remove } from 'firebase/database';
import { Real_time_database } from '../../firebaseConfig';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EditProduct = () => {
  const { id, productName, batchNo, productSize, date, quantity } = useLocalSearchParams();
  const router = useRouter();

  const [updatedProductName, setUpdatedProductName] = useState(productName);
  const [updatedBatchNo, setUpdatedBatchNo] = useState(batchNo);
  const [updatedProductSize, setUpdatedProductSize] = useState(productSize);
  const [updatedDate, setUpdatedDate] = useState(date);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

  const handleSave = () => {
    const productRef = ref(Real_time_database, `products/${id}`);

    update(productRef, {
      productName: updatedProductName,
      batchNo: updatedBatchNo,
      productSize: updatedProductSize,
      date: updatedDate,
      quantity: updatedQuantity,
    })
    .then(() => {
      router.back(); // Navigate back after saving
    })
    .catch((error) => {
      console.error('Error updating product:', error);
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const productRef = ref(Real_time_database, `products/${id}`);
            remove(productRef)
              .then(() => {
                router.back(); // Navigate back after deleting
              })
              .catch((error) => {
                console.error('Error deleting product:', error);
              });
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 p-4 bg-white ">
      <View className="mt-20">
      <Text className="text-2xl font-bold mb-4 text-center">Edit Product</Text>
      <TextInput
        value={updatedProductName}
        onChangeText={setUpdatedProductName}
        placeholder="Product Name"
        className="border border-gray-300 p-2 rounded mt-4"
      />
      <TextInput
        value={updatedBatchNo}
        onChangeText={setUpdatedBatchNo}
        placeholder="Batch No"
        className="border border-gray-300 p-2 rounded mt-4"
      />
      <TextInput
        value={updatedDate}
        onChangeText={setUpdatedDate}
        placeholder="Date"
        className="border border-gray-300 p-2 rounded mt-4"
      />
      <TextInput
        value={updatedQuantity}
        onChangeText={setUpdatedQuantity}
        placeholder="Quantity"
        keyboardType="numeric"
        className="border border-gray-300 p-2 rounded mt-4"
      />
     
      <View className="mt-10 flex flex-row ">
        <TouchableOpacity   
        className="bg-blue-400 rounded-lg p-3 w-36 text-center mr-7 ml-2"
        onPress={handleSave} >
            <Text className="text-white text-center font-semibold"> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity   
        className="bg-red-600 rounded-lg p-3 w-36 text-center "
        onPress={handleDelete} >
            <Text className="text-white text-center font-semibold"> Delete </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default EditProduct;
