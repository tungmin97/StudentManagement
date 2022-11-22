import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StudentState, SubjectState } from '../types/types';

const baseURL: string = 'https://6375b19eb5f0e1eb85f6d9b8.mockapi.io';

export const getData = createApi({
  reducerPath: 'getData',
  tagTypes: ['Students', 'Subjects'],
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: builder => ({
    getAllSubjects: builder.query<SubjectState[], number>({
      query: page => `/subjects/?page=${page}&limit=10`,
      // providesTags: ['Subjects'],
    }),

    getAllStudents: builder.query<StudentState[], number>({
      query: page => `/students/?page=${page}&limit=5`,
      // providesTags: [{ type: 'Students' }],
    }),

    getStudent: builder.query<StudentState, number | undefined>({
      query: id => `/students/${id}`,
      providesTags: [{ type: 'Students' }],
    }),

    getSubject: builder.query<SubjectState, number>({
      query: id => `/subjects/${id}`,
      providesTags: [{ type: 'Subjects' }],
    }),

    getListSubjects: builder.query<SubjectState[], void>({
      query: () => '/subjects',
    }),

    updateStudentSubjects: builder.mutation<void, StudentState>({
      query: ({ id, ...rest }) => ({
        url: `/students/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Students' }],
    }),

    addStudent: builder.mutation<void, Partial<StudentState>>({
      query: options => ({
        url: '/students',
        method: 'POST',
        body: options,
      }),
    }),

    updateSubject: builder.mutation<void, SubjectState>({
      query: ({ id, ...rest }) => ({
        url: `/subjects/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Subjects' }],
    }),

    addSubject: builder.mutation<void, Partial<SubjectState>>({
      query: options => ({
        url: '/subjects',
        method: 'POST',
        body: options,
      }),
    }),
  }),
});

export const {
  useLazyGetAllSubjectsQuery,
  useLazyGetAllStudentsQuery,
  useGetStudentQuery,
  useGetSubjectQuery,
  useLazyGetStudentQuery,
  useGetListSubjectsQuery,
  useUpdateStudentSubjectsMutation,
  useAddStudentMutation,
  useUpdateSubjectMutation,
} = getData;
