import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { useRouter } from "expo-router"; // Updated import to useRouter

export default function App() {
  const router = useRouter(); // Use the useRouter hook

  useEffect(() => {
    // Set a timeout to automatically navigate after 5 seconds
    const timer = setTimeout(() => {
      router.navigate("../User/open_screen");
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="items-center flex-1 justify-center bg-white">
      <Image
        source={require("../assets/images/Yara_Foods.jpg")}
        className="rounded-lg w-[200px] h-[200px]"
      />
      <View>
        {/* <TouchableOpacity
          className="bg-yellow-500 rounded text-white p-2 w-[300px] h-[40px] text-center justify-center items-center mt-20"
          onPress={() => router.navigate("../User/open_screen")}
        >
          <Text className="text-white text-center font-semibold">
            Get Started
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
