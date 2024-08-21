import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput,Image } from "react-native";
import { router } from "expo-router";


export default function App() {
  return (
    <View className = "items-center flex-1 justify-center bg-slate-200">
      <Image source={require("../../assets/images/Yara_Foods.jpg")} className="rounded-lg w-[200px] h-[200px]"></Image>
      <View>
      <TouchableOpacity className="bg-yellow-500 rounded text-white p-2 w-[300px] h-[40px] text-center justify-center items-center mt-20 "  onPress={() => router.navigate("../User/signIn")}>
      <Text className="text-white text-center font-semibold "> Get Started </Text>
      
      </TouchableOpacity>
      </View>
    </View>
  );
}