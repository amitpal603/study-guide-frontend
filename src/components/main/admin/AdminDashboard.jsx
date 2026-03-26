import React, { useState, useEffect, useContext } from "react";
import UploadContent from "./material/UploadContent";
import UserDetail from "./material/UserDetail";
import { userAuth } from "../../../context/StudyGuide";
import { useNavigate } from "react-router-dom";
import DeleteContent from "./material/DeleteContent";
import Query from "./material/Query";

function AdminDashboard() {
  const { user, data, setUrl } = useContext(userAuth);
  const [activeMenu, setActiveMenu] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDel , setIsDel] = useState(false)
  const [select , setSelect] = useState()
  const navigate = useNavigate();
 
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const adminMenu = [
    { id: 1, title: "Add Content", icon: "📝" },
    { id: 2, title: "Users Manage", icon: "👥" },
    { id: 3, title: "All Material", icon: "📚" },
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (isMobile) setIsSidebarOpen(false);
  };

  // Normalize: support both single object and array from context
  const adminUser = Array.isArray(user)
    ? (user.find((u) => u.role === "ADMIN") ?? user[0])
    : user;

  const showLabels = isSidebarOpen || isMobile;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50 flex relative">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isMobile ? "fixed left-0 top-0 h-full w-72 z-40" : "relative"}
          ${!isMobile && isSidebarOpen ? "w-72" : !isMobile ? "w-20" : "w-72"}
          bg-gradient-to-b from-[#355c7d] to-[#2a4a5e] text-white
          transition-all duration-500 ease-in-out shadow-2xl flex-shrink-0 flex flex-col
        `}
      >
        {/* Mobile Close */}
        {isMobile && isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-4 top-4 text-white hover:text-rose-300 transition-colors z-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 mt-16 sm:mt-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
              👨‍💼
            </div>
            {showLabels && (
              <div className="animate-fadeIn overflow-hidden">
                <h2 className="text-lg sm:text-xl font-bold truncate">
                  Admin Panel
                </h2>
                <p className="text-xs text-gray-300">Manage Everything</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="p-3 sm:p-4 space-y-2 flex-1">
          {adminMenu.map((menu, index) => (
            <button
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`w-full text-left px-3 sm:px-4 py-3 sm:py-4 rounded-xl transition-all duration-300
                flex items-center gap-3 sm:gap-4 group hover:scale-105 animate-slideInLeft
                ${
                  activeMenu === menu.id
                    ? "bg-rose-500 shadow-lg shadow-rose-500/50"
                    : "hover:bg-white/10"
                }`}
            >
              <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform duration-300 flex-shrink-0">
                {menu.icon}
              </span>
              {showLabels && (
                <span className="font-medium text-sm flex-1 truncate">
                  {menu.title}
                </span>
              )}
              {activeMenu === menu.id && (
                <span className="w-2 h-2 bg-white rounded-full animate-ping flex-shrink-0" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer — Admin User Info */}
        {adminUser && (
          <div className="p-3 sm:p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                {adminUser.username?.charAt(0).toUpperCase() ?? "A"}
              </div>
              {showLabels && (
                <div className="flex-1 animate-fadeIn overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {adminUser.username ?? "Admin"}
                  </p>
                  <p className="text-xs text-gray-300 truncate">
                    {adminUser.email ?? ""}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col overflow-hidden mt-20">
        {/* Top Bar */}
        <div className="bg-white shadow-md p-4 flex items-center gap-4 z-20">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg p-2 shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 truncate">
              Welcome Back{adminUser?.username ? `, ${adminUser.username}` : ""}
              ! 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
              Here's what's happening with your platform today.
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 animate-fadeIn">
            {activeMenu === 1 && <UploadContent />}
            {activeMenu === 2 && <UserDetail />}

            {activeMenu === 3 &&  (
              <>
              <Query/>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl animate-bounce">
                    📚
                  </span>
                  All Materials
                </h2>

                {!data || data.length === 0 ? (
                  <p className="text-gray-500 text-sm">No materials found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {data.map((material, index) => (
                      <div
                        key={material._id}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className="border-2 border-gray-100 rounded-xl p-4 sm:p-6 hover:border-rose-300
                          hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slideUp
                          cursor-pointer group flex flex-col gap-2"
                      >
                        <div className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform duration-300">
                          📄
                        </div>

                        <p className="font-bold text-sm sm:text-base text-gray-800 truncate">
                          {material.title ??
                            material.name ??
                            `Material #${index + 1}`}
                        </p>

                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                         University name : {material?.subject?.semester_id?.course_id?.university_id?.university_name.toUpperCase() ??
                            material.materialType ??
                            "No available university name."}
                        </p>

                        <p className="text-xs text-gray-400 truncate">
                          Course : {" "}
                          <span className="font-medium text-gray-500">
                            {material?.subject?.semester_id?.course_id?.course_name.toUpperCase() ?? "No available course name"}
                          </span>
                        </p>

                          <p className="text-xs text-gray-400 truncate">
                          Semester : {" "}
                          <span className="font-medium text-gray-500">
                            {material?.subject?.semester_id?.semester ?? "No available semester "}
                          </span>
                        </p>

                        <p className="text-xs text-gray-400 truncate">
                          Subject : {" "}
                          <span className="font-medium text-gray-500">
                            {material?.subject?.subjectName ?? "No available subject name"}
                          </span>
                        </p>
                        {material?.fileUrl && (
                          <button
                            onClick={() => {
                              setUrl(material.fileUrl);
                              navigate("/content-data-pdf");
                            }}
                            className="px-4 py-2 sm:px-5 sm:py-3 
             bg-blue-500 hover:bg-blue-600 
             text-white font-medium 
             rounded-xl shadow-md 
             active:scale-95 transition-all duration-200 
             w-full sm:w-auto"
                          >
                            Show PDF
                          </button>
                        )}

                        <div className="flex gap-2 mt-auto pt-2">
                          <button className="flex-1 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors duration-300 text-xs sm:text-sm">
                            Edit
                          </button>
                         <button 
                          onClick={() => {
                            setIsDel(true)
                            setSelect(material?._id)
                            
                          }}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-xs sm:text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.5s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
      `}</style>
      <DeleteContent isOpen={isDel}  setIsOpen={setIsDel} del={select}/>
    </div>
  );
}

export default AdminDashboard;
