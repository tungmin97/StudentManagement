import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StudentScreen from '../screens/StudentScreen';
import SubjectScreen from '../screens/SubjectScreen';
import {
  RootStackParamList,
  StudentStackParamList,
  SubjectStackParamList,
} from '../types/types';
import StudentDetail from '../screens/StudentDetail';
import SubjectDetail from '../screens/SubjectDetail';
import StudentAdd from '../screens/StudentAdd';
import SubjectAdd from '../screens/SubjectAdd';

const HomeStack = createNativeStackNavigator<RootStackParamList>();
const StudentStack = createNativeStackNavigator<StudentStackParamList>();
const SubjectStack = createNativeStackNavigator<SubjectStackParamList>();

const StudentsHub = () => {
  return (
    <StudentStack.Navigator screenOptions={{ headerShown: false }}>
      <StudentStack.Screen name="Students" component={StudentScreen} />
      <StudentStack.Screen
        name="StudentAdd"
        component={StudentAdd}
        options={{ animation: 'slide_from_right' }}
      />
      <StudentStack.Screen
        name="StudentDetails"
        component={StudentDetail}
        options={{
          presentation: 'fullScreenModal',
          animation: 'fade_from_bottom',
        }}
      />
    </StudentStack.Navigator>
  );
};

const SubjectsHub = () => {
  return (
    <SubjectStack.Navigator screenOptions={{ headerShown: false }}>
      <SubjectStack.Screen name="Subjects" component={SubjectScreen} />
      <SubjectStack.Screen name="SubjectDetails" component={SubjectDetail} />
      <SubjectStack.Screen name="SubjectAdd" component={SubjectAdd} />
    </SubjectStack.Navigator>
  );
};

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="StudentsHub" component={StudentsHub} />
        <HomeStack.Screen name="SubjectsHub" component={SubjectsHub} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
