import { useState } from "react";

function Home() {
  const [name, setName] = useState("");
  const [lesson, setLesson] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || [],
  );

  function Save() {
    let oldData = JSON.parse(localStorage.getItem("data")) || [];

    let newData = {
      name: name,
      lesson: lesson,
      time: time,
      calories: calories,
    };

    oldData.push(newData);

    localStorage.setItem("data", JSON.stringify(oldData));

    setData(oldData);

    setName("");
    setLesson("");
    setTime("");
    setCalories("");

    alert("Тренировка сохранена");
  }

  function Remove(index) {
    let newData = [];

    for (let i = 0; i < data.length; i++) {
      if (i !== index) {
        newData.push(data[i]);
      }
    }

    localStorage.setItem("data", JSON.stringify(newData));

    setData(newData);
  }

  function RemoveAll() {
    localStorage.removeItem("data");

    setData([]);
  }

  let result_calories = 0;

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
                Удалить всё.
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

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
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

            <div className="modal-body">
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

              <div className="mb-3">
                <label className="form-label">Отдых (сек)</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="10"
                />
              </div>
            </div>

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
