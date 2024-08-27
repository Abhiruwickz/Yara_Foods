import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const x = require("../(tabs)/Home")
const open_screen = () => {
  return (
 
    <View className = "items-center flex-1 mt-44 ">
    <Image source={require("../../assets/images/Yara_Foods.jpg")} className="rounded-lg w-[100px] h-[100px]"></Image>
    <Text className="font-semibold text-xl text-center items-center mt-12"> Welcome to the Yara Foods! </Text>
    <TouchableOpacity
          className="bg-yellow-500 rounded-lg text-white p-2 w-[300px] h-[40px] text-center justify-center items-center mt-20"  onPress={() => router.navigate("../User/signIn")}>
          <Text className="text-white ml-2 font-semibold text-center"> Log In </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-yellow-500 rounded-lg text-white p-2 w-[300px] h-[40px] text-center justify-center items-center mt-10"  onPress={() => router.navigate("../(tabs)/Home")}>
          <Text className="text-white ml-2 font-semibold text-center"> Continue as a Guest </Text>
        </TouchableOpacity>    
   
   
   
    
    
    </View>
    
  
  
  )
}

export default open_screen