import React, { useState } from 'react';

function ProfessionalTodo() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      time: new Date().toLocaleString()
    };

    setTasks([newTask, ...tasks]);
    setTaskText('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdate = () => {
    if (!editText.trim()) return;

    setTasks(tasks.map(task =>
      task.id === editId ? { ...task, text: editText } : task
    ));

    setEditId(null);
    setEditText('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>✅ Professional To-Do App</h2>

      <div style={styles.inputRow}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a task..."
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.addButton}>Add</button>
      </div>

      <ul style={styles.list}>
        {tasks.map(task => (
          <li key={task.id} style={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            {editId === task.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.editInput}
                />
                <button onClick={handleUpdate} style={styles.saveButton}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'gray' : 'black'
                  }}
                >
                  {task.text}
                </span>
                <span style={styles.time}>{task.time}</span>
                <button onClick={() => handleEdit(task.id, task.text)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(task.id)} style={styles.deleteButton}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  inputRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.6rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  addButton: {
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 0',
    borderBottom: '1px solid #eee'
  },
  taskText: {
    flex: 1,
    fontSize: '1rem'
  },
  time: {
    fontSize: '0.75rem',
    color: '#666',
    marginLeft: 'auto'
  },
  editInput: {
    flex: 1,
    padding: '0.4rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  editButton: {
    backgroundColor: '#ffc107',
    border: 'none',
    padding: '0.4rem 0.7rem',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer'
  },
  saveButton: {
    backgroundColor: '#28a745',
    border: 'none',
    padding: '0.4rem 0.7rem',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    border: 'none',
    padding: '0.4rem 0.7rem',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default ProfessionalTodo;
