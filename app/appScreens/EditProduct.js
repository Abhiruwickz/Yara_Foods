import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Edit Product</Text>
      <TextInput
        value={updatedProductName}
        onChangeText={setUpdatedProductName}
        placeholder="Product Name"
        className="border p-2 mb-4"
      />
      <TextInput
        value={updatedBatchNo}
        onChangeText={setUpdatedBatchNo}
        placeholder="Batch No"
        className="border p-2 mb-4"
      />
      <TextInput
        value={updatedProductSize}
        onChangeText={setUpdatedProductSize}
        placeholder="Product Size"
        className="border p-2 mb-4"
      />
      <TextInput
        value={updatedDate}
        onChangeText={setUpdatedDate}
        placeholder="Date"
        className="border p-2 mb-4"
      />
      <TextInput
        value={updatedQuantity}
        onChangeText={setUpdatedQuantity}
        placeholder="Quantity"
        keyboardType="numeric"
        className="border p-2 mb-4"
      />
      <Button title="Save" onPress={handleSave} />
      <View className="mt-4">
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

export default EditProduct;
