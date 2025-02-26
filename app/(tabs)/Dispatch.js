import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { Real_time_database } from '../../firebaseConfig';
import { router } from 'expo-router';

const Dispatch = () => {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dispatchRef = ref(Real_time_database, 'Dispatch Orders');

    const unsubscribe = onValue(dispatchRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dispatchList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        // Sort dispatches by date in ascending order
        dispatchList.sort((a, b) => new Date(b.date) - new Date(a.date));

        setDispatches(dispatchList);
      } else {
        setDispatches([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4 mt-8 bg-white">
          <View className="flex flex-row justify-between items-center mb-5">
            <Text className="text-2xl font-bold">Dispatch Orders</Text>
            <TouchableOpacity onPress={() => router.navigate("../appScreens/DispatchExportPage")}>
            <Image source={require('../../assets/images/download.png')} className="w-[32px] h-[32px] ml-18" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("../appScreens/DispatchAdd")}>
              <Image source={require('../../assets/images/plus.png')} className="w-[24px] h-[24px]" />
            </TouchableOpacity>
          </View>
          {dispatches.map(item => (
            <View key={item.id} className="mb-4 p-4 border border-gray-800 rounded-xl bg-white flex-row justify-between">
              <View>
                <Text className="font-bold text-lg">{item.productName}</Text>
                <Text className="font-semibold">Product Size: {item.productSize}</Text>
                <Text className="font-semibold">Batch No: {item.batchNo}</Text>
                <Text className="font-semibold">Date: {item.date}</Text>
                <Text className="font-semibold">Quantity: {item.quantity}</Text>
                <Text className="font-semibold">Receiver: {item.receiver}</Text>
              </View>
              <TouchableOpacity onPress={() => router.push({ pathname: "../appScreens/EditDispatch", params: item })}>
                <Image source={require('../../assets/images/edit.png')} className="w-[24px] h-[24px]" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dispatch;
