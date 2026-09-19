import axios from "axios";
import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(Number(localStorage.getItem("time")) || 0);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    // Когда таймер дошёл до 0
    if (time === 0 && start === true) {
      const SaveHistory = async () => {
        try {
          const newHistory = {
            seconds: Number(localStorage.getItem("time")),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          };

          const response = await axios({
            method: "POST",
            url: "https://6aa686bbd7765db985076c1a.mockapi.io/history",
            data: newHistory,
          });

          console.log("POST HISTORY", response);

          if (response.status === 201 || response.status === 200) {
            setStart(false);
            alert("Тренировка завершена!");
          }
        } catch (error) {
          console.error(error);
        }
      };

      SaveHistory();
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
