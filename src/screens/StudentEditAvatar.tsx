import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { StudentEditProps } from '../types/types';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../app/store';
import { changeAge, changeEmail, changeName } from '../features/studentSlice';
import Entypo from 'react-native-vector-icons/dist/Entypo';

export default function StudentEditAvatar({
  navigation,
  route,
}: StudentEditProps) {
  const { name } = route.params;
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { fullName: name },
  });

  const handleSubmit = (type: string, value: string) => {
    switch (type) {
      case 'name':
        dispatch(changeName(value));
        return;
      case 'age':
        dispatch(changeAge(value));
        return;
      case 'email':
        dispatch(changeEmail(value));
        return;
      default:
        break;
    }

    navigation.goBack();
  };

  return (
    <>
      <TouchableOpacity className="h-2/3" onPress={() => navigation.goBack()} />
      <View className="bg-slate-500 h-1/3 w-full bottom-0 absolute rounded-t-2xl p-5 items-center">
        <TouchableOpacity
          className="self-end"
          onPress={() => navigation.goBack()}>
          <Entypo name="circle-with-cross" size={20} color="#fff" />
        </TouchableOpacity>
        <Text className=" text-center font-extrabold text-2xl text-slate-200 mb-5 shadow-md shadow-black">
          Edit
        </Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              onSubmitEditing={() => handleSubmit('name', value)}
              onChangeText={onChange}
              value={value}
              className="w-full bg-slate-300 mx-3 rounded-xl text-slate-800 pl-3 text-base"
            />
          )}
          name="fullName"
        />
        {errors.fullName && <Text>This is required.</Text>}
        <TouchableOpacity onPress={() => handleSubmit('name', value)}>
          <View className="w-14 h-8 bg-slate-300 rounded-xl mt-5 justify-center items-center">
            <Text>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
