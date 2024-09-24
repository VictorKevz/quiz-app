import React, { useState, useId, useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { toastVariants } from "../variants";
import data from "../data.json";
import "../css/questions.css";

function Questions({ selectedSubject, onRestart, checked }) {
  const [index, setIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [count, setCount] = useState(0);
  const total = data.quiz[selectedSubject].length;
  const currentQuestionAnswered = answeredQuestions[index] || {};

  const [showToast, setToast] = useState(false);

  const correctAnswer = data.quiz[selectedSubject][index].correct;
  // Update navigation............................
  const nextQuestion = () => {
    setIndex((prevIndex) => (prevIndex === total - 1 ? 0 : prevIndex + 1));
  };

  const prevQuestion = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  // Update Answers' state............................
  const updateAnswer = (i, userAnswer) => {
    setAnsweredQuestions((prevAnswered) => ({
      ...prevAnswered,
      [index]: {
        selectedOptionIndex: i,
        isCorrect: userAnswer === correctAnswer,
        isAnswered: true,
      },
    }));

    // Update score if correct answer
    if (userAnswer === correctAnswer) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  // const resetState = () => {
  //   setAnsweredQuestions({});
  //   setCount(0);
  //   setIndex(0);
  // };
  useEffect(() => {
    if (index + 1 === total && currentQuestionAnswered.isAnswered) {
      setToast(true);
      handleToast();
    }
  }, [index, total, currentQuestionAnswered]);

  const handleToast = () => {
    setTimeout(() => {
      setToast(false);
    }, 4000);
  };

  return (
    <section className={`questions-wrapper`}>
      <div className="questions-container">
        <h2 className={`question ${!checked && "heading-text-light"}`}>
          {`${index + 1}. ${data.quiz[selectedSubject][index].question}`}
        </h2>

        <p
          className={`score ${!checked && "score-text-light"}`}
        >{`Your Score: ${count}/${total}`}</p>

        <ul className="answers-wrapper">
          {data.quiz[selectedSubject][index].choices.map((option, i) => {
            const isCorrect = correctAnswer === option;
            const isSelected =
              currentQuestionAnswered.selectedOptionIndex === i;
            const isAnswered = currentQuestionAnswered.isAnswered;

            return (
              <li
                key={useId()}
                className={`option ${!checked && "option-light"} ${
                  isAnswered && isCorrect ? "correct" : ""
                } 
                ${isAnswered && isSelected && !isCorrect ? "wrong" : ""}
                
                `}
                onClick={!isAnswered ? () => updateAnswer(i, option) : null}
              >
                <button
                  type="button"
                  className={`option-btn ${!checked && "heading-text-light"}`}
                  disabled={isAnswered}
                >
                  {option}
                  {isAnswered && isCorrect && (
                    <ThumbUpAltIcon fontSize="large" className="option-icon" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <DoDisturbIcon fontSize="large" className="option-icon" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="navigation-buttons-wrapper">
          {index > 0 ? (
            <button
              type="button"
              className={`navigation-btn ${!checked && "btn-light"} `}
              onClick={prevQuestion}
            >
              <ArrowBackIosIcon fontSize="large" className="navigation-icon" />
              Previous
            </button>
          ) : (
            <button
              type="button"
              className="navigation-btn reset"
              onClick={onRestart}
            >
              <HomeIcon fontSize="large" className="navigation-icon" />
              Exit
            </button>
          )}
          {total === index + 1 && currentQuestionAnswered.isAnswered ? (
            <button
              type="button"
              className="navigation-btn reset"
              onClick={onRestart}
            >
              Restart{" "}
              <RestartAltIcon fontSize="large" className="navigation-icon" />
            </button>
          ) : (
            <button
              type="button"
              className={`navigation-btn ${!checked && "btn-light"}`}
              onClick={nextQuestion}
              disabled={!currentQuestionAnswered.isAnswered}
            >
              Next{" "}
              <ArrowForwardIosIcon
                fontSize="large"
                className="navigation-icon"
              />
            </button>
          )}
        </div>
       
      </div>
      {showToast && (
          <div className="toast-container">
            <AnimatePresence mode="wait">
            <motion.div 
            className="toast-wrapper"
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <h3 className="toast-title">Thank You!👍🏽</h3>
            <p className="totast-parag">
              🎉🥳Congratulations for completing the quiz!!
            </p>
          </motion.div>
          </AnimatePresence>
          </div>
        )}
    </section>
  );
}

export default Questions;
