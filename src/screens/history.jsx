import { useState, useEffect } from "react";

function History() {
  const [data, setData] = useState([]);

  // GET
  const newData = async () => {
    try {
      const oldHistory = JSON.parse(localStorage.getItem("history")) || [];

      setData(oldHistory);
    } catch (error) {
      console.error(error);
    }
  };

  // Получаем данные при открытии
  useEffect(() => {
    newData();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <div className="card p-5">
        <h2>История</h2>

        {data.length === 0 ? (
          <h1>
            <b>Пока что нет</b>
          </h1>
        ) : (
          data.map((item, index) => (
            <div className="card p-3 mt-3" key={index}>
              <h4>Тренировка</h4>

              <p>Секунд: {item.seconds}</p>

              <p>Дата: {item.date}</p>

              <p>Время: {item.time}</p>
            </div>
          ))
        )}

        <br />

        <a href="/">
          <button className="btn btn-danger">Назад</button>
        </a>
      </div>
    </div>
  );
}

export default History;
