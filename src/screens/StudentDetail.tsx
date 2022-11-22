import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import { StudentDetailsProps, StudentSubjects } from '../types/types';
import FastImage from 'react-native-fast-image';
import {
  formatAge,
  validateAge,
  validateEmail,
  validateField,
} from '../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import {
  useGetListSubjectsQuery,
  useGetStudentQuery,
  useUpdateStudentSubjectsMutation,
} from '../features/apiSlice';
import { useAppDispatch, useAppSelector } from '../app/store';
import {
  addSubject,
  changeAge,
  changeAvatar,
  changeEmail,
  changeName,
  populateStudentSubjects,
  populateSubjects,
  removeSubject,
  resetField,
} from '../features/studentSlice';
import StudentForm from '../components/Students/StudentForm';

export default function StudentDetail({
  navigation,
  route,
}: StudentDetailsProps) {
  const { id } = route.params.data;
  const { data, isFetching } = useGetStudentQuery(id);
  const { data: subjects } = useGetListSubjectsQuery();
  const [updateStudent] = useUpdateStudentSubjectsMutation();
  const dispatch = useAppDispatch();

  const {
    name,
    age,
    email,
    avatar,
    allSubjects,
    subjects: studentSubjects,
  } = useAppSelector(state => state.student);

  useEffect(() => {
    dispatch(resetField());
    dispatch(changeAge(data ? data.age : 0));
    dispatch(changeName(data ? data.name : ''));
    dispatch(changeEmail(data ? data.email : ''));
    dispatch(changeAvatar(data ? data.avatar : ''));
    dispatch(populateSubjects(subjects ? subjects : []));
    dispatch(populateStudentSubjects(data ? data.subjects : []));
  }, [dispatch, data, subjects]);

  const handleAddSubject = (item: StudentSubjects) => {
    dispatch(addSubject(item));
  };

  const handleRemoveSubject = (item: StudentSubjects) => {
    dispatch(removeSubject(item));
  };

  const handleUpdateStudent = () => {
    updateStudent({
      id,
      name,
      age,
      email,
      avatar,
      subjects: studentSubjects,
    });
  };

  if (isFetching) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView>
      <View className="basis-1/3 bg-slate-500 rounded-b-2xl items-center justify-center shadow-md shadow-black p-3">
        <TouchableOpacity
          className="self-end"
          onPress={() => navigation.navigate('Students')}>
          <Entypo name="circle-with-cross" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('e')}>
          <FastImage
            source={{ uri: avatar }}
            className="w-24 h-24 rounded-full mb-3"
          />
        </TouchableOpacity>
        <Text className="font-bold text-slate-100 text-2xl">{name}</Text>
      </View>
      <View className="p-3 gap-y-3">
        <View className="flex-row items-center">
          <View className="h-5 w-5 p-0.5 rounded-full bg-slate-300 items-center justify-center">
            <MaterialCommunityIcons
              name="information-variant"
              size={18}
              color="#333"
            />
          </View>
          <Text className="ml-2 font-medium text-base">
            General Information
          </Text>
        </View>
        <View className=" bg-slate-300 rounded-2xl p-5">
          <StudentForm
            label="Full Name"
            placeholder="Please enter your full name"
            value={name}
            handleChange={(input: string) => dispatch(changeName(input))}
            handleSubmit={input => validateField(input)}
          />
          <StudentForm
            label="Age"
            placeholder="Tell me your age"
            value={formatAge(age)}
            keyboardType="numeric"
            handleChange={(input: string) => dispatch(changeAge(input))}
            handleSubmit={input => validateAge(input)}
          />
          <StudentForm
            label="Email"
            placeholder="Type in a valid email"
            value={email}
            handleChange={(input: string) => dispatch(changeEmail(input))}
            handleSubmit={(input: string) => validateEmail(input)}
          />
        </View>
        <View className="flex-row items-center">
          <View className="h-5 w-5 p-0.5 rounded-full bg-slate-300 items-center justify-center">
            <MaterialCommunityIcons
              name="book-information-variant"
              size={18}
              color="#333"
            />
          </View>
          <Text className="ml-2 font-medium text-base">
            Subjects Information
          </Text>
        </View>
        <View className="bg-slate-300 rounded-2xl p-5 gap-y-3">
          <View>
            <View className="flex-row justify-between items-center">
              <Text className="font-medium">All Subjects</Text>
            </View>
            <View className="h-px w-full bg-slate-400 my-2" />
            {allSubjects.length > 0 &&
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
          <View>
            <View className="flex-row justify-between items-center">
              <Text className="font-medium">Registered Subjects</Text>
            </View>
            <View className="h-px w-full bg-slate-400 my-2" />
            {studentSubjects
              ? studentSubjects.map(item => (
                  <TouchableOpacity
                    onPress={() => handleRemoveSubject(item)}
                    key={item.id}
                    className="flex-row justify-start p-1">
                    <MaterialCommunityIcons name="minus" size={15} />
                    <Text className="ml-5">{item.name}</Text>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="p-3 justify-center items-center"
        onPress={() => handleUpdateStudent()}>
        <View className="bg-slate-400 p-y-2 p-x-4 w-14 h-10 rounded-2xl justify-center items-center">
          <Text className="font-medium text-base">Save</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
