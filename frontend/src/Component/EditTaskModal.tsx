import React from "react";
// import { X } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: any) => void;
  task: any;
}

const EditTaskModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
}) => {
  const [editedTask, setEditedTask] = React.useState(task);

  React.useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!isOpen) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="size-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    Deactivate account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone.
                    </p>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b pb-3">
                          <h2 className="text-lg font-semibold text-gray-800">
                            Edit Task
                          </h2>
                          <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-800"
                          >
                            <RxCross2 size={20} />
                          </button>
                        </div>

                        {/* Task Name */}
                        <div className="mt-4">
                          <label className="block text-gray-700 font-medium mb-1">
                            Task Name:
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={editedTask.name}
                            onChange={(e) =>
                              setEditedTask({
                                ...editedTask,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Status Dropdown */}
                        <div className="mt-4">
                          <label className="block text-gray-700 font-medium mb-1">
                            Status:
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={editedTask.status}
                            onChange={(e) =>
                              setEditedTask({
                                ...editedTask,
                                status: e.target.value,
                              })
                            }
                          >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end mt-6 space-x-3">
                          <button
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                            onClick={onClose}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => onSave(editedTask)}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
