/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import ProtoTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Question from 'Question';
import { THEME } from '../constant';
import SettingsIcons from './SettingsIcons';
import blueBlob from '../images/blueBlob.png';
import yellowBlob from '../images/yellowBlob.png';

Quiz.ProtoTypes = {
  toggleIsHome: ProtoTypes.func,
  formData: ProtoTypes.object,
  theme: ProtoTypes.string,
  toggleTheme: ProtoTypes.func,
};

export default function Quiz({
  toggleIsHome, formData, theme, toggleTheme,
}) {
  const [quizData, setQuizData] = useState([]);
  const [isShowAnswers, setIsShowAnswers] = useState(false);
  const [resetQuiz, setResetQuiz] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {
    amountOfQuestions, answerType, category, difficulty,
  } = formData;

  useEffect(() => {
    let apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${category}&difficulty=${difficulty}`;
    if (category === 'any') {
      apiLink = `https://opentdb.com/api.php?amount=${amountOfQuestions}&difficulty=${difficulty}`;
    }
    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => {
        setQuizData(() => data.results.map((question) => {
          const incorrect = question.incorrect_answers.map((answer) => ({
            value: answer, id: nanoid(), isHeld: false, isCorrect: false,
          }));

          const correct = {
            value: question.correct_answer, id: nanoid(), isHeld: false, isCorrect: true,
          };

          let allAnswersArr = [...incorrect];
          const randomNum = Math.floor(Math.random() * 4);
          allAnswersArr.splice(randomNum, 0, correct);

          /* T/F AnswersArr logic */
          if (question.type === 'boolean') {
            if (correct.value === 'True') {
              allAnswersArr = [correct, incorrect[0]];
            } else {
              allAnswersArr = [incorrect[0], correct];
            }
          }

          return { ...question, allAnswers: allAnswersArr, id: nanoid() };
        }));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [resetQuiz, amountOfQuestions, answerType, category, difficulty]);

  // question ID & answerID mathe the correct answer and update held
  // answerID is made in Question.js with .map(_, _.id)
  function updateHeld(qID, aID) {
    setQuizData((prevQuizData) => prevQuizData.map((question) => {
      if (qID !== question.id) {
        return question;
      }
      const newAnswers = question.allAnswers.map((answer) => (answer.id === aID
        ? { ...answer, isHeld: !answer.isHeld }
        : { ...answer, isHeld: false }));
      return { ...question, allAnswers: newAnswers };
    }));
  }

  function checkAnswers() {
    setIsShowAnswers(true);
  }

  let score = 0;

  if (isShowAnswers) {
    quizData.map((question) => question.allAnswers.forEach((answer) => (answer.isHeld && answer.isCorrect ? score++ : score)));
  }

  /* Snap scrolling on play again */
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.innerWidth > 600 ? 'auto' : 'smooth',
    });
  };

  function reset() {
    setIsShowAnswers(false);
    setResetQuiz((prev) => prev + 1);
    goToTop();
  }

  const questionElements = quizData.map((question, index) => (
    <Question
      key={nanoid()}
      question={question.question}
      allAnswers={question.allAnswers}
      updateHeld={updateHeld}
      questionIndex={index}
      qID={question.id}
      isShowAnswers={isShowAnswers}
      type={question.type}
    />
  ));

  const buttonElements = !isShowAnswers
    ? (
      <div className="quiz__footer">
        <button className="btn quiz__btn" onClick={checkAnswers}>Check Answers</button>
      </div>
    )
    : (
      <div className="quiz__footer quiz__footer--finished">
        <p className="quiz__finalText">{`You Scored ${score}/${formData.amountOfQuestions} answers`}</p>
        <button className="btn quiz__btn" onClick={reset}>Play Again</button>
      </div>
    );

  const customTheme = THEME[theme];

  return (
    <div className="quiz" style={customTheme}>

      {
                isLoading
                  ? (
                    <div className="quiz__loadingBox">
                      <h3 className="quiz__loadingText">One moment please...</h3>
                    </div>
                  )
                  : (
                    <>
                      <div className="quiz__header">
                        <h2 className="logo" onClick={toggleIsHome}>
                          Quizzical
                        </h2>
                        <div className="settingsIconsQuiz">
                          <SettingsIcons
                            toggleIsHome={toggleIsHome}
                            theme={theme}
                            toggleTheme={toggleTheme}
                          />
                        </div>
                      </div>

                      <div className="quiz__answers">
                        {questionElements}
                        {buttonElements}
                      </div>
                    </>
                  )
            }
      <img className="yellowBlob" src={yellowBlob} alt="" />
      <img className="blueBlob" src={blueBlob} alt="" />
    </div>
  );
}
