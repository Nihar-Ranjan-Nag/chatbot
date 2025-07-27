import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/show', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inp: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { from: 'bot', text: data.Message || 'No response' }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { from: 'bot', text: 'Error fetching response.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md flex flex-col h-[600px]">
        <div className="bg-gray-100 p-4 border-b flex items-center border-gray-300">
          <img src="chatbot.png" alt="" className='w-10 h-10' />
          <h1 className="text-xl font-bold text-gray-800">AI Assist</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs text-sm shadow ${
                  msg.from === 'user' ? 'bg-blue-100' : 'bg-green-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
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
