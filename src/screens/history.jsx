import axios from "axios";
import { useEffect, useState } from "react";

function History() {
  // Массив тренировок
  const [data, setData] = useState([]);

  // GET
  const newData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aa686bbd7765db985076c1a.mockapi.io/subscription",
      });

      console.log("GET HISTORY", response);

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

  // Фильтр
  const history = data.filter((item) => item.history === 1);

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
              <h4>{item.name}</h4>

              <p>Упражнение: {item.lesson}</p>

              <p>Калории: {item.calories}</p>

              <p>Секунд: {item.time}</p>

              <p>Дата: {item.Date}</p>
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
