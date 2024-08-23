// AddProductForm.jsx
import React, { useState } from 'react';
import { View, TextInput,Text,TouchableOpacity,ScrollView  } from 'react-native';
import { Link } from 'expo-router';
import { ref,push } from "firebase/database"
import { Real_time_database } from "../../firebaseConfig";
import { Picker } from '@react-native-picker/picker';


const AddDispatchForm = () => {
  const [form, setForm] = useState({
    productName: '',
    batchNo: '',
    productSize: '',
    receiver: '',
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
     // Push the dispatch data to Firebase Realtime Database
    const dispatchRef = ref(Real_time_database, 'Dispatch Orders');
    push(dispatchRef,form)
    .then(() => {
      console.log("Dispatch added successfully");
      alert("Dispatch added successfully");
      setForm({
        productName: '',
        batchNo: '',
        productSize: '',
        receiver: '',
        date: '',
        quantity: '',
      });
    })
    .catch((error) => {
      console.error("Error adding dispatch: ", error);
      alert("Failed to add dispatch. Please try again.");
    });

  };

  return (
    <ScrollView>
    <View className="flex-1 p-7 mt-12">
      <View className="flex flex-row space-x-5 justify-center">
        <TouchableOpacity >
        <Link href={"../(tabs)/AddProduct"}>
          <Text className="text-2xl font-bold" >Product</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity className="bg-yellow-500 rounded-lg w-[100px] h-[40px]" >
          <Text className="text-2xl font-bold text-white ">Dispatch</Text>
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

      <TouchableOpacity className = "bg-yellow-500 rounded-lg p-3 w-40 text-center ml-20 mt-5"  title="Submit" onPress={handleSubmit}>
        <Text className="text-white text-center font-semibold">Dispatch Order</Text>
      </TouchableOpacity>
      
      
    
    </View>
    </ScrollView>
  );
};

export default AddDispatchForm;
