import { createSlice } from '@reduxjs/toolkit';
import { SubjectSlice } from '../types/types';

const initialState: SubjectSlice = {
  name: '',
  teacher: '',
  classroom: '',
  students: [],
};

export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    resetField: () => ({
      ...initialState,
    }),
    changeTeacher: (state, { payload }) => {
      state.teacher = payload;
    },
    changeName: (state, { payload }) => {
      state.name = payload;
    },
    changeClassroom: (state, { payload }) => {
      state.classroom = payload;
    },
    addStudent: (state, { payload }) => {
      state.students = [
        ...state.students,
        { id: payload.id, name: payload.name },
      ];
    },
    removeStudent: (state, { payload }) => {
      state.students = state.students.filter(
        student => student.id !== payload.id,
      );
    },
    // populateStudents: (state, { payload }) => {
    //   state.allSubjects = payload.map((item: StudentSubjects) => ({
    //     id: item.id,
    //     name: item.name,
    //   }));
    // },
    populateSubjectsStudent: (state, { payload }) => {
      state.students = payload;
    },
  },
});

export const {
  resetField,
  changeClassroom,
  changeName,
  changeTeacher,
  addStudent,
  removeStudent,
  populateSubjectsStudent,
} = subjectSlice.actions;

export default subjectSlice.reducer;
