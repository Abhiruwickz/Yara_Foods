import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput,Image } from "react-native";
import { Link, router } from "expo-router";

export default function Home() {
  return (
    <View>
     <View className="mt-16 ml-7">
      <Text className="text-2xl font-bold">Hello, User!</Text>
       </View>
       <View className="p-7 rounded-lg shadow-md bg-yellow-200 ml-4 mr-4 mt-5">
      <Text className="text-xl font-bold mb-3 text-gray-800">Summary</Text>
      <Text className="text-lg text-gray-600">Total Products: </Text>
      <Text className="text-lg text-gray-600">Total Dispatches: </Text>
    </View>
    
    <Text className="text-lg font-medium mb-3 text-gray-800 ml-7 mt-5">Inventory</Text>

    <TouchableOpacity className="p-5 rounded-xl shadow-md bg-yellow-200 ml-4 mr-4 mt-5"   onPress={() => router.navigate("../(tabs)/Add_product")}>
      <Image source={require("../../assets/images/product.png")}></Image>
      <Text className="text-xl font-medium mb-3 text-gray-800">Products</Text>
     
      </TouchableOpacity>

      <TouchableOpacity className="p-5 rounded-lg shadow-md bg-yellow-200 ml-4 mr-4 mt-5">
      <Image source={require("../../assets/images/lorry.png")}></Image>
      <Text className="text-lg font-medium mb-3 text-gray-800">Dispatches</Text>
     
      </TouchableOpacity>


       












       </View>

  );
};




