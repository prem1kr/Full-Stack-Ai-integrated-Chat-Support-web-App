import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import axios from 'axios';
import { MessageSquareText } from 'lucide-react';

const Sidebar = forwardRef(({ userId, setMessages }, ref) => {
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);

  const fetchConversation = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://full-stack-ai-powered-chat-support.onrender.com/api/chat/${userId}`, {
        withCredentials: true,
      });

      const messages = res.data.messages || [];
      const filteredUserMessages = messages.filter((_, index) => index % 2 === 0);

      setUserMessages(filteredUserMessages);
      setMessages && setMessages(messages);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    refreshSidebar: fetchConversation,
  }));

  useEffect(() => {
    if (userId) fetchConversation();
  }, [userId]);

  const handleSelectChat = async (idx) => {
    setSelectedChatIndex(idx);
    setChatLoading(true);
    try {
      const res = await axios.get(
        `https://full-stack-ai-powered-chat-support.onrender.com/api/chat/${userId}`,
        { withCredentials: true }
      );
      const messages = res.data.messages || [];
      const selectedPair = messages.slice(idx * 2, idx * 2 + 2);
      setMessages && setMessages(selectedPair);
    } catch (error) {
      console.error('Error loading selected chat:', error);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <aside className="w-72 bg-base-100 p-5 shadow-lg border-r border-base-300 h-full overflow-y-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-extrabold text-primary tracking-wide">Chat List</h2>
        <button
          onClick={fetchConversation}
          className="mt-2 text-xs text-primary hover:underline"
        >
          ⟳ Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center text-gray-400">
          Loading...
        </div>
      ) : userMessages.length === 0 ? (
        <div className="text-center text-gray-500">
          No conversations found.
        </div>
      ) : (
        <ul className="space-y-2">
          {userMessages.map((msg, idx) => (
            <li
              key={idx}
              onClick={() => !chatLoading && handleSelectChat(idx)}
              className={`p-3 rounded-xl cursor-pointer transition-all ${
                selectedChatIndex === idx
                  ? 'bg-primary text-white'
                  : 'bg-base-300 hover:bg-base-200 text-gray-200'
              }`}
              title={msg.text}
            >
              {selectedChatIndex === idx && chatLoading ? (
                <div className="flex justify-center items-center h-16">
                  <p className="text-sm font-semibold text-yellow-300">
                    Loading chat...
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary rounded-full text-white">
                    <MessageSquareText size={18} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">
                      Chat {idx + 1}: {msg.text}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
});

export default Sidebar;
