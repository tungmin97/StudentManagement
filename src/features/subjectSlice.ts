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
    resetFieldSubject: () => ({
      ...initialState,
    }),
    changeTeacher: (state, { payload }) => {
      state.teacher = payload;
    },
    changeSubject: (state, { payload }) => {
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
    populateSubjectsStudent: (state, { payload }) => {
      state.students = payload;
    },
  },
});

export const {
  resetFieldSubject,
  changeClassroom,
  changeSubject,
  changeTeacher,
  addStudent,
  removeStudent,
  populateSubjectsStudent,
} = subjectSlice.actions;

export default subjectSlice.reducer;
