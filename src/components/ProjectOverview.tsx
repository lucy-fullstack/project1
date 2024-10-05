import React from 'react';
import Select from 'react-select';

interface ProjectOverviewProps {
  projectData: {
    name: string;
    description: string;
    technologies: string[];
    deliverables: string[];
  };
  updateProjectData: (newData: Partial<ProjectOverviewProps['projectData']>) => void;
  projectType: 'frontend' | 'backend' | 'fullstack';
}

const frontendTechnologies = [
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'React', label: 'React' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Next.js', label: 'Next.js' },
  { value: 'Gatsby', label: 'Gatsby' },
  { value: 'TailwindCSS', label: 'TailwindCSS' },
  { value: 'SASS', label: 'SASS' },
  { value: 'Redux', label: 'Redux' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'WebSockets', label: 'WebSockets' },
];

const backendTechnologies = [
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Express', label: 'Express' },
  { value: 'Django', label: 'Django' },
  { value: 'Flask', label: 'Flask' },
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'Spring Boot', label: 'Spring Boot' },
  { value: 'ASP.NET Core', label: 'ASP.NET Core' },
  { value: 'Laravel', label: 'Laravel' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'REST API', label: 'REST API' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'Redis', label: 'Redis' },
  { value: 'Docker', label: 'Docker' },
];

const fullstackTechnologies = [
  ...frontendTechnologies,
  ...backendTechnologies,
  { value: 'MERN Stack', label: 'MERN Stack' },
  { value: 'MEAN Stack', label: 'MEAN Stack' },
  { value: 'LAMP Stack', label: 'LAMP Stack' },
  { value: 'JAMstack', label: 'JAMstack' },
  { value: 'Serverless', label: 'Serverless' },
  { value: 'Microservices', label: 'Microservices' },
];

const frontendDeliverables = [
  { value: 'Responsive Design', label: 'Responsive Design' },
  { value: 'Component Building', label: 'Component Building' },
  { value: 'Animations', label: 'Animations' },
  { value: 'API Integration', label: 'API Integration' },
  { value: 'Performance Optimization', label: 'Performance Optimization' },
  { value: 'Accessibility', label: 'Accessibility' },
  { value: 'SEO Optimization', label: 'SEO Optimization' },
  { value: 'Cross-browser Compatibility', label: 'Cross-browser Compatibility' },
  { value: 'Unit Testing', label: 'Unit Testing' },
  { value: 'E2E Testing', label: 'E2E Testing' },
  { value: 'Documentation', label: 'Documentation' },
  { value: 'Code Review', label: 'Code Review' },
];

const backendDeliverables = [
  { value: 'API Development', label: 'API Development' },
  { value: 'Database Design', label: 'Database Design' },
  { value: 'Authentication & Authorization', label: 'Authentication & Authorization' },
  { value: 'Data Processing', label: 'Data Processing' },
  { value: 'Server Configuration', label: 'Server Configuration' },
  { value: 'Caching Implementation', label: 'Caching Implementation' },
  { value: 'Microservices Architecture', label: 'Microservices Architecture' },
  { value: 'Message Queues', label: 'Message Queues' },
  { value: 'Unit Testing', label: 'Unit Testing' },
  { value: 'Integration Testing', label: 'Integration Testing' },
  { value: 'Documentation', label: 'Documentation' },
  { value: 'Code Review', label: 'Code Review' },
];

const fullstackDeliverables = [
  ...frontendDeliverables,
  ...backendDeliverables,
  { value: 'Full System Architecture', label: 'Full System Architecture' },
  { value: 'DevOps Setup', label: 'DevOps Setup' },
  { value: 'CI/CD Pipeline', label: 'CI/CD Pipeline' },
  { value: 'Cloud Deployment', label: 'Cloud Deployment' },
  { value: 'Scalability Planning', label: 'Scalability Planning' },
  { value: 'Security Audit', label: 'Security Audit' },
];

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ projectData, updateProjectData, projectType }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateProjectData({ [name]: value });
  };

  const handleMultiSelect = (name: string, selectedOptions: any) => {
    updateProjectData({ [name]: selectedOptions.map((option: any) => option.value) });
  };

  const getTechnologies = () => {
    switch (projectType) {
      case 'frontend':
        return frontendTechnologies;
      case 'backend':
        return backendTechnologies;
      case 'fullstack':
        return fullstackTechnologies;
    }
  };

  const getDeliverables = () => {
    switch (projectType) {
      case 'frontend':
        return frontendDeliverables;
      case 'backend':
        return backendDeliverables;
      case 'fullstack':
        return fullstackDeliverables;
    }
  };

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project name"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Brief Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={projectData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your project briefly"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Technologies Involved</label>
          <Select
            isMulti
            name="technologies"
            options={getTechnologies()}
            value={getTechnologies().filter(tech => projectData.technologies.includes(tech.value))}
            onChange={(selectedOptions) => handleMultiSelect('technologies', selectedOptions)}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select technologies"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Main Deliverables</label>
          <Select
            isMulti
            name="deliverables"
            options={getDeliverables()}
            value={getDeliverables().filter(item => projectData.deliverables.includes(item.value))}
            onChange={(selectedOptions) => handleMultiSelect('deliverables', selectedOptions)}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select deliverables"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;