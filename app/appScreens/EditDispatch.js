import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Edit Dispatch</Text>
      <Text>Product Name</Text>
      <TextInput
        value={updatedProductName}
        onChangeText={setUpdatedProductName}
        placeholder="Product Name"
        className="border p-2 mb-4"
      />
      <Text>Product Name</Text>
      <TextInput
        value={updatedBatchNo}
        onChangeText={setUpdatedBatchNo}
        placeholder="Batch No"
        className="border p-2 mb-4"
      />
      <View className="mb-4">
        <Text>Product Size</Text>
        <View className="border rounded-lg mt-4">
          <Picker
            selectedValue={updatedProductSize}
            onValueChange={(itemValue) => setUpdatedProductSize(itemValue)} 
          >
            <Picker.Item label="100g" value="100g" />
            <Picker.Item label="200g" value="200g" />
            <Picker.Item label="600g" value="600g" />
            <Picker.Item label="1.2Kg" value="1.2Kg" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      </View>
      <Text>Product Name</Text>
      <TextInput
        value={updatedDate}
        onChangeText={setUpdatedDate}
        placeholder="Date"
        className="border p-2 mb-4"
      />
      <Text>Product Name</Text>
      <TextInput
        value={updatedQuantity}
        onChangeText={setUpdatedQuantity}
        placeholder="Quantity"
        keyboardType="numeric"
        className="border p-2 mb-4"
      />
      <Text>Product Name</Text>
      <TextInput
        value={updatedReceiver}
        onChangeText={setUpdatedReceiver}
        placeholder="Receiver"
        className="border p-2 mb-4"
      />
      <Button title="Save" onPress={handleSave} />
      <View className="mt-4">
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

export default EditDispatch;
