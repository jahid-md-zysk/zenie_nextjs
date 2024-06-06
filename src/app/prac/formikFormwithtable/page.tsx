// pages/index.tsx
"use client";
import Head from 'next/head';
import React, { useState } from 'react';
import Modal from './Modal';
import FormikTable from './FormikTable';

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Next.js Modal</title>
        <meta name="description" content="Example of using a modal in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-8 bg-white rounded shadow-md w-full max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Next.js Modal Example</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Open Modal
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="User Permissions">
          <FormikTable />
        </Modal>
      </main>
    </div>
  );
};

export default Home;
