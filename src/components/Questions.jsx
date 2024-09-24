import React, { useState, useId, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import correctAudio from "../assets/audio/correct.mp3";
import wrongAudio from "../assets/audio/error.mp3";

import { toastVariants } from "../variants";
import { questionVariants } from "../variants";
import data from "../data.json";
import "../css/questions.css";

function Questions({ selectedSubject, onRestart, checked }) {
  const [index, setIndex] = useState(0);
  
  const [answeredQuestions, setAnsweredQuestions] = useState({});
 
  
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState("");
  const [showToast, setToast] = useState(false);

  const total = data.quiz[selectedSubject].length;
  const currentQuestionAnswered = answeredQuestions[index] || {};
  const correctAnswer = data.quiz[selectedSubject][index].correct;

  const correctSound = useRef(null);
  const wrongSound = useRef(null);

  useEffect(() => {
    correctSound.current = new Audio(correctAudio);
    wrongSound.current = new Audio(wrongAudio);

    // To reduce the volume
    correctSound.current.volume = 0.8;
    wrongSound.current.volume = 0.6;
  }, []);
  // Update navigation............................
  const nextQuestion = () => {
    setIndex((prevIndex) => (prevIndex === total - 1 ? 0 : prevIndex + 1));
    setDirection("right");
  };

  const prevQuestion = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    setDirection("left");
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
      correctSound.current.play();
    } else {
      wrongSound.current.play();
    }
  };

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
  

  // useEffect(() => {
  //   localStorage.setItem("progress", JSON.stringify(answeredQuestions,selectedSubject));
  // }, [answeredQuestions,selectedSubject]);
  return (
    <section className={`questions-wrapper`}>
      <AnimatePresence mode="wait">
        <motion.div
          className="questions-container"
          key={index}
          variants={questionVariants(direction)}
          initial="hidden"
          animate="visible"
        >
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
                      <ThumbUpAltIcon
                        fontSize="large"
                        className="option-icon"
                      />
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
                <ArrowBackIosIcon
                  fontSize="large"
                  className="navigation-icon"
                />
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
        </motion.div>
      </AnimatePresence>
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
