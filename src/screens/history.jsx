import axios from "axios";
import { useEffect, useState } from "react";

function History() {
  // Массив тренировок
  const [subscriptions, setSubscriptions] = useState([]);

  // GET
  const subscription = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://6aa686bbd7765db985076c1a.mockapi.io/history",
      });

      console.log("GET", response);

      if (response.status === 200) {
        setSubscriptions(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Получаем данные при открытии
  useEffect(() => {
    subscription();
  }, []);

  return (
    <div className="container mt-5 text-center">
      <div className="card p-5">
        <h2>История</h2>

        {subscriptions.length === 0 ? (
          <h1>
            <b>Пока что нет</b>
          </h1>
        ) : (
          subscriptions.map((item, index) => (
            <div className="card p-3 mt-3" key={index}>
              <h4>{item.name}</h4>

              <p>Упражнение: {item.lesson}</p>

              <p>Калории: {item.calories}</p>

              <p>Секунд: {item.time}</p>
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
