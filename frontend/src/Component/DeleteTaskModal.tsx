import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onDelete: () => void;
}

const DeleteTaskModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-black">Confirm Deletion</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="flex justify-end mt-4 space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
