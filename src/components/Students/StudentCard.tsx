import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  StudentCardProps,
  StudentScreenNavigationProps,
} from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { formatAge } from '../../utils/helper';

export default function StudentCard({ item }: StudentCardProps) {
  const navigation = useNavigation<StudentScreenNavigationProps>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('StudentDetails', { data: item })}
      className="flex-row items-center px-3 py-5 bg-slate-300 mb-7 rounded-2xl">
      <FastImage
        source={{ uri: item.avatar }}
        className="w-20 h-20 rounded-full shadow-md shadow-black bg-slate-600 ml-5"
      />
      <View className="ml-5">
        <Text>{item.name}</Text>
        <Text>{formatAge(item.age)}</Text>
        <Text>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );
}
