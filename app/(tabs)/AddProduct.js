import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView,Alert } from 'react-native';
import { Link, router } from "expo-router";
import { ref, push } from "firebase/database"; 
import { Real_time_database } from "../../firebaseConfig"; 
import { Picker } from "@react-native-picker/picker";

const AddProductForm = () => {
  const [form, setForm] = useState({
    productName: '',
    batchNo: '',
    productSize: '',
    date: '',
    quantity: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedSize, setSelectedSize] = useState("");

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const { productName, batchNo, productSize, date, quantity } = form;

    if (!productName || !batchNo || !productSize || !date || !quantity) {
      Alert.alert('Error', 'All fields are required');
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
        setSelectedSize("");
      })
      .catch((error) => {
        console.error("Error adding product: ", error);
        alert("Failed to add product. Please try again.");
      });
  };

  return (
    <ScrollView>
      <View className="flex-1 p-7 mt-10">
        <View className="flex flex-row space-x-5 items-center justify-center">
          <TouchableOpacity className="bg-yellow-500">
            <Text className="text-2xl font-bold">Product</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Link href={"../(tabs)/DispatchAdd"}>
              <Text className="text-2xl font-bold">Dispatch</Text>
            </Link>
          </TouchableOpacity>
        </View>

        <View className="mb-4 mt-4">
          <Text>Product Name</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded mt-4"
            value={form.productName}
            onChangeText={(text) => handleChange('productName', text)}
          />
        </View>

        <View className="mb-4">
          <Text>Batch No:</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded-lg mt-4"
            value={form.batchNo}
            onChangeText={(text) => handleChange('batchNo', text)}
          />
        </View>

        <View className="mb-4">
          <Text>Product Size</Text>
          <View className="border rounded-lg mt-4">
            <Picker
              selectedValue={selectedSize}
              onValueChange={(itemValue) => {
                setSelectedSize(itemValue);
                handleChange('productSize', itemValue); 
              }}
            >
              <Picker.Item label="100g" value="100g" />
              <Picker.Item label="200g" value="200g" />
              <Picker.Item label="600g" value="600g" />
              <Picker.Item label="1.2Kg" value="1.2Kg" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>

        <View className="mb-4">
          <Text>Date</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded mt-4"
            value={form.date}
            onChangeText={(text) => handleChange('date', text)}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View className="mb-4">
          <Text>Quantity</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded mt-4"
            value={form.quantity}
            keyboardType="numeric"
            onChangeText={(text) => handleChange('quantity', text)}
          />
        </View>

        <TouchableOpacity className="bg-yellow-500 rounded-lg p-3 w-40 text-center ml-20 mt-5" title="Submit" onPress={handleSubmit}>
          <Text className="text-white text-center font-semibold">Add Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddProductForm;
