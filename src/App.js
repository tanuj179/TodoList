import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const filteredData = data.slice(0, 5).map((item) => ({
          id: item.id,
          name: item.title,
          isImportant: false,
        }));
        setTasks(filteredData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTask = (taskName) => {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      isImportant: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleToggleImportant = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
      )
    );
  };

  const handleEditTask = (taskId, editedTaskName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, name: editedTaskName } : task
      )
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Todo List
      </Typography>
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggleImportant={handleToggleImportant}
        onEdit={handleEditTask}
        onAdd={handleAddTask}
      />
    </Container>
  );
};

export default App;
