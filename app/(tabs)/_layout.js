import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-sharp'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddProduct"
        options={{
          title: 'Add Product',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle-sharp' : 'add-circle-sharp'} color={color} />
          ),
        }}
      />
      
        <Tabs.Screen
        name="Products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bag' : 'bag'} color={color} />
          ),
        }}
      />
      
         <Tabs.Screen
        name="Dispatch"
        options={{
          title: 'Dispatches',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'car-sharp' : 'car-sharp'} color={color} />
          ),
        }}
      />
    
    </Tabs>
  );
}
