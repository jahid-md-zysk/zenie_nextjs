// pages/form.tsx

import React from 'react';
import MyForm from '../components/MyForm';

const FormPage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1>My Form</h1>
      <MyForm />
    </div>
  );
};

export default FormPage;
