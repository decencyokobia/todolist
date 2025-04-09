import { useState } from "react";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa6";
import TodoList from "./Todolist/TodoList";
import styles from "./Todolist/TodoList.module.css";

function App() {
  const [nightMode, setNightMode] = useState(false);

  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div className={nightMode ? styles.bgNightMode : styles.bgLightMode}>
      <div className="d-flex justify-content-between">
        <h1>TodoList</h1>
        {!nightMode && <FaMoon size={30} onClick={toggleNightMode} />}
        {nightMode && (
          <FiSun color="white" size={30} onClick={toggleNightMode} />
        )}
      </div>

      <TodoList />
    </div>
  );
}

export default App;
