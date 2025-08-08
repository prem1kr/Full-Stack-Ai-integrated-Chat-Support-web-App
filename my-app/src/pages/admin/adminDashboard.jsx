import React, { useEffect, useState } from "react";
import axios from "axios";
import Chat from "../../components/chat/chat.jsx";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";
import { useLocation } from "react-router-dom";
import { FiUsers } from "react-icons/fi"; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://ai-chat-app-backend-24sq.onrender.com/api/admin/user");
        setUsers(res.data.users);
        setSelectedUserId(null);
        setSelectedUserName("");
        setMessages([]);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [location]);

  const handleUserSelect = (userId, name) => {
    setSelectedUserId(userId);
    setSelectedUserName(name);
    setMessages([]);
    setSidebarOpen(false); 
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex h-screen overflow-hidden relative">

        <button
          className="lg:hidden absolute top-4 left-4 z-50 bg-primary text-white p-2 rounded-full shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiUsers size={20} />
        </button>


        <div
          className={`fixed lg:static top-0 left-0 h-full bg-base-200 p-4 border-r border-base-300 z-40 transition-transform transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 w-64 lg:w-1/4 overflow-y-auto`}
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Logged Users</h2>
          {users.map((user) => (
            <div
              key={user._id}
              className={`p-3 mb-2 rounded-xl cursor-pointer transition-all bg-base-100 hover:bg-base-300 text-base-content ${
                selectedUserId === user._id ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleUserSelect(user._id, user.name)}
            >
              <p className="text-md font-semibold">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          ))}
        </div>


        <div className="flex-1 bg-base-100 overflow-y-auto">
          {selectedUserId ? (
            <div className="h-full">
              <Chat
                userId={selectedUserId}
                messages={messages}
                setMessages={setMessages}
                userName={selectedUserName}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a user to view chats
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
