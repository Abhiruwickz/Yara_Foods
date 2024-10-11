import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity,Image } from "react-native";
import { Link, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebase_Auth } from "../../firebaseConfig";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const handleSignIn = async () => {
    try {
      // sign in with email and password
        const userCredential = await signInWithEmailAndPassword(
            firebase_Auth,
            email,
            password

        );
        //sign In
        const user = userCredential.user;
        console.log("Logged In Successfully!");
        router.replace("../(tabs)/Home");

    } catch (error) {
      switch (error.message) {
        case "Invalid email address!":
          alert("Invalid email address!");
          break;
        case "Invalid email or password":
          alert("Invalid email or password!");
          break;
        case "Password is required.":
          alert("Password is required.");
          break;
        case "At least 6 characters required for password!":
          alert("At least 6 characters required for password!");
          break;
        case "Network error! Please check your internet connection.":
          alert("Network error! Please check your internet connection.");
          break;
        default:
          alert(error.message);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center gap-4 bg-white">
      <View className="text-left right-20">
      <Image source={require("../../assets/images/Yara_Foods.jpg")} className="rounded-lg w-[50px] h-[50px] left-60 -top-6"></Image>
      <Text className="text-3xl font-medium -top-20"> Hi ! </Text>
      <Text className="font-medium text-3xl -top-16 "> Welcome </Text>
     
      </View>
      <View className="flex flex-row gap-2 -top-5">
        <Image source={require("../../assets/images/user.png")}></Image>
        <Text className="font-normal text-lg text-slate-600"> Office User </Text>
      </View>
      <View className="gap-6 mr-5 items-center -top-5">
        <View>
          <Text className="font-bold mb-1"> Email </Text>
          <TextInput
            placeholder="Enter your email"
            className="border border-gray-800 rounded w-72 p-2"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View>
          <Text className="font-bold mb-1"> Password </Text>
          <TextInput
            className="border border-gray-800 rounded w-72 p-2"
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 mt-8"
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        
        
        <TouchableOpacity
        //sign in button
          className="bg-yellow-400 rounded-lg p-3 w-48 text-center top-5"
          onPress={handleSignIn}
        >
          <Text className="text-white text-center font-semibold"> Log In </Text>
        </TouchableOpacity>

      
      </View>
      
    </View>
  );
};

export default SignIn;
