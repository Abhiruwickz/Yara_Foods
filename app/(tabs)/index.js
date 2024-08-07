import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput,Image } from "react-native";


export default function App() {
  return (
    <View className = "items-center flex-1 justify-center ">
      <Image source={require("../../assets/images/Yara_Foods.jpg")} className="rounded-lg w-[200px] h-[200px]"></Image>
     
      
    </View>
  );
}