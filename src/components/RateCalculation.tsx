import React, { useState, useMemo } from 'react';
import countryList from 'react-select-country-list';
import Select from 'react-select';

interface RateCalculationProps {
  projectData: {
    hourlyRate: number;
  };
  updateProjectData: (newData: Partial<RateCalculationProps['projectData']>) => void;
  projectType: 'frontend' | 'backend' | 'fullstack';
}

const industryOptions = [
  { value: 'ecommerce', label: 'E-commerce', factor: 1.1 },
  { value: 'fintech', label: 'FinTech', factor: 1.3 },
  { value: 'healthtech', label: 'HealthTech', factor: 1.25 },
  { value: 'edtech', label: 'EdTech', factor: 1.15 },
  { value: 'social', label: 'Social Media', factor: 1.2 },
  { value: 'gaming', label: 'Gaming', factor: 1.2 },
  { value: 'iot', label: 'IoT', factor: 1.15 },
  { value: 'ai', label: 'AI/ML applications', factor: 1.35 },
  { value: 'blockchain', label: 'Blockchain', factor: 1.4 },
  { value: 'cybersecurity', label: 'Cybersecurity', factor: 1.3 },
  { value: 'datavis', label: 'Data Visualization', factor: 1.2 },
  { value: 'mobile', label: 'Mobile Apps', factor: 1.15 },
  { value: 'ar', label: 'Augmented Reality (AR)', factor: 1.25 },
  { value: 'vr', label: 'Virtual Reality (VR)', factor: 1.25 },
  { value: 'saas', label: 'SaaS Platforms', factor: 1.2 },
  { value: 'enterprise', label: 'Enterprise Solutions', factor: 1.25 },
];

const frontendTechStackOptions = [
  { value: 'react', label: 'React', factor: 1.15 },
  { value: 'vue', label: 'Vue', factor: 1.1 },
  { value: 'angular', label: 'Angular', factor: 1.1 },
  { value: 'svelte', label: 'Svelte', factor: 1.05 },
  { value: 'nextjs', label: 'Next.js', factor: 1.2 },
  { value: 'nuxtjs', label: 'Nuxt.js', factor: 1.15 },
  { value: 'gatsby', label: 'Gatsby', factor: 1.1 },
  { value: 'typescript', label: 'TypeScript', factor: 1.15 },
  { value: 'javascript', label: 'JavaScript', factor: 1.05 },
  { value: 'html5', label: 'HTML5', factor: 1 },
  { value: 'css3', label: 'CSS3', factor: 1 },
  { value: 'sass', label: 'Sass/SCSS', factor: 1.05 },
  { value: 'tailwind', label: 'Tailwind CSS', factor: 1.1 },
  { value: 'bootstrap', label: 'Bootstrap', factor: 1.05 },
  { value: 'materialui', label: 'Material-UI', factor: 1.1 },
  { value: 'styledcomponents', label: 'Styled Components', factor: 1.05 },
  { value: 'graphql', label: 'GraphQL', factor: 1.2 },
  { value: 'restapi', label: 'REST API', factor: 1.1 },
  { value: 'websockets', label: 'WebSockets', factor: 1.15 },
  { value: 'pwa', label: 'Progressive Web Apps (PWA)', factor: 1.15 },
  { value: 'webcomponents', label: 'Web Components', factor: 1.1 },
  { value: 'webpack', label: 'Webpack', factor: 1.05 },
  { value: 'babel', label: 'Babel', factor: 1.05 },
  { value: 'eslint', label: 'ESLint', factor: 1.05 },
  { value: 'jest', label: 'Jest', factor: 1.1 },
  { value: 'cypress', label: 'Cypress', factor: 1.1 },
  { value: 'storybook', label: 'Storybook', factor: 1.1 },
];

