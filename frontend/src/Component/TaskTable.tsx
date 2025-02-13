import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface Task {
  id: number;
  user: string;
  project: string;
  team: string;
  status: string;
  budget: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      user: "Lindsey Curtis",
      project: "Agency Website",
      team: "A, B",
      status: "Active",
      budget: "3.9K",
    },
    {
      id: 2,
      user: "Kaiya George",
      project: "Technology",
      team: "C, D",
      status: "Pending",
      budget: "24.9K",
    },
    {
      id: 3,
      user: "Zain Geidt",
      project: "Blog Writing",
      team: "E",
      status: "Canceled",
      budget: "12.7K",
    },
    {
      id: 4,
      user: "Abram Schleifer",
      project: "Social Media",
      team: "F, G, H",
      status: "Active",
      budget: "2.8K",
    },
    {
      id: 5,
      user: "Carla George",
      project: "Website",
      team: "I, J",
      status: "Pending",
      budget: "4.5K",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setIsEditModalOpen(false);
  };

  const confirmDelete = () => {
    setTasks(tasks.filter((t) => t.id !== selectedTask?.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Task List</h2>
            <button className="px-4 py-2 text-white rounded-md bg-gray-800 transition">
              + Add New Task
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-black text-left">
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Project Name</th>
                  <th className="px-6 py-3">Team</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Budget</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b hover:bg-gray-100 transition text-left"
                  >
                    <td className="px-6 py-4 text-black whitespace-nowrap">
                      {task.user}
                    </td>
                    <td className="px-6 py-4 text-black whitespace-nowrap">
                      {task.project}
                    </td>
                    <td className="px-6 py-4 text-black whitespace-nowrap">
                      {task.team}
                    </td>
                    <td className="px-6 py-4 text-black whitespace-nowrap">
                      {task.status}
                    </td>
                    <td className="px-6 py-4 text-black whitespace-nowrap">
                      {task.budget}
                    </td>
                    <td className="px-6 py-4 flex justify-start space-x-3">
                      <button
                        className="px-3 py-2 flex items-center space-x-2 text-white rounded-md bg-gray-800 transition"
                        onClick={() => handleEdit(task)}
                      >
                        <FiEdit />
                        {/* <span>Edit</span> */}
                      </button>
                      <button
                        className="px-3 py-1 flex items-center space-x-2 text-white bg-red-700 rounded-md transition"
                        onClick={() => handleDelete(task)}
                      >
                        <FiTrash2 />
                        {/* <span>Delete</span> */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedTask && (
          <EditTaskModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSave}
            task={selectedTask}
          />
        )}

        {selectedTask && (
          <DeleteTaskModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={confirmDelete}
          />
        )}
      </div>
      {/* efewf */}
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
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
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
    </>
  );
};

export default TaskTable;
