import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SubjectScreemNavigationProps, SubjectState } from '../../types/types';
import { useNavigation } from '@react-navigation/native';

export default function SubjectCard({ item }: { item: SubjectState }) {
  const navigation = useNavigation<SubjectScreemNavigationProps>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SubjectDetails', { data: item })}
      className="flex-row items-center px-3 py-5 bg-slate-300 mb-7 rounded-2xl">
      <View className="ml-5">
        <Text className="font-medium">
          Name: <Text className="font-normal">{item.name}</Text>
        </Text>
        <Text className="font-medium">
          Classroom: <Text className="font-normal">{item.classroom}</Text>
        </Text>
        <Text className="font-medium">
          Teacher: <Text className="font-normal">{item.teacher}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
