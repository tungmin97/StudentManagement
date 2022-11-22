export interface StudentState {
  id: number;
  name: string;
  avatar: string;
  email: string;
  age: number;
  subjects: StudentSubjects[];
}

export interface StudentSubjects {
  id: number;
  name: string;
}

export interface StudentSlice {
  name: string;
  age: number;
  email: string;
  avatar: string;
  subjects: StudentSubjects[];
  allSubjects: StudentSubjects[];
}

export interface SubjectState {
  id: number;
  name: string;
  teacher: string;
  classroom: string;
  students: SubjectStudents[];
}

export interface SubjectStudents {
  id: number;
  name: string;
}

export interface SubjectSlice {
  name: string;
  teacher: string;
  classroom: string;
  students: SubjectStudents[];
}

export interface StoreState {
  students: StudentState[];
  subjects: SubjectState[];
}

export interface QueryProps {
  page: number;
}

export interface FooterLoadingProps {
  hasReachedEnd: boolean;
  shouldLoad: boolean;
}

export interface StudentCardProps {
  item: StudentState;
}

export interface StudentFormProps {
  label: string;
  placeholder: string;
  value: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  handleChange: (arg: any) => void;
  handleSubmit: (arg: any) => void;
}

//Navigation Types
import type { StackScreenProps } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { KeyboardTypeOptions } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  StudentsHub: NavigatorScreenParams<StudentStackParamList>;
  SubjectsHub: NavigatorScreenParams<SubjectStackParamList>;
  NotFound: undefined;
};

export type StudentStackParamList = {
  Students: undefined;
  StudentDetails: { data: StudentState };
  StudentAdd: undefined;
};

export type SubjectStackParamList = {
  Subjects: undefined;
  SubjectDetails: { data: SubjectState };
  SubjectAdd: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type Props = NativeStackScreenProps<RootStackParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type StudentScreenProps = NativeStackScreenProps<
  StudentStackParamList,
  'Students'
>;

export type SubjectScreenProps = NativeStackScreenProps<
  SubjectStackParamList,
  'Subjects'
>;

export type StudentDetailsProps = NativeStackScreenProps<
  StudentStackParamList,
  'StudentDetails'
>;

export type SubjectDetailsProps = NativeStackScreenProps<
  SubjectStackParamList,
  'SubjectDetails'
>;

export type StudentAddProps = NativeStackScreenProps<
  StudentStackParamList,
  'StudentAdd'
>;

export type SubjectAddProps = NativeStackScreenProps<
  SubjectStackParamList,
  'SubjectAdd'
>;

export type StudentScreenNavigationProps = StudentScreenProps['navigation'];

export type SubjectScreemNavigationProps = SubjectScreenProps['navigation'];
