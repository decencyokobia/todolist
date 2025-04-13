import styles from "./TodoList.module.css";
import { useEffect, useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface Todo {
  task: string;
  completed: boolean;
}

const TodoList = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todolist");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const displayTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const addTask = () => {
    if (task.trim() === "") {
      alert("No task to add.");
      return;
    }
    setTodos([...todos, { task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
  };

  const clearList = () => {
    setTodos([]);
  };

  const isComplete = (index: number) => {
    setTodos(
      todos.map((todo, todoIndex) =>
        todoIndex === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className={styles.todoContainer}>
      <div className="input-group mt-2 mb-2">
        <input
          value={task}
          onChange={(event) => setTask(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          type="text"
          className="form-control"
          aria-label="Text input with segmented dropdown button"
        />
        <button
          onClick={addTask}
          type="button"
          className="btn btn-outline-primary"
        >
          Add
        </button>
      </div>
      <div>
        <button onClick={clearList} className="btn btn-danger mb-2">
          Clear List
        </button>
        <button
          onClick={() => setFilter("all")}
          className="btn btn-outline-secondary mb-2 mx-2"
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className="btn btn-outline-secondary mb-2 "
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="btn btn-outline-secondary mb-2 mx-2"
        >
          Completed
        </button>
      </div>
      <ul className="list-group">
        {displayTodos.map((todo, todoIndex) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={todoIndex}
          >
            <div className={todo.completed ? styles.completedTask : " "}>
              {todo.completed ? (
                <IoMdCheckboxOutline
                  size={20}
                  onClick={() => {
                    isComplete(todoIndex);
                  }}
                />
              ) : (
                <MdOutlineCheckBoxOutlineBlank
                  size={20}
                  onClick={() => {
                    isComplete(todoIndex);
                  }}
                />
              )}{" "}
              {todo.task}
            </div>
            <button
              onClick={() => deleteTask(todoIndex)}
              className="btn btn-outline-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
