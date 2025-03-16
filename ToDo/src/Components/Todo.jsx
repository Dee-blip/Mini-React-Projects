import { useState, useEffect } from "react";

export default function Todo() {
  const [task, setTask] = useState("");

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos") || [])
  );
  // [{value:"learn react", isCompleted : false,id:time}]

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTodo = () => {
    if (task.trim() !== "") {
      const newTodos = [...todos];
      newTodos.push({
        value: task,
        isCompleted: false,
        id: new Date().getTime(),
      });
      setTodos(newTodos);
      setTask("");
    }
  };

  const handleKeyDown = (e) => {
    // console.log(e);
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleDelete = (id) => {
    // using filter
    const filteredTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodo);
  };

  const handleComplete = (id) => {
    const newTodos = [...todos];
    newTodos.forEach((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div>
      <div>
        <input
          value={task}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          type="text"
        />
        <button onClick={addTodo}> Add Task </button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <div style={{ margin: "0.5rem" }} key={todo.id}>
              {todo.isCompleted ? (
                <span
                  style={{
                    marginRight: "2rem",
                    textDecoration: "line-through",
                  }}
                >
                  {todo.value}
                </span>
              ) : (
                <span
                  style={{
                    marginRight: "2rem",
                  }}
                >
                  {todo.value}
                </span>
              )}
              <span
                onClick={() => {
                  handleComplete(todo.id);
                }}
                className="right-btn"
                style={{ marginRight: "0.5rem" }}
              >
                ✅
              </span>
              <span
                className="cross-btn"
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                ❌
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
