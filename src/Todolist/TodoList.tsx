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

  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index: number) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index));
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
      <input
        onChange={(event) => setTask(event.target.value)}
        value={task}
        type="text"
        className="form-control mt-2 mb-2"
        id="inputField"
      ></input>
      <button onClick={addTask} className="btn btn-primary mb-2">
        Add
      </button>
      <ul className="list-group">
        {todos.map((todo, todoIndex) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={todoIndex}
          >
            <div className={todo.completed ? styles.completedTask : " "}>
              {todo.completed ? (
                <IoMdCheckboxOutline
                  size={20}
                  onClick={() => isComplete(todoIndex)}
                />
              ) : (
                <MdOutlineCheckBoxOutlineBlank
                  size={20}
                  onClick={() => isComplete(todoIndex)}
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
