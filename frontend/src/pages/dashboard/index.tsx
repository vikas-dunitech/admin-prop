import AdminLayout from "@/Component/Layout/AdminLayout";
import TaskTable from "@/Component/TaskTable";
import React, { ReactNode } from "react";

const index = () => {
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-black">Task Kanban</h1>
        <TaskTable />
      </div>
    </AdminLayout>
  );
};

export default index;
