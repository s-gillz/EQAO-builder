import React, { useState, useEffect, useCallback } from "react";
import { Printer, RefreshCw, Wand2, GraduationCap, Layers } from "lucide-react";

export default function App() {
  const [grade, setGrade] = useState(6);
  const [strand, setStrand] = useState("All");
  const [qCount, setQCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const curriculum = {
    6: {
      Number: [
        {
          text: "What is 3^4?",
          answer: "81",
          options: ["12", "27", "81", "64"]
        }
      ],
      Algebra: [
        {
          text: "Solve 4x + 12 = 32",
          answer: "5",
          options: ["4", "5", "6", "8"]
        }
      ]
    }
  };

  const generate = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const data = curriculum[grade];
      const strands = strand === "All" ? Object.keys(data) : [strand];

      const result = [];

      for (let i = 0; i < qCount; i++) {
        const s = strands[i % strands.length];
        const pool = data[s] || [];
        const q = pool[Math.floor(Math.random() * pool.length)];

        if (q) result.push(q);
      }

      setQuestions(result);
      setLoading(false);
    }, 300);
  }, [grade, strand, qCount]);

  useEffect(() => {
    generate();
  }, [grade]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black">EQAO AI Engine</h1>
          <button onClick={() => window.print()} className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Printer size={16} /> Print
          </button>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button onClick={() => setGrade(3)} className="px-4 py-2 bg-slate-200 rounded">Grade 3</button>
          <button onClick={() => setGrade(6)} className="px-4 py-2 bg-blue-500 text-white rounded">Grade 6</button>
          <button onClick={() => setGrade(9)} className="px-4 py-2 bg-slate-200 rounded">Grade 9</button>

          <button onClick={generate} className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2">
            <Wand2 size={16} /> Generate
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="text-blue-600 font-bold">Generating...</p>}

        {/* Questions */}
        <div className="space-y-4 mt-4">
          {questions.map((q, i) => (
            <div key={i} className="p-4 border rounded-xl">
              <p className="font-bold mb-2">Q{i + 1}. {q.text}</p>

              <div className="grid grid-cols-2 gap-2">
                {q.options?.map((o, idx) => (
                  <div key={idx} className="p-2 bg-slate-100 rounded">
                    {o}
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-2">
                Answer: {q.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
