function QuestionCard({ question, selectedAnswer, onSelectAnswer, submitted }) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  const getOptionClass = (option) => {
    let className = 'option-item';

    if (submitted) {
      if (option === question.correctAnswer) {
        className += ' correct-option';
      }

      if (option === selectedAnswer && option !== question.correctAnswer) {
        className += ' wrong-option';
      }
    }

    return className;
  };

  return (
    <div
      className={
        submitted
          ? isCorrect
            ? 'question-card question-correct'
            : 'question-card question-wrong'
          : 'question-card'
      }
    >
      <h4>
        Question {question.id}: {question.question}
      </h4>

      <div className="option-list">
        {question.options.map((option) => (
          <label key={option} className={getOptionClass(option)}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onSelectAnswer(question.id, option)}
              disabled={submitted}
            />

            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;