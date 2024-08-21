import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity,ScrollView } from 'react-native';
import { Link, router } from "expo-router";
import { ref, push } from "firebase/database"; // Import necessary functions
import { Real_time_database } from "../../firebaseConfig"; // Import your configured database



const AddProductForm = () => {
  const [form, setForm] = useState({
    productName: '',
    batchNo: '',
    productSize: '',
    date: '',
    quantity: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.productName) newErrors.productName = 'Product Name is required';
    if (!form.batchNo) newErrors.batchNo = 'Batch No is required';
    if (!form.productSize) newErrors.receiver = 'Receiver is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.quantity) newErrors.quantity = 'Quantity is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Push the product data to Firebase Realtime Database
    const productsRef = ref(Real_time_database, 'products');
    push(productsRef, form)
      .then(() => {
        console.log("Product added successfully");
        alert("Product added successfully");
        // Reset form
        setForm({
          productName: '',
          batchNo: '',
          productSize: '',
          date: '',
          quantity: '',
        });
      })
      .catch((error) => {
        console.error("Error adding product: ", error);
        alert("Failed to add product. Please try again.");
      });
  };

  return (
    <ScrollView>
    <View className="flex-1 p-7 mt-16">
      <View className="flex flex-row space-x-5">
        <TouchableOpacity className="bg-yellow-500">
          <Text className="text-2xl font-bold">Product</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Link href={"../../components/DispatchAdd"}>
          <Text className="text-2xl font-bold">Dispatch</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <View className="mb-4">
        <Text>Product Name</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded"
          value={form.productName}
          onChangeText={(text) => handleChange('productName', text)}
        />
        {errors.productName && <Text className="text-red-500 text-xs">{errors.productName}</Text>}
      </View>

      <View className="mb-4">
        <Text>Batch No:</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded"
          value={form.batchNo}
          onChangeText={(text) => handleChange('batchNo', text)}
        />
        {errors.batchNo && <Text className="text-red-500 text-xs">{errors.batchNo}</Text>}
      </View>

      <View className="mb-4">
        <Text>Product Size</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded"
          value={form.productSize}
          onChangeText={(text) => handleChange('productSize', text)}
        />
        {errors.productSize && <Text className="text-red-500 text-xs">{errors.receiver}</Text>}
      </View>

      <View className="mb-4">
        <Text>Date</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded"
          value={form.date}
          onChangeText={(text) => handleChange('date', text)}
          placeholder="YYYY-MM-DD"
        />
        {errors.date && <Text className="text-red-500 text-xs">{errors.date}</Text>}
      </View>

      <View className="mb-4">
        <Text>Quantity</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded"
          value={form.quantity}
          keyboardType="numeric"
          onChangeText={(text) => handleChange('quantity', text)}
        />
        {errors.quantity && <Text className="text-red-500 text-xs">{errors.quantity}</Text>}
      </View>

      <TouchableOpacity className="bg-yellow-500 rounded p-3 w-40 text-center ml-20 mt-5" title="Submit" onPress={handleSubmit}>
        <Text className="text-white text-center font-semibold">Add Product</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default AddProductForm;
