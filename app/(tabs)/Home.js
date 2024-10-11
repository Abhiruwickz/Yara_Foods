import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import { ref, onValue } from "firebase/database";
import { Real_time_database } from "../../firebaseConfig";

export default function Home() {
  const [totalQuantityBySize, setTotalQuantityBySize] = useState(0);
  const [totalDispatchBySize, setTotalDispatchBySize] = useState(0);
  
 
  return (
    <ScrollView>
      <View className="bg-white">
        <View className="mt-12 ml-7">
          <Text className="text-2xl font-bold">Hello, There!</Text>
          <Text className="text-lg font-semibold mb- text-gray-800 mt-6">Initial Calculation</Text>
        </View>

        <View className="p-7 rounded-lg shadow-md bg-yellow-950 ml-4 mr-4 mt-5">
            <Text className="text-xl text-white mt-2">
              TS Value: 3.89 
            </Text>
      
            <Text className="text-xl text-white mt-2">
             Volume: 4000
            </Text>
        </View>

        <Text className="text-lg font-medium mb-3 text-gray-800 ml-7 mt-5">Inventory</Text>

        <View
          className="p-5 rounded-xl shadow-md bg-yellow-950 ml-4 mr-4 mt-3"
        >
          <Image source={require("../../assets/images/product.png")} />
          <Text className="text-xl font-medium mb-5 text-white mt-2">Tank 1 3000ml</Text>
        </View>

        <View
          className="p-5 rounded-lg shadow-md bg-yellow-950 ml-4 mr-4 mt-5"
        >
          <Image source={require("../../assets/images/lorry.png")} />
          <Text className="text-lg font-medium mb-3 text-white mt-2">Tank 2 3000ml</Text>
        </View>

     
        <View className="mt-10">
        <Text className="text-lg font-medium mb-3 text-gray-800 ml-7">Total Calculation</Text>
        <View className="p-7 rounded-lg shadow-md bg-yellow-950 ml-4 mr-4 mt-2 h-40">
        <Text className="text-lg mb-3 text-white font-bold">Calculated TS: </Text>
        <Text className="text-lg mb-3 text-white font-bold">Calculated Volume: </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
