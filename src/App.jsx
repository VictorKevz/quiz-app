import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Form from "./components/Form";
import Questions from "./components/Questions";
import { containerVariants } from "./variants";
import "./App.css";

function App() {
  const [checked, setChecked] = useState(()=>{
    const savedTheme = localStorage.getItem("theme");
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });
  const [startQuiz, setStartQuiz] = useState(()=>{
    const savedQuizState = localStorage.getItem("quizState")
    return savedQuizState !== null ? JSON.parse(savedQuizState) : false
  });

  const [selectedSubject, setSelectedSuject] = useState(() => {
    const savedSubject = localStorage.getItem("subject");
    return savedSubject !== null ? JSON.parse(savedSubject) : ""

  });
  const restart = () => {
    setSelectedSuject("");
    setStartQuiz(false);
  };

  //Load saved theme and subject on refresh
 

  //Save theme and subject when their state change
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(checked));
    localStorage.setItem("subject", JSON.stringify(selectedSubject));
    localStorage.setItem("quizState", JSON.stringify(startQuiz));
  }, [checked,selectedSubject,startQuiz]);

  return (
    <main className={`outer-container ${!checked && "bg-light"}`}>
      <Header checked={checked} setChecked={setChecked} />
      <motion.div
        className={`inner-container ${!checked && "card-bg-light"}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>
    </main>
  );
}

export default App;
