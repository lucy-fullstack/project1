import React from 'react';

interface ProjectCostProps {
  projectData: {
    tasks: string[];
    timeEstimates: { [key: string]: number };
    hourlyRate: number;
  };
  updateProjectData: (newData: Partial<ProjectCostProps['projectData']>) => void;
}

const ProjectCost: React.FC<ProjectCostProps> = ({ projectData }) => {
  const calculateTotalCost = () => {
    const totalHours = Object.values(projectData.timeEstimates).reduce((sum, hours) => sum + hours, 0);
    return totalHours * projectData.hourlyRate;
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">Project Cost Breakdown</h2>
      <div className="space-y-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cost</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {projectData.tasks.map((task, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{task}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {projectData.timeEstimates[task] || 0} hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${((projectData.timeEstimates[task] || 0) * projectData.hourlyRate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">Total</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                {Object.values(projectData.timeEstimates).reduce((sum, hours) => sum + hours, 0)} hours
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                ${calculateTotalCost().toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <p className="text-lg">
          Total Project Cost: <span className="font-bold">${calculateTotalCost().toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-300 mt-2">
          This cost is based on an hourly rate of ${projectData.hourlyRate.toFixed(2)} and a total of {Object.values(projectData.timeEstimates).reduce((sum, hours) => sum + hours, 0)} estimated hours.
        </p>
      </div>
    </div>
  );
};

export default ProjectCost;