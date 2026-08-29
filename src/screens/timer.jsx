import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(Number(localStorage.getItem("time")) || 0);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }

    if (time === 0 && start === true) {
      const oldHistory = JSON.parse(localStorage.getItem("history")) || [];

      const newHistory = {
        seconds: Number(localStorage.getItem("time")),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      oldHistory.push(newHistory);

      localStorage.setItem("history", JSON.stringify(oldHistory));

      setStart(false);
    }
  }, [time, start]);

  function StartTimer() {
    setStart(true);
  }

  return (
    <div className="container mt-5 text-center">
      <div className="card p-5">
        <h2>Обратный отсчёт</h2>

        <h1 className="display-1">{time}</h1>

        <button
          className="btn btn-success"
          onClick={StartTimer}
          disabled={start || time === 0}
        >
          Начать
        </button>

        <br />

        <a href="/">
          <button className="btn btn-danger">Назад</button>
        </a>
      </div>
    </div>
  );
}

export default Timer;
