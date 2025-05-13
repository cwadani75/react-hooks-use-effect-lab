import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          onAnswered(false);
          return 10;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onAnswered]);

  return (
    <div>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => onAnswered(answer === question.correctAnswer)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;
