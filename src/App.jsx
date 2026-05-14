import React, { useState } from "react";

export default function App() {
  const [grade, setGrade] = useState(6);

  const questions = {
    6: [
      "What is 3^4?",
      "Solve 4x + 12 = 32",
      "Convert 5/8 to decimal"
    ],
    3: ["45 + 12 = ?", "What is half of 10?"],
    9: ["Simplify (2x^2)^3"]
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>EQAO Generator</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setGrade(3)}>Grade 3</button>
        <button onClick={() => setGrade(6)}>Grade 6</button>
        <button onClick={() => setGrade(9)}>Grade 9</button>
      </div>

      <h2>Grade {grade} Questions</h2>

      <ul>
        {questions[grade].map((q, i) => (
          <li key={i} style={{ marginBottom: 10 }}>
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}
