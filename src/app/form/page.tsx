// pages/form.tsx
"use client";
import React from 'react';
import MyForm from '../components/MyForm';
import ComplexConflictForm from '../components/ConflictDrivenForm';
import DynamicForm from '../components/DynamicForm';

const FormPage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1>My Form</h1>
      {/* <MyForm /> */}
      <DynamicForm/>
    </div>
  );
};

export default FormPage;
