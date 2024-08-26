import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { BarChart } from "react-native-chart-kit"; // Import the BarChart component
import { ref, onValue } from "firebase/database";
import { Real_time_database } from "../../firebaseConfig";

export default function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalDispatches, setTotalDispatches] = useState(0);

  useEffect(() => {
    // Fetch total products
    const productsRef = ref(Real_time_database, "products");
    onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const products = snapshot.val();
        setTotalProducts(Object.keys(products).length);
      } else {
        setTotalProducts(0);
      }
    });

    // Fetch total dispatches
    const dispatchRef = ref(Real_time_database, "Dispatch Orders");
    onValue(dispatchRef, (snapshot) => {
      if (snapshot.exists()) {
        const dispatches = snapshot.val();
        setTotalDispatches(Object.keys(dispatches).length);
      } else {
        setTotalDispatches(0);
      }
    });
  }, []);

  // Bar chart data
  const data = {
    labels: ["Products", "Dispatches"],
    datasets: [
      {
        data: [totalProducts, totalDispatches],
      },
    ],
  };

  return (
    <ScrollView>
      <View className="bg-white">
      <View className="mt-12 ml-7 ">
        <Text className="text-2xl font-bold">Hello, User!</Text>
      </View>
      <View className="p-7 rounded-lg shadow-md bg-yellow-200 ml-4 mr-4 mt-5">
        <Text className="text-xl font-bold mb-3 text-gray-800">Summary</Text>
        <Text className="text-lg text-gray-600">Total Products: {totalProducts}</Text>
        <Text className="text-lg text-gray-600">Total Dispatches: {totalDispatches}</Text>
      </View>
      
      <Text className="text-lg font-medium mb-3 text-gray-800 ml-7 mt-5">Inventory</Text>

      <TouchableOpacity
        className="p-5 rounded-xl shadow-md bg-yellow-200 ml-4 mr-4 mt-3"
        onPress={() => router.navigate("../(tabs)/Products")}
      >
        <Image source={require("../../assets/images/product.png")} />
        <Text className="text-xl font-medium mb-5 text-gray-800 mt-2">Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="p-5 rounded-lg shadow-md bg-yellow-200 ml-4 mr-4 mt-5"
        onPress={() => router.navigate("../(tabs)/Dispatch")}
      >
        <Image source={require("../../assets/images/lorry.png")} />
        <Text className="text-lg font-medium mb-3 text-gray-800 mt-2">Dispatches</Text>
      </TouchableOpacity>

      {/* Bar Chart */}
      <View className="mt-10">
        <Text className="text-lg font-medium mb-3 text-gray-800 ml-7">Analysis</Text>
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 40} // Adjust width to fit the screen
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#ebcc34",
            backgroundGradientFrom: "#2b2730",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 1, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 200, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ebcc34",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginLeft: 20,
          }}
        />
      </View>
      </View>
    </ScrollView>
  );
}