const backendTechStackOptions = [
  { value: 'nodejs', label: 'Node.js', factor: 1.1 },
  { value: 'express', label: 'Express.js', factor: 1.05 },
  { value: 'nestjs', label: 'NestJS', factor: 1.15 },
  { value: 'django', label: 'Django', factor: 1.1 },
  { value: 'flask', label: 'Flask', factor: 1.05 },
  { value: 'fastapi', label: 'FastAPI', factor: 1.15 },
  { value: 'spring', label: 'Spring Boot', factor: 1.2 },
  { value: 'aspnet', label: 'ASP.NET Core', factor: 1.15 },
  { value: 'laravel', label: 'Laravel', factor: 1.1 },
  { value: 'ruby', label: 'Ruby on Rails', factor: 1.1 },
  { value: 'go', label: 'Go', factor: 1.2 },
  { value: 'rust', label: 'Rust', factor: 1.25 },
  { value: 'graphql', label: 'GraphQL', factor: 1.2 },
  { value: 'restapi', label: 'REST API', factor: 1.1 },
  { value: 'mongodb', label: 'MongoDB', factor: 1.1 },
  { value: 'postgresql', label: 'PostgreSQL', factor: 1.15 },
  { value: 'mysql', label: 'MySQL', factor: 1.1 },
  { value: 'redis', label: 'Redis', factor: 1.15 },
  { value: 'elasticsearch', label: 'Elasticsearch', factor: 1.2 },
  { value: 'docker', label: 'Docker', factor: 1.15 },
  { value: 'kubernetes', label: 'Kubernetes', factor: 1.25 },
  { value: 'aws', label: 'AWS', factor: 1.2 },
  { value: 'azure', label: 'Azure', factor: 1.2 },
  { value: 'gcp', label: 'Google Cloud Platform', factor: 1.2 },
  { value: 'kafka', label: 'Apache Kafka', factor: 1.2 },
  { value: 'rabbitmq', label: 'RabbitMQ', factor: 1.15 },
  { value: 'grpc', label: 'gRPC', factor: 1.2 },
];

const fullstackTechStackOptions = [
  ...frontendTechStackOptions,
  ...backendTechStackOptions,
  { value: 'mern', label: 'MERN Stack', factor: 1.2 },
  { value: 'mean', label: 'MEAN Stack', factor: 1.2 },
  { value: 'lamp', label: 'LAMP Stack', factor: 1.15 },
  { value: 'jamstack', label: 'JAMstack', factor: 1.15 },
  { value: 'serverless', label: 'Serverless', factor: 1.2 },
  { value: 'microservices', label: 'Microservices', factor: 1.25 },
  { value: 'devops', label: 'DevOps', factor: 1.2 },
  { value: 'cicd', label: 'CI/CD', factor: 1.15 },
  { value: 'terraform', label: 'Terraform', factor: 1.2 },
  { value: 'ansible', label: 'Ansible', factor: 1.15 },
];

