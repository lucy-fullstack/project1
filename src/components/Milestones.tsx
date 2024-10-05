import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface MilestonesProps {
  projectData: {
    milestones: Array<{ title: string; description: string; dueDate: string }>;
  };
  updateProjectData: (newData: Partial<MilestonesProps['projectData']>) => void;
}

const Milestones: React.FC<MilestonesProps> = ({ projectData, updateProjectData }) => {
  const [newMilestone, setNewMilestone] = useState({ title: '', description: '', dueDate: '' });

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.dueDate) {
      updateProjectData({
        milestones: [...projectData.milestones, newMilestone],
      });
      setNewMilestone({ title: '', description: '', dueDate: '' });
    }
  };

  const handleRemoveMilestone = (index: number) => {
    const updatedMilestones = projectData.milestones.filter((_, i) => i !== index);
    updateProjectData({ milestones: updatedMilestones });
  };

  const handleMilestoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMilestone({ ...newMilestone, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">Project Milestones</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={newMilestone.title}
          onChange={handleMilestoneChange}
          placeholder="Milestone Title"
          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <textarea
          name="description"
          value={newMilestone.description}
          onChange={handleMilestoneChange}
          placeholder="Milestone Description"
          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          rows={3}
        />
        <input
          type="date"
          name="dueDate"
          value={newMilestone.dueDate}
          onChange={handleMilestoneChange}
          className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <button
          onClick={handleAddMilestone}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          Add Milestone
        </button>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-2">Current Milestones:</h3>
        {projectData.milestones.length === 0 ? (
          <p className="text-gray-400">No milestones added yet.</p>
        ) : (
          <ul className="space-y-4">
            {projectData.milestones.map((milestone, index) => (
              <li key={index} className="bg-white bg-opacity-10 p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{milestone.title}</h4>
                    <p className="text-gray-300 mt-1">{milestone.description}</p>
                    <p className="text-gray-400 mt-2">Due: {milestone.dueDate}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveMilestone(index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Milestones;