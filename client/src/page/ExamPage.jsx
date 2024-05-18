import React, { useState, useEffect } from "react";
import axios from "axios";
import erasenLweq from "../assets/erasenLweq.png";
import { Link } from "react-router-dom";
import "./style/Exampage.scss";

const ExamPage = () => {
  const [examDetails, setExamDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [nextButtonText, setNextButtonText] = useState("Next");
  const [examCompleted, setExamCompleted] = useState(false);
  const [examResult, setExamResult] = useState("");
  const [examTime, setExamTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timeUsed, setTimeUsed] = useState(0);
  const [countingUp, setCountingUp] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const examId = searchParams.get("examId");

        console.log("Fetching exam details...");

        const examResponse = await axios.get(
          `http://localhost:3000/exam/${examId}`
        );

        if (!examResponse.data) {
          console.error("Error: Exam data is undefined");
          return;
        }

        setExamDetails(examResponse.data);

        console.log("Exam details:", examResponse.data);

        const questionsResponse = await axios.get(
          `http://localhost:3000/exam/${examId}/questions`
        );

        if (!questionsResponse.data) {
          console.error("Error: Questions are undefined");
          return;
        }

        const questionsWithAnswers = questionsResponse.data.map((question) => ({
          ...question,
          correctAnswer: question.answer,
        }));

        setQuestions(questionsWithAnswers);

        const examTimeInHours = parseFloat(examResponse.data.time);
        startCountdown(examTimeInHours);
        setExamTime(examTimeInHours);
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
    };

    fetchExamDetails();
  }, []);

  const startCountdown = (hours) => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + hours);
    
    const interval = setInterval(() => {
      const currentTime = new Date();
      let timeDiff = endTime - currentTime;

      if (timeDiff <= 0) {
        clearInterval(interval);
        timeDiff = Math.abs(timeDiff);
        setCountingUp(true);
      }

      const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setTimeRemaining(
        `${hoursRemaining}:${minutesRemaining.toString().padStart(2, "0")}:${secondsRemaining.toString().padStart(2, "0")}`
      );

      if (done) {
        clearInterval(interval);
      }
    }, 1000);

    setTimerInterval(interval);
  };

  const handleSelectedRadio = (e) => {
    const { name, value } = e.target;
    setSelectedAnswers({ ...selectedAnswers, [name]: value });
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setNextButtonText("Next");
  };

  const handleNextQuestion = () => {
    if (!selectedAnswers[currentQuestion._id]) {
      alert("Please select an answer before proceeding to the next question.");
      return;
    }

    if (currentQuestionIndex === questions.length - 2) {
      setNextButtonText("Done");
    }

    if (currentQuestionIndex === questions.length - 1) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      let answeredQuestionsCount = 0;
      let correctAnswersCount = 0;
      const results = [];
  
      questions.forEach((question) => {
        const studentAnswer = selectedAnswers[question._id];
        const isCorrect = studentAnswer === question.correctAnswer;
  
        results.push({
          questionId: question._id,
          question: question.question,
          correctAnswer: question.correctAnswer,
          studentAnswer,
          isCorrect,
        });
  
        if (studentAnswer) {
          answeredQuestionsCount++;
          if (isCorrect) {
            correctAnswersCount++;
          }
        }
      });
  
      const resultMessage = `Result ${correctAnswersCount}/${answeredQuestionsCount}`;
      setExamCompleted(true);
      setExamResult(resultMessage);
  
      const [remainingHours, remainingMinutes, remainingSeconds] = timeRemaining
        .split(":")
        .map(Number);
      const totalTimeUsedInHours =
        examTime - (remainingHours + remainingMinutes / 60 + remainingSeconds / 3600);
  
      setTimeUsed(totalTimeUsedInHours.toFixed(2));
  
      const userId = sessionStorage.getItem("_id");
      const examId = new URLSearchParams(window.location.search).get("examId");
  
      // Send data to backend
      await axios.post("http://localhost:3000/examResult/save-exam", {
        examId,
        userId,
        correctAnswers: results,
        examResult: resultMessage,
        timeUsed: totalTimeUsedInHours.toFixed(2),
        allAnswers: selectedAnswers,
      });
  
      console.log("Exam Submission Data:");
      console.log({
        examId,
        userId,
        correctAnswers: results,
        examResult: resultMessage,
        timeUsed: totalTimeUsedInHours.toFixed(2),
        allAnswers: selectedAnswers, // Include all selected answers
      });
  
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };
  
  
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentQuestion
    ? selectedAnswers[currentQuestion._id]
    : null;

  if (!examDetails || questions.length === 0) {
    return <div>Loading...</div>;
  }

  console.log("Rendering ExamPage...");
  return (
    <div className="exam-page">
      <div className="left-decor"></div>

      <div className="info">
        <p className="name">{examDetails.name}</p>
        <p className="exam-name">{examDetails.department} Exam</p>
        <p className="amount-exam">{questions.length} Questions</p>
        <p
          className="time-remain"
          style={{ color: countingUp ? "red" : "green" }}
        >
          {countingUp
            ? `Extra Time: ${timeRemaining}`
            : `Time Remaining: ${timeRemaining}`}
        </p>
      </div>

      {examCompleted ? (
        <div className="result">
          <h1>{examDetails.name}</h1>
          <p className="email">{sessionStorage.getItem("email")}</p>
          <p className="exam-name">{examDetails.department} Exam</p>
          <p className="amount-exam">{questions.length} Questions</p>
          <p className="time-used">{`Time Used: ${timeUsed} hours`}</p>
          <p className="mark"> {examResult}</p>
          <Link className="close" to={"/student-dashboard"}>
            Close
          </Link>
        </div>
      ) : (
        <div className="exam">
          <div className="que">
            <p className="question-no">{`Q ${currentQuestionIndex + 1}`}</p>
            {currentQuestion && (
              <p className="question">{`Question: ${currentQuestion.question}`}</p>
            )}
          </div>
          <div className="answers">
            {["A", "B", "C", "D"].map((option) => (
              <label
                key={option}
                className={`radioGroup ${
                  selectedAnswer === option ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion._id}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleSelectedRadio}
                />
                {currentQuestion && currentQuestion[`choice${option}`]}
              </label>
            ))}
          </div>
          <div className="btn">
            <button className="previous" onClick={handlePreviousQuestion}>
              Previous
            </button>
            <button className="next" onClick={handleNextQuestion}>
              {nextButtonText}
            </button>
          </div>
        </div>
      )}

      <img className="logo" src={erasenLweq} alt="" />
    </div>
  );
};

export default ExamPage;
