import React, { useState } from 'react';

function TaskList({ tasks, deleteTask, toggleTaskCompletion, editTask }) {
  const [editMode, setEditMode] = useState(null); // To manage which task is in edit mode
  const [newTitle, setNewTitle] = useState(''); // To store the new title for editing

  const handleEdit = (taskId, currentTitle) => {
    setEditMode(taskId);  // Enable edit mode for the clicked task
    setNewTitle(currentTitle);  // Set current title to the input field
  };

  const handleSave = (taskId) => {
    if (newTitle.trim() !== '') {
      editTask(taskId, newTitle);  // Update the task title in the backend
      setEditMode(null);  // Exit edit mode
      setNewTitle(''); // Clear the input field
    }
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={taskListItemStyle}>
            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {/* Checkbox for completion */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task._id)}
                style={{ marginRight: '10px' }}
              />
              {/* If editMode is active for the task, show an input box */}
              {editMode === task._id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave(task._id); // Save on Enter key press
                  }}
                  style={inputStyle}
                />
              ) : (
                <span style={taskTitleStyle}>{task.title}</span>
              )}
              {/* Edit button */}
              <button onClick={() => handleEdit(task._id, task.title)} style={editButtonStyle}>
                Edit
              </button>
            </label>
            {/* Delete Button */}
            <button
              onClick={() => deleteTask(task._id)}
              style={deleteButtonStyle}
            >
              Delete
            </button>
            {/* Save button for edit */}
            {editMode === task._id && (
              <button onClick={() => handleSave(task._id)} style={saveButtonStyle}>
                Save
              </button>
            )}
            {/* Display task status */}
            <div style={statusContainerStyle}>
              {task.completed ? (
                <span style={completedStatusStyle}>Completed</span>
              ) : (
                <span style={incompleteStatusStyle}>Incomplete</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const taskListItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
  padding: '10px',
  borderBottom: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
};

const taskTitleStyle = {
  flex: 1,
  marginRight: '10px',
  padding: '5px',
  fontSize: '16px',
  fontWeight: 'bold',
};

const inputStyle = {
  flex: 1,
  marginRight: '10px',
  padding: '5px',
  fontSize: '14px',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginLeft: '10px', // Increased gap between delete button and other elements
};

const saveButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginLeft: '10px', // Increased gap between save button and other elements
};

const editButtonStyle = {
  backgroundColor: '#f39c12',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginLeft: '10px', // Increased gap between edit button and other elements
};

const statusContainerStyle = {
  marginLeft: '10px', // Increased gap between status and task title
};

const completedStatusStyle = {
  backgroundColor: 'green',
  color: 'white',
  padding: '5px',
  borderRadius: '5px',
};

const incompleteStatusStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '5px',
  borderRadius: '5px',
};

export default TaskList;
