import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "http://localhost:5000/api/polls";

export default function App() {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const fetchPolls = async () => {
    const res = await axios.get(API);
    setPolls(res.data);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const createPoll = async () => {
    if (!question || options.some(o => !o)) return alert("Fill all fields");

    await axios.post(API, { question, options });
    setQuestion("");
    setOptions(["", ""]);
    fetchPolls();
  };

  const vote = async (id, i) => {
    const key = `voted_${id}`;
    if (localStorage.getItem(key)) return alert("Already voted");

    await axios.post(`${API}/${id}/vote`, { optionIndex: i });
    localStorage.setItem(key, true);
    fetchPolls();
  };

  const deletePoll = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchPolls();
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-black to-gray-900 text-white">
      
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
         Poll App
      </motion.h1>

      {/* Create Poll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-lg mb-4 text-cyan-400">Create Poll</h2>

        <input
          className="w-full p-3 mb-3 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-400"
          placeholder="Question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, i) => (
          <input
            key={i}
            className="w-full p-3 mb-2 rounded bg-gray-800 border border-gray-700"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              let arr = [...options];
              arr[i] = e.target.value;
              setOptions(arr);
            }}
          />
        ))}

        <div className="flex gap-3 mt-3">
          {options.length < 4 && (
            <button
              onClick={() => setOptions([...options, ""])}
              className="px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              + Add
            </button>
          )}

          <button
            onClick={createPoll}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded shadow-lg hover:scale-105 transition"
          >
            Create
          </button>
        </div>
      </motion.div>

      {/* Poll List */}
      <div className="max-w-xl mx-auto mt-10 space-y-6">
        {polls.map((p, idx) => {
          const total = p.options.reduce((a, b) => a + b.votes, 0);

          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition"
            >
              <h3 className="text-lg font-semibold mb-4">{p.question}</h3>

              {p.options.map((o, i) => {
                const percent = total ? (o.votes / total) * 100 : 0;
                const voted = localStorage.getItem(`voted_${p._id}`);

                return (
                  <div key={i} className="mb-4">
                    <button
                      disabled={voted}
                      onClick={() => vote(p._id, i)}
                      className={`w-full text-left p-3 rounded transition ${
                        voted
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      {o.text}
                    </button>

                    <div className="w-full bg-gray-700 h-3 rounded mt-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: percent + "%" }}
                        transition={{ duration: 0.6 }}
                        className="h-3 bg-gradient-to-r from-cyan-400 to-blue-500"
                      ></motion.div>
                    </div>

                    <p className="text-xs text-gray-300 mt-1">
                      {o.votes} votes • {percent.toFixed(1)}%
                    </p>
                  </div>
                );
              })}

              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <span>Total: {total}</span>
                <button
                  onClick={() => deletePoll(p._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}