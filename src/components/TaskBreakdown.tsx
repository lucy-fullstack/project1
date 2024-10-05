import React, { useState } from 'react';

interface TaskBreakdownProps {
  projectData: {
    tasks: string[];
  };
  updateProjectData: (newData: Partial<TaskBreakdownProps['projectData']>) => void;
  projectType: 'frontend' | 'backend' | 'fullstack';
}

const frontendTasks = [
  { id: 'fe1', name: 'UI/UX Design' },
  { id: 'fe2', name: 'HTML/CSS Layout' },
  { id: 'fe3', name: 'React Component Implementation' },
  { id: 'fe4', name: 'API Integration' },
  { id: 'fe5', name: 'Routing Configuration' },
  { id: 'fe6', name: 'State Management Implementation' },
  { id: 'fe7', name: 'Performance Optimization' },
  { id: 'fe8', name: 'Unit Testing (Frontend)' },
  { id: 'fe9', name: 'Integration Testing (Frontend)' },
  { id: 'fe10', name: 'Responsive Design Implementation' },
  { id: 'fe11', name: 'Accessibility Improvements' },
  { id: 'fe12', name: 'Cross-browser Compatibility Testing' },
];

const backendTasks = [
  { id: 'be1', name: 'Database Schema Design' },
  { id: 'be2', name: 'API Endpoint Implementation' },
  { id: 'be3', name: 'Authentication System Setup' },
  { id: 'be4', name: 'Data Validation and Sanitization' },
  { id: 'be5', name: 'Caching Layer Implementation' },
  { id: 'be6', name: 'Background Job Processing' },
  { id: 'be7', name: 'API Documentation' },
  { id: 'be8', name: 'Unit Testing (Backend)' },
  { id: 'be9', name: 'Integration Testing (Backend)' },
  { id: 'be10', name: 'Database Optimization' },
  { id: 'be11', name: 'Security Hardening' },
  { id: 'be12', name: 'Logging and Monitoring Setup' },
];

const fullstackTasks = [
  ...frontendTasks,
  ...backendTasks,
  { id: 'fs1', name: 'Full System Architecture Design' },
  { id: 'fs2', name: 'DevOps Configuration' },
  { id: 'fs3', name: 'CI/CD Pipeline Setup' },
  { id: 'fs4', name: 'Cloud Infrastructure Setup' },
  { id: 'fs5', name: 'Scalability Testing' },
  { id: 'fs6', name: 'End-to-End Testing' },
  { id: 'fs7', name: 'Performance Profiling' },
  { id: 'fs8', name: 'Security Audit' },
  { id: 'fs9', name: 'Documentation for Both Frontend and Backend' },
];

const TaskBreakdown: React.FC<TaskBreakdownProps> = ({ projectData, updateProjectData, projectType }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (task: string) => {
    if (task.trim() && !projectData.tasks.includes(task)) {
      updateProjectData({ tasks: [...projectData.tasks, task.trim()] });
      setNewTask('');
    }
  };

  const handleRemoveTask = (index: number) => {
    const updatedTasks = projectData.tasks.filter((_, i) => i !== index);
    updateProjectData({ tasks: updatedTasks });
  };

  const getCommonTasks = () => {
    switch (projectType) {
      case 'frontend':
        return frontendTasks;
      case 'backend':
        return backendTasks;
      case 'fullstack':
        return fullstackTasks;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Task Breakdown</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="newTask" className="block text-sm font-medium text-gray-200">
            Add New Task
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="newTask"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter task description"
            />
            <button
              onClick={() => handleAddTask(newTask)}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-600 rounded-r-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Suggested Tasks:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {getCommonTasks().map((task) => (
              <button
                key={task.id}
                onClick={() => handleAddTask(task.name)}
                className={`text-left px-3 py-2 rounded ${
                  projectData.tasks.includes(task.name)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
                disabled={projectData.tasks.includes(task.name)}
              >
                {task.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-2">Current Tasks:</h3>
          {projectData.tasks.length === 0 ? (
            <p className="text-gray-400">No tasks have been added yet.</p>
          ) : (
            <ul className="space-y-2">
              {projectData.tasks.map((task, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                  <span className="text-gray-200">{task}</span>
                  <button
                    onClick={() => handleRemoveTask(index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBreakdown;