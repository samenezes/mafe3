import React, { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Filtrar tarefas pendentes e concluídas
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      <h1> Gerenciamento de Temperaturas</h1>
      <input
        type="text"
        placeholder="add nova temperatura"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Adicionar</button>
      
      <div>
        <h2>Temperaturas Adicionadas</h2>
        <ul>
          {pendingTasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              {task.text}
              <button onClick={() => deleteTask(index)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2>Temperaturas Excluídas</h2>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              {task.text}
              <button onClick={() => deleteTask(index)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;