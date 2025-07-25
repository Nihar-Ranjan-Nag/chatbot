import './App.css';

function App() {
  return (
    <div className="w-full h-screen bg-slate-300 flex items-center justify-center">
      <div className="w-96 rounded-lg bg-gray-200 flex flex-col overflow-hidden shadow-lg">


        <div className="w-full border-b border-black flex items-center gap-4 p-3 bg-gray-100">
          <img src="chatbot.png" className="w-12 h-12 rounded-full" alt="Chatbot" />
          <h1 className="text-xl font-bold text-gray-800">AI Assist</h1>
        </div>


        <div className="flex-1 overflow-y-auto p-3 space-y-3">

          <div className="flex justify-end">
            <div className="bg-white p-3 rounded-lg max-w-xs shadow text-sm">
              Hi! How are you?
            </div>
          </div>


          <div className="flex justify-start">
            <div className="bg-green-200 p-3 rounded-lg max-w-xs shadow text-sm">
              I'm good, thanks! And you?
            </div>
          </div>
        </div>


        <div className="border-t border-gray-300 p-2 flex items-center gap-2 bg-gray-100">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
