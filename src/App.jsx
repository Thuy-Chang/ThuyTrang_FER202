import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";

const QuizContext = createContext();

const initialQuizData = [
  {
    question: "What is ReactJS?",
    answers: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
  {
    question: "What is JSX?",
    answers: [
      "A programming language",
      "A file format",
      "A syntax extension for JavaScript",
    ],
    correctAnswer: "A syntax extension for JavaScript",
  },
];

function QuizProvider({ children }) {
  const [questions, setQuestions] = useState(initialQuizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    console.log("Question list has been updated:", questions);
  }, [questions]);

  const addQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const chooseAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    if (selectedAnswer === "") {
      alert("Please select an answer before continuing!");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setResultMessage("Correct answer!");
    } else {
      setResultMessage("Incorrect answer!");
    }

    setTimeout(() => {
      setResultMessage("");
      setSelectedAnswer("");

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsCompleted(true);
      }
    }, 600);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setIsCompleted(false);
    setResultMessage("");
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        selectedAnswer,
        score,
        isCompleted,
        resultMessage,
        addQuestion,
        chooseAnswer,
        nextQuestion,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function AddQuestionForm() {
  const { addQuestion } = useContext(QuizContext);

  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      question.trim() === "" ||
      answer1.trim() === "" ||
      answer2.trim() === "" ||
      answer3.trim() === "" ||
      correctAnswer.trim() === ""
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const answers = [answer1.trim(), answer2.trim(), answer3.trim()];

    if (!answers.includes(correctAnswer.trim())) {
      alert("Correct answer must be exactly the same as one answer option!");
      return;
    }

    const newQuestion = {
      question: question.trim(),
      answers: answers,
      correctAnswer: correctAnswer.trim(),
    };

    addQuestion(newQuestion);

    setQuestion("");
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setCorrectAnswer("");

    alert("New question added successfully!");
  };

  return (
    <div className="form-card">
      <h2>Add New Question</h2>

      <form onSubmit={handleSubmit}>
        <label>Question</label>
        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />

        <label>Answer 1</label>
        <input
          type="text"
          placeholder="Enter answer 1"
          value={answer1}
          onChange={(event) => setAnswer1(event.target.value)}
        />

        <label>Answer 2</label>
        <input
          type="text"
          placeholder="Enter answer 2"
          value={answer2}
          onChange={(event) => setAnswer2(event.target.value)}
        />

        <label>Answer 3</label>
        <input
          type="text"
          placeholder="Enter answer 3"
          value={answer3}
          onChange={(event) => setAnswer3(event.target.value)}
        />

        <label>Correct Answer</label>
        <input
          type="text"
          placeholder="Correct answer must match one option"
          value={correctAnswer}
          onChange={(event) => setCorrectAnswer(event.target.value)}
        />

        <button type="submit" className="add-btn">
          Add Question
        </button>
      </form>
    </div>
  );
}

function Quiz() {
  const {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    score,
    isCompleted,
    resultMessage,
    chooseAnswer,
    nextQuestion,
    restartQuiz,
  } = useContext(QuizContext);

  const currentQuestion = questions[currentQuestionIndex];

  if (isCompleted) {
    return (
      <div className="quiz-card completed-card">
        <h1>Quiz Completed!</h1>
        <p className="score-text">Your score: {score}</p>
        <p className="total-text">Total questions: {questions.length}</p>

        <button className="next-btn" onClick={restartQuiz}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-card">
      <h2>Question {currentQuestionIndex + 1}</h2>

      <p className="question-text">{currentQuestion.question}</p>

      <div className="answers-box">
        {currentQuestion.answers.map((answer, index) => (
          <label
            key={index}
            className={
              selectedAnswer === answer
                ? "answer-option selected"
                : "answer-option"
            }
          >
            <input
              type="radio"
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => chooseAnswer(answer)}
            />
            {answer}
          </label>
        ))}
      </div>

      {resultMessage !== "" && (
        <p
          className={
            resultMessage === "Correct answer!"
              ? "result correct"
              : "result incorrect"
          }
        >
          {resultMessage}
        </p>
      )}

      <button className="next-btn" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
}

function App() {
  return (
    <QuizProvider>
      <div className="app">
        <header className="header">
          <div className="logo-box">
            <div className="fake-logo">FPT</div>
            <span>FPT University</span>
          </div>
        </header>

        <main className="main-layout">
          <AddQuestionForm />
          <Quiz />
        </main>
      </div>
    </QuizProvider>
  );
}

export default App;