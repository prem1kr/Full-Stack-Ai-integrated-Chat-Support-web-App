import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Paperclip, Plus } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Chat = ({ userId, messages ,setMessages, triggerSidebarRefresh = [] }) => {
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [convoId, setConvoId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/${userId}`);
        if (res.data && res.data.messages) {
          setChatLog(res.data.messages);
          setConvoId(res.data._id);
          scrollToBottom();
        }
      } catch (err) {
        console.error("Error fetching conversation:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [userId]);

  useEffect(() => {
    if (messages.length > 0) {
      setChatLog(messages);
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { from: "user", text: message };
    setChatLog((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message,
          userId,
          convoId: convoId || undefined,
        },
        { withCredentials: true }
      );

      const botReply = res.data.reply || "No response";
      const botMessage = { from: "bot", text: botReply };
      setChatLog((prev) => [...prev, botMessage]);

      if (res.data.convoId) setConvoId(res.data.convoId);
    } catch (error) {
      console.error("Send error:", error);
      setChatLog((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/chat/new", { userId });
      if (res.data._id) {
        setConvoId(res.data._id);
        setChatLog([]);
        setMessage("");
        setIsTyping(false);
        setMessages([]);
        triggerSidebarRefresh(); 
      }
    } catch (err) {
      console.error("Failed to start new conversation:", err.message);
      alert("Could not start a new conversation. Try again.");
    }
  };




  return (
    <div className="flex flex-col h-full p-6 bg-base-100">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-primary">AI Assistant</h2>
          <p className="text-sm text-base-content/70">You're chatting with AI</p>
        </div>
        <button
          className="btn btn-outline btn-sm flex items-center gap-1"
          onClick={handleNewChat}
        >
          <Plus size={16} /> New Chat
        </button>
      </div>

      {/* Chat Log */}
      <div className="flex-1 overflow-y-auto mb-4 pr-1 space-y-3 custom-scroll max-w-100 overflow-x-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {chatLog.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
               className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm whitespace-pre-wrap break-words overflow-hidden ${
               msg.from === "user"
               ? "bg-primary text-primary-content"
                   : "bg-base-300 text-base-content"
              }`}
                  >

                {msg.from === "bot" ? (
                <div className="break-words">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    ) : (
                   msg.text
                     )}

                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="italic animate-pulse bg-base-300 text-base-content px-4 py-2 rounded-2xl max-w-[80%]">
                  AI is typing...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form className="flex items-center gap-2" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <label className="btn btn-square btn-outline">
          <input type="file" hidden />
          <Paperclip className="w-5 h-5" />
        </label>

        <button type="submit" className="btn btn-primary" disabled={isTyping}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
