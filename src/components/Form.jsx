import React from "react";
import { useId } from "react";
import "../css/form.css";
import htmlLogo from "../assets/images/html.svg";
import cssLogo from "../assets/images/css.svg";
import jsLogo from "../assets/images/javascript.svg";

function Form({ selectedSubject, setSelectedSuject, setStartQuiz, checked }) {
  const inputData = [
    {
      id: useId(),
      label: "HTML",
      name: "subject",
      logo: htmlLogo,
    },
    {
      id: useId(),
      label: "CSS",
      name: "subject",
      logo: cssLogo,
    },
    {
      id: useId(),
      label: "JavaScript",
      name: "subject",
      logo: jsLogo,
    },
  ];
  const handleChange = (e) => {
    const { checked, value } = e.target;
    setSelectedSuject(checked ? value : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSubject) {
      setStartQuiz(true);
    } else {
      alert("Please select a subject first");
      return;
    }
  };

  return (
    <section className={`form wrapper`}>
      <form onSubmit={handleSubmit} className="form-inner container">
        <div className="container field-container">
          {inputData.map((field) => {
            const isActive = selectedSubject === field.label;
            return (
              <fieldset key={field.id} className="field">
                <label
                  htmlFor={field.id}
                  className={`form-label ${!checked && "label-bg-light"} ${isActive && "active"}`}                >
                  <input
                    type="radio"
                    name={field.name}
                    value={field.label}
                    checked={isActive}
                    onChange={handleChange}
                    id={field.id}
                    className="form-input"
                  />
                  {field.label}
                  <img
                    src={field.logo}
                    alt={`${field.label} Logo`}
                    className="subject-icon"
                  />
                </label>
              </fieldset>
            );
          })}
        </div>
        <button type="submit" className={`submit-btn ${!checked && "btn-light"}`}>
          Start Quiz
        </button>
      </form>
    </section>
  );
}

export default Form;
