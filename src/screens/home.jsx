import { useState } from "react";

function Home() {
  const [name, setName] = useState("");
  const [lesson, setLesson] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");

  // Получаем  localStorage
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || [],
  );

  function Save() {
    // Получаем старые тренировки
    let oldData = JSON.parse(localStorage.getItem("data")) || [];

    // Создаём новую тренировку
    let newData = {
      name: name,
      lesson: lesson,
      time: time,
      calories: calories,
    };

    // Добавляем новую тренировку
    oldData.push(newData);

    // Сохраняем тренировки
    localStorage.setItem("data", JSON.stringify(oldData));

    // Обновляем список на странице
    setData(oldData);

    // Очищаем поля
    setName("");
    setLesson("");
    setTime("");
    setCalories("");

    alert("Тренировка сохранена");
  }

  // Удалить одну тренировку
  function Remove(index) {
    // Создаём пустой массив
    let newData = [];

    // Перебираем все тренировки
    for (let i = 0; i < data.length; i++) {
      // Если это НЕ та тренировка,
      // которую хотим удалить
      if (i !== index) {
        // Добавляем её в новый массив
        newData.push(data[i]);
      }
    }

    // Сохраняем новый массив
    localStorage.setItem("data", JSON.stringify(newData));

    // Показываем новый массив
    setData(newData);
  }

  // Удалить все тренировки
  function RemoveAll() {
    // Удаляем данные
    localStorage.removeItem("data");

    // Очищаем список
    setData([]);
  }

  // Считаем все калории
  let result_calories = 0;

  // Перебираем все тренировки
  for (let i = 0; i < data.length; i++) {
    result_calories = result_calories + Number(data[i].calories);
  }

  return (
    <div className="container py-4">
      <div className="card app-card p-4 mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h1 className="page-title mb-1">Планировщик тренировок</h1>

            <p className="text-muted small mb-0">
              Учёт, планирование и отслеживание тренировочного процесса
            </p>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary-custom"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              + Добавить тренировку
            </button>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card app-card stat-card1 p-3 h-100">
            <div className="stat-label">Всего тренировок</div>

            <div className="stat-value my-2">{data.length}</div>

            <div className="stat-desc text-muted">
              Все зарегистрированные занятия
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card app-card stat-card2 p-3 h-100">
            <div className="stat-label">Калории</div>

            <div className="stat-value my-2">{result_calories}</div>

            <div className="stat-desc text-muted">Общее количество калорий</div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card app-card stat-card3 p-3 h-100">
            <div className="stat-label">Завершено / Запланировано</div>

            <div className="stat-value my-2">0</div>

            <div className="stat-desc text-muted">Текущий прогресс цикла</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card app-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="section-title mb-0">Список тренировок</h2>

              <button onClick={RemoveAll} className="btn btn-danger">
                Удалить всё
              </button>
            </div>

            <div className="workout-list">
              {data.map((item, index) => (
                <div key={index} className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="fw-bold mb-2">{item.name}</h5>

                        <div className="text-muted mb-1">
                          Упражнение: {item.lesson}
                        </div>

                        <div className="text-muted mb-1">
                          Калории: {item.calories}
                        </div>

                        <small className="text-secondary">
                          Секунд: {item.time}
                        </small>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          onClick={() => {
                            // Сохраняем выбранную тренировку
                            localStorage.setItem(
                              "openData",
                              JSON.stringify(item),
                            );

                            window.location.href = "";
                          }}
                          className="btn btn-primary"
                        >
                          Начать
                        </button>

                        <button
                          onClick={() => Remove(index)}
                          className="btn btn-danger"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Окно добавления */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Заголовок окна */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Добавить тренировку
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Поля */}
            <div className="modal-body">
              {/* Название тренировки */}
              <div className="mb-3">
                <label className="form-label">Название тренировки</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Например: Утренняя зарядка"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Название упражнения */}
              <div className="mb-3">
                <label className="form-label">Название упражнения</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Например: Отжимания"
                  value={lesson}
                  onChange={(e) => setLesson(e.target.value)}
                />
              </div>

              {/* Время */}
              <div className="mb-3">
                <label className="form-label">Длительность (сек)</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="60"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              {/* Калории */}
              <div className="mb-3">
                <label className="form-label">Калории</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="50"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>

              {/* Отдых */}
              <div className="mb-3">
                <label className="form-label">Отдых (сек)</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="10"
                />
              </div>
            </div>

            {/* Кнопки */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary-custom"
                data-bs-dismiss="modal"
              >
                Закрыть
              </button>

              <button
                type="button"
                className="btn btn-primary-custom"
                onClick={Save}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
