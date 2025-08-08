import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Chat from "../../components/chat/chat.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";

const ChatWindow = () => {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [refreshSidebar, setRefreshSidebar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); 

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  if (!userId) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <>
      <Navbar onMenuClick={() => setShowSidebar((prev) => !prev)} />

      <div className="flex h-[calc(100vh-4rem)] bg-base-200 overflow-hidden relative">
        
        <div className="hidden md:block w-64 h-full overflow-y-auto overflow-x-hidden border-r border-base-300 shadow-md">
          <Sidebar
            userId={userId}
            setMessages={setMessages}
            refreshSidebar={refreshSidebar}
          />
        </div>

        <div
          className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="w-64 h-full bg-base-100 shadow-lg overflow-y-auto border-r border-base-300">
            <Sidebar
              userId={userId}
              setMessages={(msgs) => {
                setMessages(msgs);
                setShowSidebar(false); 
              }}
              refreshSidebar={refreshSidebar}
            />
          </div>
        </div>

        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}


        <div className="flex-1 h-full overflow-hidden">
          <Chat
            userId={userId}
            messages={messages}
            setMessages={setMessages}
            triggerSidebarRefresh={() => setRefreshSidebar((prev) => !prev)}
          />
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