const RateCalculation: React.FC<RateCalculationProps> = ({ projectData, updateProjectData, projectType }) => {
  const [knowsRate, setKnowsRate] = useState<boolean | null>(null);
  const [location, setLocation] = useState<{ value: string; label: string } | null>(null);
  const [experience, setExperience] = useState<string>('');
  const [industryFocus, setIndustryFocus] = useState<{ value: string; label: string; factor: number }[]>([]);
  const [techStack, setTechStack] = useState<{ value: string; label: string; factor: number }[]>([]);
  const [availability, setAvailability] = useState<string>('');
  const [projectComplexity, setProjectComplexity] = useState<string>('');

  const countries = useMemo(() => countryList().getData(), []);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectData({ hourlyRate: parseFloat(e.target.value) || 0 });
  };

  const calculateSuggestedRate = () => {
    // Base rate adjusted for 2024 market conditions
    let baseRate = 70; // USD per hour

    // Adjust base rate based on project type
    switch (projectType) {
      case 'frontend':
        baseRate *= 1.0; // No adjustment
        break;
      case 'backend':
        baseRate *= 1.1; // 10% increase
        break;
      case 'fullstack':
        baseRate *= 1.2; // 20% increase
        break;
    }

    // Location factor (using more granular data)
    const locationFactors: { [key: string]: number } = {
      'United States': 1.4, 'Switzerland': 1.5, 'Australia': 1.3, 'Denmark': 1.35, 'Norway': 1.35,
      'United Kingdom': 1.25, 'Germany': 1.2, 'Canada': 1.2, 'Netherlands': 1.25, 'Sweden': 1.25,
      'Japan': 1.2, 'Singapore': 1.15, 'Ireland': 1.2, 'France': 1.15, 'Belgium': 1.15,
      'New Zealand': 1.1, 'Israel': 1.1, 'South Korea': 1.05, 'Spain': 1, 'Italy': 1,
    };
    const locationFactor = location ? (locationFactors[location.label] || 0.9) : 1;
    baseRate *= locationFactor;

    // Experience factor
    const experienceFactors: { [key: string]: number } = {
      '<1 year': 0.8,
      '1-3 years': 1,
      '3-5 years': 1.2,
      '5+ years': 1.4
    };
    baseRate *= experienceFactors[experience] || 1;

    // Industry focus factor
    const industryFactor = industryFocus.reduce((acc, industry) => acc * industry.factor, 1);
    baseRate *= industryFactor;

    // Tech stack factor
    const techStackFactor = techStack.reduce((acc, tech) => acc * tech.factor, 1);
    baseRate *= techStackFactor;

    // Availability factor
    const availabilityFactors: { [key: string]: number } = {
      'full-time': 1,
      'part-time': 1.1,
      'ad-hoc': 1.2
    };
    baseRate *= availabilityFactors[availability] || 1;

    // Project complexity factor
    const complexityFactors: { [key: string]: number } = {
      'low': 0.9,
      'medium': 1,
      'high': 1.2
    };
    baseRate *= complexityFactors[projectComplexity] || 1;

    // Round to nearest 5
    return Math.round(baseRate / 5) * 5;
  };

  const handleSuggestRate = () => {
    const suggestedRate = calculateSuggestedRate();
    updateProjectData({ hourlyRate: suggestedRate });
  };

  const getTechStackOptions = () => {
    switch (projectType) {
      case 'frontend':
        return frontendTechStackOptions;
      case 'backend':
        return backendTechStackOptions;
      case 'fullstack':
        return fullstackTechStackOptions;
    }
  };

  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#93c5fd', // text-blue-300
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#93c5fd', // text-blue-300
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(30, 41, 59, 0.9)',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(59, 130, 246, 0.8)' : 'transparent',
      color: 'white',
      '&:hover': {
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
      },
    }),
  };

  if (knowsRate === null) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hourly Rate</h2>
        <p className="mb-4 text-gray-600">Do you know your hourly rate?</p>
        <div className="space-x-4">
          <button
            onClick={() => setKnowsRate(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            Yes
          </button>
          <button
            onClick={() => setKnowsRate(false)}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  if (knowsRate) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hourly Rate</h2>
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your hourly rate (USD)
          </label>
          <input
            type="number"
            id="hourlyRate"
            value={projectData.hourlyRate || ''}
            onChange={handleRateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Rate Calculation</h2>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <Select
          id="location"
          options={countries}
          value={location}
          onChange={(selectedOption) => setLocation(selectedOption)}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={selectStyles}
        />
      </div>
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
          Years of Experience
        </label>
        <Select
          id="experience"
          options={[
            { value: '<1 year', label: 'Less than 1 year' },
            { value: '1-3 years', label: '1-3 years' },
            { value: '3-5 years', label: '3-5 years' },
            { value: '5+ years', label: '5+ years' },
          ]}
          value={{ value: experience, label: experience }}
          onChange={(selectedOption) => setExperience(selectedOption?.value || '')}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={selectStyles}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry Focus
        </label>
        <Select
          isMulti
          options={industryOptions}
          value={industryFocus}
          onChange={(selectedOptions) => setIndustryFocus(selectedOptions as typeof industryFocus)}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={selectStyles}
          closeMenuOnSelect={false}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tech Stack Expertise
        </label>
        <Select
          isMulti
          options={getTechStackOptions()}
          value={techStack}
          onChange={(selectedOptions) => setTechStack(selectedOptions as typeof techStack)}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={selectStyles}
          closeMenuOnSelect={false}
        />
      </div>
      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
          Availability
        </label>
        <Select
          id="availability"
          options={[
            { value: 'full-time', label: 'Full-time' },
            { value: 'part-time', label: 'Part-time' },
            { value: 'ad-hoc', label: 'Ad-hoc' },
          ]}
          value={{ value: availability, label: availability }}
          onChange={(selectedOption) => setAvailability(selectedOption?.value || '')}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={selectStyles}
        />
      </div>
      <div>
        <label htmlFor="projectComplexity" className="block text-sm font-medium text-gray-700 mb-2">
          Typical Project Complexity
        </label>
        <Select
          id="projectComplexity"
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          value={{ value: projectComplexity, label: projectComplexity }}
          onChange={(selectedOption) => setProjectComplexity(selectedOption?.value || '')}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={selectStyles}
        />
      </div>
      <div className="mt-6">
        <button
          onClick={handleSuggestRate}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Suggest Hourly Rate
        </button>
      </div>
      {projectData.hourlyRate > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-lg font-semibold text-gray-800">
            Suggested Hourly Rate: ${projectData.hourlyRate.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This rate is based on the information you provided and current market trends as of October 4, 2024. You can adjust this rate if you feel it doesn't accurately reflect your value.
          </p>
          <div className="mt-4">
            <label htmlFor="adjustedRate" className="block text-sm font-medium text-gray-700 mb-2">
              Adjust Hourly Rate (if needed)
            </label>
            <input
              type="number"
              id="adjustedRate"
              value={projectData.hourlyRate || ''}
              onChange={handleRateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RateCalculation;