import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
// import classes from "./TodoList.module.css";
import classes from "./Todo.module.css"
function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState("");
  const inputRef = useRef(null);

  const handleAdd = (event) => {
    inputRef.current.focus();
    event.preventDefault();

    if (todo !== "") {
      setTodos([{ id: `${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };
  const handleEdit = (id) => {
    inputRef.current.focus();

    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className={classes.todo}>
      <h1 className={classes.todoApp}> Todo App </h1>
      <form onSubmit={handleAdd}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          className={classes.input}
        />
        <button type="submit" className={classes.addButton}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {todos.map((t) => {
        return (
          <motion.div
            className={classes.todoList}
            key={t.id}
            initial={{ x: "-100vh" }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
          >
            <div className={classes.todoForm}>
              <button
                onClick={() => handleEdit(t.id)}
                className={classes.editbutton}
              >
                <div className={classes.inputt}>{t.todo} </div>
              </button>

              <motion.button
                onClick={() => handleDelete(t.id)}
                className={classes.btnn}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.5,
                  },
                }}
                whileHover={{ scale: 1.1 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default Todo;
