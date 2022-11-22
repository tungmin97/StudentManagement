import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { StudentFormProps } from '../../types/types';

export default function StudentForm({
  label,
  placeholder,
  value,
  keyboardType = 'default',
  maxLength = 50,
  handleChange,
  handleSubmit,
}: StudentFormProps) {
  return (
    <View>
      <Text className="mt-2">{label}</Text>
      <View className="flex-row items-center">
        <TextInput
          className="flex-1 mr-2 border-b border-slate-400 text-base"
          placeholder={placeholder}
          placeholderTextColor="#333"
          autoCorrect={false}
          defaultValue={value}
          cursorColor="#333"
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType="done"
          selectionColor="#fff"
          onChangeText={newText => handleChange(newText)}
          onSubmitEditing={() => handleSubmit(value)}
        />
        <TouchableOpacity onPress={() => handleSubmit(value)}>
          <MaterialIcons name="send" size={25} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
