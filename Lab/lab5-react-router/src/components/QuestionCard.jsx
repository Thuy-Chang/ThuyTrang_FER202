function QuestionCard({ question, selectedAnswer, onSelectAnswer }) {
  return (
    <div className="question-card">
      <h4>
        Question {question.id}: {question.question}
      </h4>

      <div className="option-list">
        {question.options.map((option) => (
          <label key={option} className="option-item">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onSelectAnswer(question.id, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;