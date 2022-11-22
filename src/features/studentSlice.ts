import { createSlice } from '@reduxjs/toolkit';
import { StudentSlice, StudentSubjects } from '../types/types';

const initialState: StudentSlice = {
  name: '',
  age: 0,
  email: '',
  avatar: '',
  subjects: [],
  allSubjects: [],
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetField: () => ({
      ...initialState,
    }),
    changeAge: (state, { payload }) => {
      state.age = payload;
    },
    changeName: (state, { payload }) => {
      state.name = payload;
    },
    changeEmail: (state, { payload }) => {
      state.email = payload;
    },
    changeAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
    addSubject: (state, { payload }) => {
      state.subjects = [
        ...state.subjects,
        { id: payload.id, name: payload.name },
      ];
    },
    removeSubject: (state, { payload }) => {
      state.subjects = state.subjects.filter(
        subject => subject.id !== payload.id,
      );
    },
    populateSubjects: (state, { payload }) => {
      state.allSubjects = payload.map((item: StudentSubjects) => ({
        id: item.id,
        name: item.name,
      }));
    },
    populateStudentSubjects: (state, { payload }) => {
      state.subjects = payload;
    },
  },
});

export const {
  resetField,
  changeAge,
  changeName,
  changeEmail,
  changeAvatar,
  addSubject,
  removeSubject,
  populateSubjects,
  populateStudentSubjects,
} = studentSlice.actions;

export default studentSlice.reducer;
