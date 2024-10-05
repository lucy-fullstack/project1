import React, { useState } from 'react';
import Select from 'react-select';

interface TechnicalRequirementsProps {
  projectData: {
    technicalRequirements: string[];
  };
  updateProjectData: (newData: Partial<TechnicalRequirementsProps['projectData']>) => void;
  projectType: 'frontend' | 'backend' | 'fullstack';
}

const frontendRequirements = [
  'Responsive Design',
  'Cross-browser Compatibility',
  'Accessibility (WCAG 2.1)',
  'Performance Optimization',
  'SEO Optimization',
  'UI/UX Design Implementation',
  'State Management',
  'API Integration',
  'Progressive Web App (PWA)',
  'Animations and Transitions',
  'Internationalization (i18n)',
  'Unit Testing (Frontend)',
  'End-to-end Testing',
  'CI/CD Integration',
  'Version Control (Git)',
  'Package Management',
];

const backendRequirements = [
  'RESTful API Design',
  'Database Design and Optimization',
  'Authentication and Authorization',
  'Data Validation and Sanitization',
  'Error Handling and Logging',
  'Caching Strategies',
  'Scalability and Performance',
  'Security Best Practices',
  'API Documentation',
  'Unit Testing (Backend)',
  'Integration Testing',
  'CI/CD Integration',
  'Version Control (Git)',
  'Containerization (e.g., Docker)',
  'Message Queues',
  'Microservices Architecture',
];

const fullstackRequirements = [
  ...frontendRequirements,
  ...backendRequirements,
  'Full-stack Performance Optimization',
  'DevOps and Deployment Strategies',
  'Serverless Architecture',
  'Cloud Services Integration',
  'Websockets and Real-time Communication',
  'GraphQL Implementation',
  'Monorepo Management',
  'Fullstack Debugging and Profiling',
];

const TechnicalRequirements: React.FC<TechnicalRequirementsProps> = ({ projectData, updateProjectData, projectType }) => {
  const [newRequirement, setNewRequirement] = useState('');

  const handleAddRequirement = (requirement: string) => {
    if (requirement.trim() && !projectData.technicalRequirements.includes(requirement)) {
      updateProjectData({ technicalRequirements: [...projectData.technicalRequirements, requirement.trim()] });
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = projectData.technicalRequirements.filter((_, i) => i !== index);
    updateProjectData({ technicalRequirements: updatedRequirements });
  };

  const getCommonRequirements = () => {
    switch (projectType) {
      case 'frontend':
        return frontendRequirements;
      case 'backend':
        return backendRequirements;
      case 'fullstack':
        return fullstackRequirements;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Technical Requirements</h2>
      <div>
        <label htmlFor="newRequirement" className="block text-sm font-medium text-gray-200 mb-2">
          Add New Requirement
        </label>
        <div className="flex">
          <input
            type="text"
            id="newRequirement"
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            className="flex-grow px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter technical requirement"
          />
          <button
            onClick={() => handleAddRequirement(newRequirement)}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-2">Common Requirements:</h3>
        <Select
          isMulti
          options={getCommonRequirements().map(req => ({ value: req, label: req }))}
          value={projectData.technicalRequirements.map(req => ({ value: req, label: req }))}
          onChange={(selectedOptions) => {
            updateProjectData({ technicalRequirements: selectedOptions.map(option => option.value) });
          }}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: 'rgba(30, 41, 59, 0.9)',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? 'rgba(59, 130, 246, 0.8)' : 'transparent',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.4)',
              },
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: 'rgba(59, 130, 246, 0.6)',
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: 'white',
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                color: 'white',
              },
            }),
          }}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-2">Current Requirements:</h3>
        {projectData.technicalRequirements.length === 0 ? (
          <p className="text-gray-400">No technical requirements added yet.</p>
        ) : (
          <ul className="space-y-2">
            {projectData.technicalRequirements.map((req, index) => (
              <li key={index} className="flex items-center justify-between bg-white bg-opacity-10 p-2 rounded">
                <span className="text-white">{req}</span>
                <button
                  onClick={() => handleRemoveRequirement(index)}
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
  );
};

export default TechnicalRequirements;