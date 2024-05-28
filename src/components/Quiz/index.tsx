import React, { useState } from 'react';

const Quiz = ({ question, answers, correctIndex }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerChange = (index) => {
    setSelectedAnswer(index);
    setIsCorrect(index === correctIndex);
  };

  const getAnswerStyle = (index) => {
    if (selectedAnswer === null) return {};
    if (index === selectedAnswer) {
      return { color: isCorrect ? 'green' : 'red' };
    }
    return {};
  };

  return (
    <div>
      <h3>{question}</h3>
      {answers.map((answer, index) => (
        <div key={index} style={getAnswerStyle(index)}>
          <label>
            <input
              type="checkbox"
              checked={selectedAnswer === index}
              onChange={() => handleAnswerChange(index)}
            />
            {answer}
          </label>
        </div>
      ))}
      {selectedAnswer !== null && (
        <p style={{ color: isCorrect ? 'green' : 'red' }}>
          {isCorrect ? 'Correto!' : `Incorreto :( a resposta correta é: ${answers[correctIndex]}`}
        </p>
      )}
      <br></br>
    </div>
  );
};

export default Quiz;

