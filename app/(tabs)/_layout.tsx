import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { height: 100, justifyContent:'center', alignItems:'center'},
        tabBarItemStyle: {flexDirection: 'row', justifyContent:'center', alignItems:'center'},
        tabBarLabelStyle: {marginTop: 5},
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name='home' color={color} />,
        }}
        />
      {/* <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} style={{ marginBottom: -3 }} name='user-circle' color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
