import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { router } from "expo-router";

export default function App() {
 

  return (
    <View className="items-center flex-1 justify-center bg-white">
      <Image
        source={require("../assets/images/coconut_milk.png")}
        className="rounded-lg w-[250px] h-[250px]"
      />
      <View>
        <TouchableOpacity
          className="rounded-lg text-white p-2 w-[300px] h-[40px] text-center justify-center items-center mt-20 bg-yellow-950"
          onPress={() => router.navigate("../(tabs)/Home")}
        >
          <Text className="text-white text-center font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
