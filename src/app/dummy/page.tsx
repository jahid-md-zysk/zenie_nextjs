"use client";
import React from 'react';
import DynamicForm from './dynform';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Dynamic Form</h1>
        <DynamicForm />
      </div>
    </div>
  );
};

export default Home;
