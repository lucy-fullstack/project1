import React from 'react';

interface TimeEstimationProps {
  projectData: {
    tasks: string[];
    timeEstimates: { [key: string]: number };
  };
  updateProjectData: (newData: Partial<TimeEstimationProps['projectData']>) => void;
}

const TimeEstimation: React.FC<TimeEstimationProps> = ({ projectData, updateProjectData }) => {
  const handleTimeEstimateChange = (task: string, hours: number) => {
    updateProjectData({
      timeEstimates: {
        ...projectData.timeEstimates,
        [task]: hours,
      },
    });
  };

  const totalHours = Object.values(projectData.timeEstimates).reduce((sum, hours) => sum + hours, 0);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Time Estimation</h2>
      <div className="space-y-4">
        {projectData.tasks.map((task, index) => (
          <div key={index} className="flex items-center space-x-4">
            <span className="flex-grow">{task}</span>
            <input
              type="number"
              min="0"
              step="0.5"
              value={projectData.timeEstimates[task] || ''}
              onChange={(e) => handleTimeEstimateChange(task, parseFloat(e.target.value) || 0)}
              className="w-24 px-2 py-1 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <span>hours</span>
          </div>
        ))}
        <div className="mt-6 pt-4 border-t">
          <p className="text-lg font-semibold">
            Total Estimated Time: {totalHours.toFixed(1)} hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeEstimation;