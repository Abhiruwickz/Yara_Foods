import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert,TouchableOpacity,ScrollView } from 'react-native';
import { ref, update, remove } from 'firebase/database';
import { Real_time_database } from '../../firebaseConfig';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';


const EditDispatch = () => {
  const { id, productName, batchNo, productSize, date, quantity, receiver } = useLocalSearchParams();
  const router = useRouter();

  const [updatedProductName, setUpdatedProductName] = useState(productName);
  const [updatedBatchNo, setUpdatedBatchNo] = useState(batchNo);
  const [updatedProductSize, setUpdatedProductSize] = useState(productSize);
  const [updatedDate, setUpdatedDate] = useState(date);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const [updatedReceiver, setUpdatedReceiver] = useState(receiver);

  const handleSave = () => {
    const dispatchRef = ref(Real_time_database, `Dispatch Orders/${id}`);

    update(dispatchRef, {
      productName: updatedProductName,
      batchNo: updatedBatchNo,
      productSize: updatedProductSize,
      date: updatedDate,
      quantity: updatedQuantity,
      receiver: updatedReceiver,
    })
      .then(() => {
        Alert.alert('Success', 'Dispatch order updated successfully!', [{ text: 'OK', onPress: () => router.back() }]);
      })
      .catch((error) => {
        console.error('Error updating dispatch order:', error);
        Alert.alert('Error', 'Failed to update dispatch order. Please try again.');
      });
  };

  const handleDelete = () => {
    const dispatchRef = ref(Real_time_database, `Dispatch Orders/${id}`);

    Alert.alert(
      'Delete Dispatch Order',
      'Are you sure you want to delete this dispatch order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            remove(dispatchRef)
              .then(() => {
                Alert.alert('Deleted', 'Dispatch order deleted successfully!', [{ text: 'OK', onPress: () => router.back() }]);
              })
              .catch((error) => {
                console.error('Error deleting dispatch order:', error);
                Alert.alert('Error', 'Failed to delete dispatch order. Please try again.');
              });
          },
        },
      ]
    );
  };

  return (
    <View className="bg-white flex-1">
    <ScrollView>

    <View className="flex-1 p-4">
      <View className="mt-20">
      <Text className="text-2xl font-bold mb-4 text-center">Edit Dispatch</Text>
      
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
    
      <TextInput
        value={updatedReceiver}
        onChangeText={setUpdatedReceiver}
        placeholder="Receiver"
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
    
    </ScrollView>
    </View>
  );
};

export default EditDispatch;
