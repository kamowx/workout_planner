import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [name, setName] = useState("");
  const [lesson, setLesson] = useState("");
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");

  const [timer, setTimer] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);

  const [editName, setEditName] = useState("");
  const [editCalories, setEditCalories] = useState("");
  const [editText, setEditText] = useState("");
  const [editTime, setEditTime] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);

  function Edit(index) {
    setEditIndex(index);
    setEditId(data[index].id);

    setEditName(data[index].name);
    setEditText(data[index].lesson);
    setEditCalories(data[index].calories);
    setEditTime(data[index].time);

    setShowEditModal(true);
  }

  //Edit
  const SaveEdit = async () => {
    if (
      !editName.trim() ||
      !editText.trim() ||
      !editCalories.trim() ||
      !editTime.trim()
    ) {
      return;
    }

    try {
      const response = await axios({
        method: "PUT",
        url: `https://6aa686bbd7765db985076c1a.mockapi.io/subscription/${editId}`,
        data: {
          name: editName,
          lesson: editText,
          calories: editCalories,
          time: editTime,
        },
      });

      console.log("PUT", response);

      if (response.status === 200 || response.status === 201) {
        newData();

        setShowEditModal(false);

        alert("Редактирован");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [data, setData] = useState([]);

  //GET
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

  const workouts = data.filter((item) => item.history !== 1);

  useEffect(() => {
    newData();
  }, []);

  // result calories
  const result_calories = workouts.reduce(
    (sum, item) => sum + (Number(item.calories) || 0),
    0,
  );

  const completedCount = data.filter((item) => item.history === 1).length;

  //Save и setItem
  const Save = async () => {
    if (!name.trim() || !lesson.trim() || !time.trim() || !calories.trim()) {
      return;
    }

    try {
      const response = await axios({
        method: "POST",
        url: "https://6aa686bbd7765db985076c1a.mockapi.io/subscription",
        data: {
          name: name,
          lesson: lesson,
          time: time,
          calories: calories,
          history: 0,
        },
      });

      console.log("POST", response);

      if (response.status === 201 || response.status === 200) {
        setName("");
        setLesson("");
        setTime("");
        setCalories("");

        newData();

        setShowEditModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function Start(item) {
    localStorage.setItem("time", item.time);
    localStorage.setItem("workout", JSON.stringify(item));

    window.location.href = "/timer";
  }

  // DELETE
  const Remove = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `https://6aa686bbd7765db985076c1a.mockapi.io/subscription/${id}`,
      });

      console.log("DELETE", response);

      if (response.status === 200) {
        newData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE ALL
  const RemoveAll = async () => {
    try {
      for (let item of workouts) {
        await axios({
          method: "DELETE",
          url: `https://6aa686bbd7765db985076c1a.mockapi.io/subscription/${item.id}`,
        });
      }

      newData();
    } catch (error) {
      console.error(error);
    }
  };

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
              className="btn btn-primary-custom me-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              + Добавить тренировку
            </button>

            <a href="/history">
              <button
                type="button"
                className="btn btn-primary-custom"
              >
                История
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card app-card stat-card1 p-3 h-100">
            <div className="stat-label">Всего тренировок</div>
            <div className="stat-value my-2">{workouts.length}</div>
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
            <div className="stat-value my-2">
              {completedCount} / {workouts.length}
            </div>
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
              {workouts.map((item, index) => (
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
                          className="btn btn-primary"
                          onClick={() => Edit(index)}
                        >
                          Редактировать
                        </button>

                        {showEditModal && (
                          <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                            style={{
                              backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title fw-bold">
                                    Редактировать
                                  </h5>

                                  <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                  ></button>
                                </div>

                                <div className="modal-body">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Названия
                                    </label>

                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Имя..."
                                      value={editName}
                                      onChange={(e) =>
                                        setEditName(e.target.value)
                                      }
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label className="form-label">
                                      Название упражнения
                                    </label>

                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Например: Отжимания"
                                      value={editText}
                                      onChange={(e) =>
                                        setEditText(e.target.value)
                                      }
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label className="form-label">
                                      Калории
                                    </label>

                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="50"
                                      value={editCalories}
                                      onChange={(e) =>
                                        setEditCalories(e.target.value)
                                      }
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label className="form-label">Секунд</label>

                                    <input
                                      className="form-control"
                                      rows="3"
                                      placeholder="..."
                                      value={editTime}
                                      onChange={(e) =>
                                        setEditTime(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                  >
                                    Закрыть
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={SaveEdit}
                                  >
                                    Сохранить
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() => Start(item)}
                          className="btn btn-primary"
                        >
                          Начать
                        </button>

                        <button
                          onClick={() => Remove(item.id)}
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
                Добавить тренировку...
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
