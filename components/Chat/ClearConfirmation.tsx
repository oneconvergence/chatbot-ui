
import React from 'react';

interface ClearConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ClearConfirmation: React.FC<ClearConfirmationProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="absolute top-13 right-0 z-50 p-4 rounded bg-white shadow w-max-content h-max-content">
      <p className="mb-2 text-left text-neutral-700 dark:text-neutral-400">Do you want to clear all messages?</p>
      <div className="flex justify-end">
        <button
          className="mr-2 px-3 py-1 bg-black text-white rounded hover:bg-black hover:bg-opacity-80 focus:outline-none"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ClearConfirmation;


