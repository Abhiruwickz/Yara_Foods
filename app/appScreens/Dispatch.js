import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Image,TouchableOpacity } from 'react-native';
import { ref, onValue } from "firebase/database"; // Import necessary functions
import { Real_time_database } from "../../firebaseConfig"; // Import your configured database
import { router } from 'expo-router';
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
    <View className="flex-1 p-7 mt-8">
      <View className="flex flex-row gap-36">
      <Text className="text-2xl font-bold mb-5">Dispatch Orders</Text>
      <TouchableOpacity onPress={() => router.navigate("../(tabs)/DispatchAdd")}>
        <Image source={require("../../assets/images/plus.png")} className="w-[24px] h-[24px]" />
        </TouchableOpacity>
        </View>
      {dispatches.length > 0 ? (
        <FlatList
          data={dispatches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border border-gray-800 p-4 mb-4 rounded-xl bg-slate-100 ">
              <Text className="font-semibold">Product Name: {item.productName}</Text>
              <Text className="font-semibold">Batch No: {item.batchNo}</Text>
              <Text  className="font-semibold">Date: {item.date}</Text>
              <Text  className="font-semibold">Quantity: {item.quantity}</Text>
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
