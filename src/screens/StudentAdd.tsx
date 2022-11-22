import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import StudentForm from '../components/Students/StudentForm';
import { useAppDispatch, useAppSelector } from '../app/store';
import {
  addSubject,
  changeAge,
  changeAvatar,
  changeEmail,
  changeName,
  populateSubjects,
  removeSubject,
  resetField,
} from '../features/studentSlice';
import {
  imgData,
  validateAge,
  validateEmail,
  validateField,
} from '../utils/helper';
import {
  useAddStudentMutation,
  useGetListSubjectsQuery,
} from '../features/apiSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { StudentAddProps, StudentSubjects } from '../types/types';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

export default function StudentAdd({ navigation }: StudentAddProps) {
  const dispatch = useAppDispatch();
  const { data: subjects } = useGetListSubjectsQuery();
  const [addStudent] = useAddStudentMutation();

  const {
    name,
    age,
    email,
    avatar,
    allSubjects,
    subjects: studentSubjects,
  } = useAppSelector(state => state.student);

  const [avatarId, setAvatarId] = useState(1);
  const handleAddSubject = (item: StudentSubjects) => {
    dispatch(addSubject(item));
  };

  const handleRemoveSubject = (item: StudentSubjects) => {
    dispatch(removeSubject(item));
  };

  const handleSetAvatar = (id: number, url: string) => {
    setAvatarId(() => id);
    dispatch(changeAvatar(url));
  };

  useEffect(() => {
    dispatch(resetField());
    dispatch(populateSubjects(subjects ? subjects : []));
  }, [dispatch, subjects]);

  const handleAddStudent = () => {
    if (!name || !age || !email || !avatar) {
      Toast.show({
        type: 'error',
        text1: 'You must fill all required fields',
      });
      return;
    } else {
      addStudent({
        name,
        age,
        email,
        avatar,
        subjects: studentSubjects,
      });
      navigation.navigate('Students');
    }
  };
  return (
    <ScrollView>
      <View className="basis-2/3 p-5 bg-slate-500 rounded-b-3xl">
        <TouchableOpacity
          className="self-end"
          onPress={() => navigation.navigate('Students')}>
          <Entypo name="circle-with-cross" size={25} color="#fff" />
        </TouchableOpacity>
        <Text className="text-center font-bold text-2xl text-slate-200 mb-3">
          Add New Student
        </Text>
        <View className="flex-row justify-between items-center p-3">
          {imgData.map(img => (
            <TouchableOpacity
              onPress={() => handleSetAvatar(img.id, img.url)}
              key={img.id}>
              <FastImage
                source={{ uri: img.url }}
                className={`h-24 w-24 rounded-full ${
                  avatarId === img.id &&
                  'border-2 border-white shadow-md shadow-black'
                } `}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="p-3 mt-5">
        <View className="p-5 pt-1">
          <StudentForm
            label="Full Name"
            placeholder="Please enter your full name"
            value=""
            handleChange={input => dispatch(changeName(input))}
            handleSubmit={(input: string) => validateField(input)}
          />
          <StudentForm
            label="Age"
            placeholder="Please enter your age"
            value=""
            keyboardType="numeric"
            handleChange={input => dispatch(changeAge(input))}
            handleSubmit={input => validateAge(input)}
          />
          <StudentForm
            label="Email"
            placeholder="Please enter your email"
            value=""
            handleChange={input => dispatch(changeEmail(input))}
            handleSubmit={input => validateEmail(input)}
          />
        </View>
        <View className="bg-slate-300 rounded-2xl gap-y-3">
          <View className="p-3">
            <View className="flex-row justify-between items-center">
              <Text className="font-medium">All Subjects</Text>
            </View>
            <View className="h-px w-full bg-slate-400 my-2" />
            {allSubjects &&
              allSubjects
                .filter(item =>
                  studentSubjects.every(ent => ent.id !== item.id),
                )
                .map(item => (
                  <TouchableOpacity
                    onPress={() => handleAddSubject(item)}
                    key={item.id}
                    className="flex-row justify-start p-1">
                    <MaterialCommunityIcons name="plus" size={15} />
                    <Text className="ml-5">{item.name}</Text>
                  </TouchableOpacity>
                ))}
          </View>
          <View className="p-3">
            <View className="flex-row justify-between items-center">
              <Text className="font-medium">Registered Subjects</Text>
            </View>
            <View className="h-px w-full bg-slate-400 my-2" />
            {studentSubjects &&
              studentSubjects.map(item => (
                <TouchableOpacity
                  onPress={() => handleRemoveSubject(item)}
                  key={item.id}
                  className="flex-row justify-start p-1">
                  <MaterialCommunityIcons name="minus" size={15} />
                  <Text className="ml-5">{item.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <TouchableOpacity
          className="p-3 justify-center items-center"
          onPress={handleAddStudent}>
          <View>
            <Text>Proceed</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
