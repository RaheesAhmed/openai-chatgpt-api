import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faTimes,
  faBars,
  faUser, // User icon
  faRobot, // AI icon
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      // Add user message with sender type
      setMessages([...messages, { text: trimmed, sender: "user" }]);
      setInput("");

      // Make request to your server for AI response
      try {
        const response = await axios.post(
          "http://localhost:3000/startConversation",
          { userMessage: trimmed }
        );
        const aiMessage = response.data.message; // Assuming the response contains the AI message
        setMessages((messages) => [
          ...messages,
          { text: aiMessage, sender: "ai" },
        ]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-800">
      {/* Open Sidebar Button */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 text-white z-10"
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-black text-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <button
              className="text-white text-lg font-bold"
              onClick={toggleSidebar}
            >
              New Chat
            </button>
            <FontAwesomeIcon icon={faTimes} onClick={toggleSidebar} />
          </div>
          <div className="p-4">
            <div>Chat 1</div>
            <div>Chat 2</div>
            <div>Chat 3</div>
            <div>Chat 4</div>
            <div>Chat 5</div>
          </div>
        </div>
      )}

      {/* Main Chat Window */}
      <div className="flex-grow flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-2xl h-full bg-gray-800 rounded-lg flex flex-col">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-white text-center mt-2 font-bold">
                How can I help you today?
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className="flex items-center text-white mb-2">
                <FontAwesomeIcon
                  icon={message.sender === "user" ? faUser : faRobot}
                  className="mr-2"
                />
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex justify-center p-4">
            <form onSubmit={handleSend} className="relative w-full">
              <input
                className="w-full p-4 pl-4 pr-10 text-white bg-gray-800 rounded-2xl border border-white focus:outline-none"
                placeholder="Send a message"
                value={input}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  style={{ color: "#fff" }}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
