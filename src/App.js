import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import './App.css';  // Import the CSS


function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState(''); // State for input field

  useEffect(() => {
    // Fetch tasks from the backend API
    axios
      .get('http://localhost:5000/api/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching tasks: ", error);
      });
  }, []);

  const addTask = () => {
    if (taskTitle.trim() === '') {
      return; // Do not add if input is empty
    }

    const newTask = {
      title: taskTitle,
      completed: false,
    };

    // Send POST request to add a new task
    axios
      .post('http://localhost:5000/api/tasks', newTask)
      .then((response) => {
        setTasks([...tasks, response.data]); // Add new task to state
        setTaskTitle(''); // Clear input field
      })
      .catch((error) => {
        console.log("Error adding task: ", error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => {
        console.log("Error deleting task: ", error);
      });
  };

  const toggleTaskCompletion = (taskId) => {
    // Find the task that needs to be updated
    const taskToUpdate = tasks.find((task) => task._id === taskId);

    // Toggle the 'completed' field
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    // Send the update request to the backend
    axios
      .put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask)
      .then((response) => {
        // Update the tasks state with the new completed status
        setTasks(
          tasks.map((task) =>
            task._id === taskId ? { ...task, completed: updatedTask.completed } : task
          )
        );
      })
      .catch((error) => {
        console.log("Error toggling task completion: ", error);
      });
  };

  // Function to handle key press for "Enter" key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Edit task function
  const editTask = (taskId, newTitle) => {
    const updatedTask = { title: newTitle };

    axios
      .put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask)
      .then((response) => {
        setTasks(tasks.map((task) => 
          task._id === taskId ? { ...task, title: newTitle } : task
        ));
      })
      .catch((error) => {
        console.log("Error editing task: ", error);
      });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <h2>Task List</h2>

      {/* Task Input Section */}
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)} // Handle input change
          placeholder="Enter new task"
          onKeyDown={handleKeyPress} // Listen for Enter key press
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.length > 0 ? (
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTask} 
          toggleTaskCompletion={toggleTaskCompletion} 
          editTask={editTask}  // Pass editTask function as prop
        />
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}

export default App;
