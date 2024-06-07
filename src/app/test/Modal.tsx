// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className='p-4'>
        <button
            type="button"
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
