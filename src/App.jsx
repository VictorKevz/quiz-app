import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Questions from "./components/Questions";
import "./App.css";

function App() {
  const [checked, setChecked] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);

  const [selectedSubject, setSelectedSuject] = useState("");
  const restart = () => {
    setSelectedSuject("");
    setStartQuiz(false)
  };
  return (
    <main className={`outer-container ${!checked && "bg-light"}`}>
      <Header checked={checked} setChecked={setChecked} />
      <div className={`inner-container ${!checked && "card-bg-light"}`}>
        {startQuiz && selectedSubject ? (
          <Questions
            selectedSubject={selectedSubject}
            setSelectedSuject={setSelectedSuject}
            onRestart={restart}
            checked={checked}

          />
        ) : (
          <Form
            selectedSubject={selectedSubject}
            setSelectedSuject={setSelectedSuject}
            setStartQuiz={setStartQuiz}
            checked={checked}
          />
        )}
      </div>
    </main>
  );
}

export default App;
