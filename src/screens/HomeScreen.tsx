import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { HomeScreenProps } from '../types/types';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View className="flex-1">
      <View className="basis-1/2 justify-center items-center">
        <Text className="font-extrabold text-slate-800 text-5xl shadow-lg shadow-black">
          Portal
        </Text>
      </View>
      <View className="p-7 gap-5">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SubjectsHub', {
              screen: 'Subjects',
            })
          }>
          <Text className="p-5 font-medium text-2xl rounded-2xl bg-slate-700 text-zinc-300">
            Subjects
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('StudentsHub', {
              screen: 'Students',
            })
          }>
          <Text className="p-5 font-medium text-2xl rounded-2xl bg-slate-700 text-zinc-300">
            Students
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
