"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  function handleAddTodo(event) {
    event.preventDefault();

    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) {
      return;
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        text: trimmedTodo,
        done: false,
      },
    ]);
    setNewTodo("");
  }

  function handleToggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function handleDeleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Temporary Todo</h1>
        <p className={styles.subtitle}>No database. No persistence. Refresh clears everything.</p>

        <form className={styles.form} onSubmit={handleAddTodo}>
          <input
            className={styles.input}
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Add a todo"
            aria-label="Add a todo"
          />
          <button className={styles.addButton} type="submit">
            Add
          </button>
        </form>

        <ul className={styles.list}>
          {todos.length === 0 ? (
            <li className={styles.empty}>Nothing yet. Add your first todo.</li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className={styles.item}>
                <label className={styles.itemLabel}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span className={todo.done ? styles.doneText : ""}>{todo.text}</span>
                </label>
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  );
}
