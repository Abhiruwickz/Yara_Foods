import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ref, onValue } from "firebase/database"; // Import necessary functions
import { Real_time_database } from "../../firebaseConfig"; // Import your configured database

const Dispatch = () => {
  const [dispatches, setDispatches] = useState([]);

  useEffect(() => {
    // Reference to the "Dispatch Orders" node in the database
    const dispatchRef = ref(Real_time_database, 'Dispatch Orders');

    // Listening for changes in the "Dispatch Orders" node
    onValue(dispatchRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dispatchList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setDispatches(dispatchList);
      } else {
        setDispatches([]); // No data available
      }
    });
  }, []);

  return (
    <View className="flex-1 p-7 mt-20">
      <Text className="text-2xl font-bold mb-5">Dispatch Orders</Text>
      {dispatches.length > 0 ? (
        <FlatList
          data={dispatches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border border-gray-300 p-2 mb-2 rounded">
              <Text className="font-semibold">Product Name: {item.productName}</Text>
              <Text>Batch No: {item.batchNo}</Text>
              <Text>Receiver: {item.receiver}</Text>
              <Text>Date: {item.date}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No dispatch orders found.</Text>
      )}
    </View>
  );
};

export default Dispatch;
