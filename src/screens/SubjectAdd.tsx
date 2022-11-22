import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import StudentForm from '../components/Students/StudentForm';
import { useAppDispatch, useAppSelector } from '../app/store';
import { validateField } from '../utils/helper';
import { useAddSubjectMutation } from '../features/apiSlice';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { SubjectAddProps } from '../types/types';
import Toast from 'react-native-toast-message';
import {
  changeClassroom,
  changeSubject,
  changeTeacher,
} from '../features/subjectSlice';
import { resetField } from '../features/studentSlice';

export default function SubjectAdd({ navigation }: SubjectAddProps) {
  const [addSubject] = useAddSubjectMutation();
  const dispatch = useAppDispatch();

  const { name, classroom, teacher, students } = useAppSelector(
    state => state.subject,
  );

  useEffect(() => {
    dispatch(resetField());
  }, [dispatch]);

  const handleAddSubject = () => {
    if (!name || !classroom || !teacher) {
      Toast.show({
        type: 'error',
        text1: 'You must fill all required fields',
      });
      return;
    } else {
      addSubject({
        name,
        teacher,
        classroom,
        students,
      });
      navigation.navigate('Subjects');
    }
  };
  return (
    <ScrollView>
      <View className="basis-2/3 p-5 bg-slate-500 rounded-b-3xl">
        <TouchableOpacity
          className="self-end"
          onPress={() => navigation.navigate('Subjects')}>
          <Entypo name="circle-with-cross" size={25} color="#fff" />
        </TouchableOpacity>
        <Text className="text-center font-bold text-2xl text-slate-200 mb-3">
          Add New Subject
        </Text>
      </View>
      <View className="p-3 mt-5">
        <View className="p-5 pt-1">
          <StudentForm
            label="Class Name"
            placeholder="Please enter the full name"
            value=""
            handleChange={input => dispatch(changeSubject(input))}
            handleSubmit={(input: string) => validateField(input)}
          />
          <StudentForm
            label="Teacher"
            placeholder="Who's the teacher"
            value=""
            handleChange={input => dispatch(changeTeacher(input))}
            handleSubmit={input => validateField(input)}
          />
          <StudentForm
            label="Classroom"
            placeholder="Please enter your classroom code"
            value=""
            handleChange={input => dispatch(changeClassroom(input))}
            handleSubmit={input => validateField(input)}
          />
        </View>
        <TouchableOpacity
          className="p-3 justify-center items-center"
          onPress={handleAddSubject}>
          <View>
            <Text>Proceed</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
