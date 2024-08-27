import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link } from 'expo-router';
import { ref, push, update, get } from 'firebase/database';
import { Real_time_database } from '../../firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddDispatchForm = () => {
  const [form, setForm] = useState({
    productName: '',
    batchNo: '',
    productSize: '',
    receiver: '',
    date: '',
    quantity: '',
  });

  const [selectedSize, setSelectedSize] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      handleChange('date', selectedDate.toISOString().split('T')[0]); // Store date in YYYY-MM-DD format
    }
  };

  const handleSubmit = async () => {
    const { productName, batchNo, productSize, date, quantity } = form;

    if (!productName || !batchNo || !productSize || !date || !quantity) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      // Reference to the products path
      const productsRef = ref(Real_time_database, 'products');
      const snapshot = await get(productsRef);

      if (!snapshot.exists()) {
        Alert.alert('Error', 'No products found');
        console.log('No products found');
        return;
      }

      // Find the product with the matching batchNo
      let productData = null;
      let productKey = null;

      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().batchNo === batchNo) {
          productData = childSnapshot.val();
          productKey = childSnapshot.key;
        }
      });

      if (!productData) {
        Alert.alert('Error', 'Product not found');
        console.log('Product not found');
        return;
      }

      const currentQuantity = parseInt(productData.quantity, 10);

      if (parseInt(quantity, 10) > currentQuantity) {
        Alert.alert('Error', 'Quantity exceeds available stock');
        console.log('Quantity exceeds available stock');
        return;
      }

      // Update product quantity
      const newQuantity = currentQuantity - parseInt(quantity, 10);
      const productRef = ref(Real_time_database, `products/${productKey}`);
      await update(productRef, { quantity: newQuantity });

      // Add dispatch record
      const dispatchRef = ref(Real_time_database, 'Dispatch Orders');
      await push(dispatchRef, form);

      Alert.alert('Success', 'Dispatch added successfully');
      setForm({
        productName: '',
        batchNo: '',
        productSize: '',
        receiver: '',
        date: '',
        quantity: '',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to add dispatch. Please try again.');
      console.error('Error adding dispatch: ', error);
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 p-7 mt-10  bg-white">
        <View className="flex flex-row items-center justify-center border-opacity-40 rounded-lg">
          <TouchableOpacity className="bg-slate-300 rounded-lg p-2 w-[151px]">
            <Link href={"../(tabs)/AddProduct"} className='text-center'>
              <Text className="text-xl font-bold text-center">Product</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity className="bg-yellow-400 rounded-lg p-2 w-[151px]">
            <Text className="text-xl font-bold text-center">Dispatch</Text>
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
            className="border border-gray-300 p-2 rounded mt-4"
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
          <Text>Receiver</Text>
          <TextInput
            className="border border-gray-300 p-2 rounded mt-4"
            value={form.receiver}
            onChangeText={(text) => handleChange('receiver', text)}
          />
        </View>

        <View className="mb-4">
          <Text>Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View className="border border-gray-300 p-2 rounded mt-4">
              <Text>{form.date || date.toISOString().split('T')[0]}</Text>
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
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

        <TouchableOpacity
          className="bg-yellow-500 rounded-lg p-3 w-40 text-center ml-20 mt-5"
          title="Submit"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold">Dispatch Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddDispatchForm;
