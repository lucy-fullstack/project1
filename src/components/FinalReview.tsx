import React from 'react';

interface FinalReviewProps {
  projectData: {
    name: string;
    description: string;
    technologies: string[];
    deliverables: string[];
    tasks: string[];
    timeEstimates: { [key: string]: number };
    hourlyRate: number;
  };
}

const FinalReview: React.FC<FinalReviewProps> = ({ projectData }) => {
  const totalHours = Object.values(projectData.timeEstimates).reduce((sum, hours) => sum + hours, 0);
  const totalCost = totalHours * projectData.hourlyRate;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Final Review</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Project Details</h3>
          <p><strong>Name:</strong> {projectData.name}</p>
          <p><strong>Description:</strong> {projectData.description}</p>
          <p><strong>Technologies:</strong> {projectData.technologies.join(', ')}</p>
          <p><strong>Deliverables:</strong> {projectData.deliverables.join(', ')}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Tasks and Time Estimates</h3>
          <ul>
            {projectData.tasks.map((task, index) => (
              <li key={index}>
                {task}: {projectData.timeEstimates[task] || 0} hours
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Cost Summary</h3>
          <p><strong>Hourly Rate:</strong> ${projectData.hourlyRate.toFixed(2)}</p>
          <p><strong>Total Hours:</strong> {totalHours}</p>
          <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default FinalReview;