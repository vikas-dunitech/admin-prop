import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4 bg-gray-100 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
