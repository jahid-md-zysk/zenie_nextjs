"use client";

// pages/index.tsx
import React from 'react';
import DynamicForm from '@/app/components/dynamicsforms/DynamicForm';

const Home: React.FC = () => {
  const formFields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'subscribe', label: 'Subscribe to newsletter', type: 'checkbox' },
    {
      name: 'gender',
      label: 'Gender',
      type: 'radio',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
      ],
    },
  ];

  const handleSubmit = (values: { [key: string]: any }) => {
    console.log('Form data:', values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Dynamic Form with Formik</h1>
        <DynamicForm formFields={formFields} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;





// import React from 'react';
// import DynamicForm from '@/app/components/dynamicsforms/DynamicForm';

// const Home: React.FC = () => {
//   const formFields = [
//     { name: 'firstName', label: 'First Name', type: 'text' },
//     { name: 'lastName', label: 'Last Name', type: 'text' },
//     { name: 'email', label: 'Email', type: 'email' },
//     { name: 'comment', label: 'Comment', type: 'textarea' },
//   ];

//   const handleSubmit = (values: { [key: string]: any }) => {
//     console.log('Form data:', values);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
//         <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Dynamic Form with Formik</h1>
//         <DynamicForm formFields={formFields} onSubmit={handleSubmit} />
//       </div>
//     </div>
//   );
// };

// export default Home;

