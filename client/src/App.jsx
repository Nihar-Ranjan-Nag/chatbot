import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { from: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/show', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inp: trimmed }),
      });

      const data = await res.json();
      const botReply = data?.Message || 'No response received.';
      setMessages((prev) => [...prev, { from: 'bot', text: botReply }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [...prev, { from: 'bot', text: 'Error fetching response.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md flex flex-col h-[600px]">


        <div className="bg-gray-100 p-4 border-b flex items-center gap-3 border-gray-300">
          <img src="chatbot.png" alt="AI Bot" className="w-10 h-10" />
          <h1 className="text-xl font-bold text-gray-800">AI Assist</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >

              {msg.from === 'bot' && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                  alt="bot avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}

              <div
                className={`p-3 rounded-lg max-w-xs text-sm shadow ${msg.from === 'user' ? 'bg-blue-100' : 'bg-green-200'
                  }`}
              >
                {msg.text}
              </div>

              {msg.from === 'user' && (
                <img
                  src="boy.png"
                  alt="user avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </div>
          ))}


          {loading && (
            <div className="flex items-end gap-2 justify-start">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                alt="bot avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="p-3 bg-green-200 rounded-lg max-w-xs text-sm shadow animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>


        <div className="border-t border-gray-300 p-3 flex items-center gap-2 bg-gray-50">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
