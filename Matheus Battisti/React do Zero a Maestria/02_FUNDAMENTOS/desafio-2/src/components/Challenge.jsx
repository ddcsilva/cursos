import "./Challenge.css";

const Challenge = () => {
  const a = 5;
  const b = 2;

  return (
    <div className="challenge-container">
      <p className="challenge-question">
        Qual é a soma de {a} + {b}?
      </p>
      <button className="challenge-button" onClick={() => console.log(a + b)}>
        Clique aqui para descobrir!
      </button>
    </div>
  );
};

export default Challenge;
