import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Code, Palette, Layers } from 'lucide-react';
import ProjectOverview from './components/ProjectOverview';
import TaskBreakdown from './components/TaskBreakdown';
import TimeEstimation from './components/TimeEstimation';
import RateCalculation from './components/RateCalculation';
import ProjectCost from './components/ProjectCost';
import FinalReview from './components/FinalReview';
import MarginAdjustment from './components/MarginAdjustment';
import TechnicalRequirements from './components/TechnicalRequirements';
import Milestones from './components/Milestones';
import generatePDF from './utils/generatePDF';

const steps = [
  'Overview',
  'Tech Reqs',
  'Tasks',
  'Time',
  'Rate',
  'Cost',
  'Milestones',
  'Margin',
  'Review',
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectType, setProjectType] = useState<'frontend' | 'backend' | 'fullstack'>('frontend');
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    technologies: [],
    deliverables: [],
    technicalRequirements: [],
    tasks: [],
    timeEstimates: {},
    hourlyRate: 0,
    totalHours: 0,
    totalCost: 0,
    margin: 0,
    milestones: [],
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateProjectData = (newData: Partial<typeof projectData>) => {
    setProjectData({ ...projectData, ...newData });
  };

  const handleDownloadPDF = () => {
    generatePDF(projectData, projectType);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleProjectTypeChange = (type: 'frontend' | 'backend' | 'fullstack') => {
    setProjectType(type);
    // Reset project data when switching project type
    setProjectData({
      name: '',
      description: '',
      technologies: [],
      deliverables: [],
      technicalRequirements: [],
      tasks: [],
      timeEstimates: {},
      hourlyRate: 0,
      totalHours: 0,
      totalCost: 0,
      margin: 0,
      milestones: [],
    });
    setCurrentStep(0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProjectOverview projectData={projectData} updateProjectData={updateProjectData} projectType={projectType} />;
      case 1:
        return <TechnicalRequirements projectData={projectData} updateProjectData={updateProjectData} projectType={projectType} />;
      case 2:
        return <TaskBreakdown projectData={projectData} updateProjectData={updateProjectData} projectType={projectType} />;
      case 3:
        return <TimeEstimation projectData={projectData} updateProjectData={updateProjectData} />;
      case 4:
        return <RateCalculation projectData={projectData} updateProjectData={updateProjectData} projectType={projectType} />;
      case 5:
        return <ProjectCost projectData={projectData} updateProjectData={updateProjectData} />;
      case 6:
        return <Milestones projectData={projectData} updateProjectData={updateProjectData} />;
      case 7:
        return <MarginAdjustment projectData={projectData} updateProjectData={updateProjectData} />;
      case 8:
        return <FinalReview projectData={projectData} projectType={projectType} />;
      default:
        return null;
    }
  };

  const getProjectTypeIcon = (type: 'frontend' | 'backend' | 'fullstack') => {
    switch (type) {
      case 'frontend':
        return <Palette className="mr-2" size={20} />;
      case 'backend':
        return <Code className="mr-2" size={20} />;
      case 'fullstack':
        return <Layers className="mr-2" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-4 sm:p-8 w-full max-w-4xl border border-blue-500 border-opacity-30">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-300 neon-text">
          {projectType.charAt(0).toUpperCase() + projectType.slice(1)} Project Estimator
        </h1>
        <div className="flex justify-center mb-12">
          {(['frontend', 'backend', 'fullstack'] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleProjectTypeChange(type)}
              className={`flex items-center px-4 py-2 rounded ${
                projectType === type ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              } hover:bg-blue-500 transition-all duration-300 mx-2`}
            >
              {getProjectTypeIcon(type)}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-8 mb-20 overflow-x-auto">
          <div className="flex justify-between items-center min-w-max">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex flex-col items-center mx-1 sm:mx-2 ${
                  index <= currentStep ? 'text-blue-300' : 'text-gray-400'
                }`}
              >
                <button
                  onClick={() => handleStepClick(index)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 ${
                    index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                  } transition-all duration-300 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 glow-effect z-10`}
                >
                  {index + 1}
                </button>
                <span className="text-xs sm:text-sm text-center">{step}</span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-700 mt-4 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-inner">
          {renderStep()}
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded ${
              currentStep === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            } transition-all duration-300 glow-effect`}
          >
            <ChevronLeft className="mr-2" size={20} />
            Back
          </button>
          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleDownloadPDF}
              className="flex items-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500 transition-all duration-300 glow-effect"
            >
              Download Proposal
              <Download className="ml-2" size={20} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 glow-effect"
            >
              Next
              <ChevronRight className="ml-2" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;