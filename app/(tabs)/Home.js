import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { BarChart } from "react-native-chart-kit";
import { ref, onValue } from "firebase/database";
import { Real_time_database } from "../../firebaseConfig";

export default function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalDispatches, setTotalDispatches] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});
  const [dispatchQuantities, setDispatchQuantities] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [totalQuantityBySize, setTotalQuantityBySize] = useState(0);
  const [totalDispatchBySize, setTotalDispatchBySize] = useState(0);
  
  useEffect(() => {
    // Fetch total products
    const productsRef = ref(Real_time_database, "products");
    onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const products = snapshot.val();
        const quantities = {};

        // Calculate quantities by size
        for (const key in products) {
          const product = products[key];
          if (quantities[product.productSize]) {
            quantities[product.productSize] += parseInt(product.quantity);
          } else {
            quantities[product.productSize] = parseInt(product.quantity);
          }
        }

        setTotalProducts(Object.keys(products).length);
        setProductQuantities(quantities);
        setTotalQuantityBySize(quantities[selectedSize] || 0); // Set the initial quantity for the selected size
      } else {
        setTotalProducts(0);
        setProductQuantities({});
        setTotalQuantityBySize(0);
      }
    });

    // Fetch total dispatches
    const dispatchRef = ref(Real_time_database, "Dispatch Orders");
    onValue(dispatchRef, (snapshot) => {
      if (snapshot.exists()) {
        const dispatches = snapshot.val();
        const dispatchQuantities = {};

        // Calculate dispatch quantities by size
        for (const key in dispatches) {
          const dispatch = dispatches[key];
          if (dispatchQuantities[dispatch.productSize]) {
            dispatchQuantities[dispatch.productSize] += parseInt(dispatch.quantity);
          } else {
            dispatchQuantities[dispatch.productSize] = parseInt(dispatch.quantity);
          }
        }

        setTotalDispatches(Object.keys(dispatches).length);
        setDispatchQuantities(dispatchQuantities);
        setTotalDispatchBySize(dispatchQuantities[selectedSize] || 0); // Set the initial dispatch quantity for the selected size
      } else {
        setTotalDispatches(0);
        setDispatchQuantities({});
        setTotalDispatchBySize(0);
      }
    });
  }, [selectedSize]); // Re-run the effect when selectedSize changes

  return (
    <ScrollView>
      <View className="bg-white">
        <View className="mt-12 ml-7">
          <Text className="text-2xl font-bold">Hello, User!</Text>
          <Text className="text-lg font-semibold mb- text-gray-800 mt-6">Summary</Text>
        </View>

        <View className="p-7 rounded-lg shadow-md bg-yellow-200 ml-4 mr-4 mt-5">
          {/* Dropdown to select product size */}
          <View>
            <Text className="text-lg text-gray-600">Product Size:</Text>
            <Picker
              selectedValue={selectedSize}
              onValueChange={(itemValue) => {
                setSelectedSize(itemValue);
                setTotalQuantityBySize(productQuantities[itemValue] || 0);
                setTotalDispatchBySize(dispatchQuantities[itemValue] || 0);
              }}
            >
              <Picker.Item label="Select a size..." value="" />
              <Picker.Item label="100g" value="100g" />
              <Picker.Item label="200g" value="200g" />
              <Picker.Item label="600g" value="600g" />
              <Picker.Item label="1.2Kg" value="1.2Kg" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
       
          {/* Display total quantity and total dispatches by selected size */}
            <Text className="text-xl text-gray-600 mt-2">
              Total Quantity: {totalQuantityBySize} 
            </Text>
      
            <Text className="text-xl text-gray-600 mt-2">
             Total Dispatches: {totalDispatchBySize}
            </Text>
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

        {/* Line Chart */}
        <View className="mt-10">
          <Text className="text-lg font-medium mb-3 text-gray-800 ml-7">Analysis</Text>
          <BarChart
            data={{
              labels: ["Quantity", "Dispatches"],
              datasets: [
                {
                  data: [totalQuantityBySize, totalDispatchBySize]
                }
              ]
            }}
            width={Dimensions.get("window").width - 38} // Adjust width to fit the screen
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#ebcc34",
              backgroundGradientFrom: "#2b2730",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 1, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 200, ${opacity})`,
              style: { borderRadius: 16 },
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
