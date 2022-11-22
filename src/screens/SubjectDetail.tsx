import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import { StudentDetailsProps, SubjectDetailsProps } from '../types/types';
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
  useGetSubjectQuery,
  useUpdateSubjectMutation,
} from '../features/apiSlice';
import { useAppDispatch, useAppSelector } from '../app/store';
import {
  changeAge,
  changeEmail,
  changeName,
  resetField,
} from '../features/studentSlice';
import StudentForm from '../components/Students/StudentForm';
import {
  changeClassroom,
  changeTeacher,
  populateSubjectsStudent,
} from '../features/subjectSlice';

export default function StudentDetail({
  navigation,
  route,
}: SubjectDetailsProps) {
  const { id } = route.params.data;
  const { data, isFetching } = useGetSubjectQuery(id);
  // const { data: subjects } = useGetListSubjectsQuery();
  const [updateSubject] = useUpdateSubjectMutation();
  const dispatch = useAppDispatch();

  console.log(data);

  const { name, classroom, teacher, students } = useAppSelector(
    state => state.subject,
  );

  console.log(name, classroom, teacher, students);

  useEffect(() => {
    dispatch(resetField());
    dispatch(changeClassroom(data ? data.classroom : ''));
    dispatch(changeName(data ? data.name : ''));
    dispatch(changeTeacher(data ? data.teacher : ''));
    dispatch(populateSubjectsStudent(data ? data.students : []));
  }, [dispatch, data]);

  // const handleAddSubject = (item: StudentSubjects) => {
  //   dispatch(addSubject(item));
  // };

  // const handleRemoveSubject = (item: StudentSubjects) => {
  //   dispatch(removeSubject(item));
  // };

  const handleUpdateStudent = () => {
    updateSubject({
      id,
      name,
      classroom,
      teacher,
      students,
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
          onPress={() => navigation.navigate('Subjects')}>
          <Entypo name="circle-with-cross" size={25} color="#fff" />
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
            placeholder="Please enter the full name"
            value={name}
            handleChange={(input: string) => dispatch(changeName(input))}
            handleSubmit={input => validateField(input)}
          />
          <StudentForm
            label="Age"
            placeholder="Who's the teacher?"
            value={teacher}
            handleChange={(input: string) => dispatch(changeAge(input))}
            handleSubmit={input => validateAge(input)}
          />
          <StudentForm
            label="Email"
            placeholder="Please specify the classroom code"
            value={classroom}
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
              <Text className="font-medium">Students in the same class</Text>
            </View>
            <View className="h-px w-full bg-slate-400 my-2" />
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
