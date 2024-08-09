import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput,Image } from "react-native";
import { Link, router } from "expo-router";
import { Real_time_database } from "../../firebaseConfig";
import {ref,onValue} from "firebase/database";
import React,{ useState,useEffect } from "react";


export default function Home() {
const [totalProducts, setTotalProducts] = useState(0);
const [totalDispatches, setTotalDispatches] = useState(0);

useEffect(()=> {
  const productRef = ref(Real_time_database,'products');
  onValue(productRef,(snapshot)=> {
    const products = snapshot.val();
    if(products) {
      setTotalProducts(Object.keys(products).length);
    } else {
      setTotalProducts(0);
    }
  });
  const dispatchRef = ref(Real_time_database,'Dispatch Orders');
  onValue(dispatchRef,(snapshot)=> {
    const dispatches = snapshot.val();
    if(dispatches) {
      setTotalDispatches(Object.keys(dispatches).length);
    } else {
      setTotalDispatches(0);
    }
});
},[]);

  return (
    <View>
     <View className="mt-16 ml-7">
      <Text className="text-2xl font-bold">Hello, User!</Text>
       </View>
       <View className="p-7 rounded-lg shadow-md bg-yellow-200 ml-4 mr-4 mt-5">
      <Text className="text-xl font-bold mb-3 text-gray-800">Summary</Text>
      <Text className="text-lg text-gray-600">Total Products: {totalProducts} </Text>
      <Text className="text-lg text-gray-600">Total Dispatches: {totalDispatches} </Text>
    </View>
    
    <Text className="text-lg font-medium mb-3 text-gray-800 ml-7 mt-5">Inventory</Text>

    <TouchableOpacity className="p-5 rounded-xl shadow-md bg-yellow-200 ml-4 mr-4 mt-5"   onPress={() => router.navigate("../(tabs)/Products")}>
      <Image source={require("../../assets/images/product.png")}></Image>
      <Text className="text-xl font-medium mb-3 text-gray-800">Products</Text>
     
      </TouchableOpacity>

      <TouchableOpacity className="p-5 rounded-lg shadow-md bg-yellow-200 ml-4 mr-4 mt-5" onPress={() => router.navigate("../(tabs)/Dispatch")}>
      <Image source={require("../../assets/images/lorry.png")}></Image>
      <Text className="text-lg font-medium mb-3 text-gray-800">Dispatches</Text>
     
      </TouchableOpacity>


       












       </View>

  );
};




