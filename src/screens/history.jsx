import { useState } from "react";

function History() {
  const [history] = useState(JSON.parse(localStorage.getItem("history")) || []);

  return (
    <div className="container mt-5 text-center">
      <div className="card p-5">
        <h2>История</h2>

        {history.length === 0 ? (
          <h1>
            <b>Пока что нет</b>
          </h1>
        ) : (
          history.map((item, index) => (
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
