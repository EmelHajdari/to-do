import React, { useState } from 'react';
import './App.css';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { EditTodoForm } from './EditTodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);

  function addTodo(todo) {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), task: todo, completed: false, isEditing: false },
    ]);
  }

  function deleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function toggleComplete(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }


  function editTodo(id) {
    setTodos(function(prevTodos) {
      return prevTodos.map(function(todo) {
        return todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo;
      });
    });
  }
  
  function editTask(task, id) {
    setTodos(function(prevTodos) {
      return prevTodos.map(function(todo) {
        return todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo;
      });
    });
  }

  return (
    <div className="TodoForm">
      <h1>TO DO</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
}

export default App
