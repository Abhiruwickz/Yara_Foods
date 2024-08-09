// AddProductForm.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text,TouchableOpacity  } from 'react-native';



const AddProductForm = () => {
  const [form, setForm] = useState({
    productName: '',
    batchNo: '',
    receiver: '',
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
    if (!form.receiver) newErrors.receiver = 'Receiver is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.quantity) newErrors.quantity = 'Quantity is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(form);
    console.log ("Product added successfully");
  };

  return (
    <View className="flex-1 p-7 mt-32">
      <View className="flex flex-row space-x-5">
        <TouchableOpacity className="bg-yellow-500">
          <Text className="text-2xl font-bold">P</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-2xl font-bold">D</Text>
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
        <Text>Receiver</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded"
          value={form.receiver}
          onChangeText={(text) => handleChange('receiver', text)}
        />
        {errors.receiver && <Text className="text-red-500 text-xs">{errors.receiver}</Text>}
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

      <TouchableOpacity className = "bg-yellow-500 rounded p-3 w-40 text-center ml-20 mt-5"  title="Submit" onPress={handleSubmit}>
        <Text className="text-white text-center font-semibold">Add Product</Text>
      </TouchableOpacity>
      
      
    
    </View>
  );
};

export default AddProductForm;
