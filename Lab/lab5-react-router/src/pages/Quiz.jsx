import { useState } from 'react';
import { Link } from 'react-router-dom';

import quizQuestions from '../data/quizData';
import QuestionCard from '../components/QuestionCard';

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSelectAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;

    quizQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        totalScore += 1;
      }
    });

    setScore(totalScore);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setScore(null);
  };

  return (
    <main className="container page-section">
      <div className="page-heading">
        <p className="section-label">Online Quiz</p>
        <h1>ReactJS Quiz</h1>
        <p>
          Choose one answer for each question, then submit the quiz to see your
          final score.
        </p>
      </div>

      <div className="quiz-wrapper">
        {quizQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectedAnswer={answers[question.id]}
            onSelectAnswer={handleSelectAnswer}
          />
        ))}

        <div className="quiz-actions">
          <button className="btn btn-primary" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>

          <button className="btn btn-outline-primary" onClick={handleResetQuiz}>
            Reset
          </button>

          <Link to="/" className="btn btn-secondary">
            Back Home
          </Link>
        </div>

        {score !== null && (
          <div className="score-box">
            <h2>
              Your Score: {score}/{quizQuestions.length}
            </h2>

            <p>
              {score === quizQuestions.length
                ? 'Excellent! You answered all questions correctly.'
                : 'Good effort! You can try again to improve your score.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Quiz;