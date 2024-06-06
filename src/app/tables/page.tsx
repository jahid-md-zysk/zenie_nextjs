// pages/form.tsx

import React from 'react';
import MyTable from '../components/Table';

const FormPage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center '>
      <h1>My Table</h1>
      <div className='w-1/3 py-4'>

      <MyTable />
      </div>
    </div>
  );
};

export default FormPage;