import axios from "axios";
import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(Number(localStorage.getItem("time")) || 0);

  const [start, setStart] = useState(false);

  const [data, setData] = useState([]);

  // GET - получаем общий массив
  const newData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aa686bbd7765db985076c1a.mockapi.io/subscription",
      });

      console.log("GET", response);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Получаем данные при открытии
  useEffect(() => {
    newData();
  }, []);

  useEffect(() => {
    if (start && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    // Когда таймер дошёл до 0
    if (time === 0 && start === true) {
      setStart(false);

      const SaveHistory = async () => {
        try {
          // Получаем выбранную тренировку
          const workout = JSON.parse(localStorage.getItem("workout"));

          const newHistory = {
            name: workout?.name || "Тренировка",
            lesson: workout?.lesson || "",
            calories: workout?.calories || "",
            time: workout?.time || localStorage.getItem("time") || "0",
            Date: new Date().toLocaleDateString(),
            history: 1,
          };

          console.log("Отправляем:", newHistory);

          const response = await axios({
            method: "POST",
            url: "https://6aa686bbd7765db985076c1a.mockapi.io/subscription",
            data: newHistory,
          });

          console.log("POST", response);

          if (response.status === 201 || response.status === 200) {
            // Обновляем общий массив
            newData();

            alert("Тренировка завершена!");
          }
        } catch (error) {
          console.error("Ошибка:", error);
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
