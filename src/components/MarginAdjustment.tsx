import React, { useState } from 'react';

interface MarginAdjustmentProps {
  projectData: {
    tasks: string[];
    timeEstimates: { [key: string]: number };
    hourlyRate: number;
    margin: number;
  };
  updateProjectData: (newData: Partial<MarginAdjustmentProps['projectData']>) => void;
}

const MarginAdjustment: React.FC<MarginAdjustmentProps> = ({ projectData, updateProjectData }) => {
  const [margin, setMargin] = useState(projectData.margin || 0);

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMargin = parseFloat(e.target.value) || 0;
    setMargin(newMargin);
    updateProjectData({ margin: newMargin });
  };

  const totalHours = Object.values(projectData.timeEstimates).reduce((sum, hours) => sum + hours, 0);
  const baseCost = totalHours * projectData.hourlyRate;
  const adjustedCost = baseCost * (1 + margin / 100);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">Margin Adjustment</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="margin" className="block text-sm font-medium mb-1">
            Safety Margin (%)
          </label>
          <input
            type="number"
            id="margin"
            value={margin}
            onChange={handleMarginChange}
            min="0"
            max="100"
            step="1"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <p className="text-lg">
            Base Cost: <span className="font-bold">${baseCost.toFixed(2)}</span>
          </p>
          <p className="text-lg">
            Adjusted Cost: <span className="font-bold">${adjustedCost.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-300 mt-2">
            This adjusted cost includes a {margin}% safety margin for unforeseen complexities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarginAdjustment;