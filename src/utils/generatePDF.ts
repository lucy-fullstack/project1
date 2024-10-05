import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface ProjectData {
  name: string;
  description: string;
  technologies: string[];
  deliverables: string[];
  technicalRequirements: string[];
  tasks: string[];
  timeEstimates: { [key: string]: number };
  hourlyRate: number;
  totalHours: number;
  totalCost: number;
  margin: number;
  milestones: Array<{ title: string; description: string; dueDate: string }>;
}

const generatePDF = (projectData: ProjectData, projectType: 'frontend' | 'backend' | 'fullstack') => {
  const doc = new jsPDF();

  // Helper function to add a section title
  const addSectionTitle = (title: string, y: number) => {
    doc.setFillColor(41, 128, 185); // Blue background
    doc.rect(0, y, 210, 10, 'F');
    doc.setTextColor(255, 255, 255); // White text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title, 10, y + 7);
  };

  // Helper function to add content
  const addContent = (content: string, y: number) => {
    doc.setTextColor(0, 0, 0); // Black text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(content, 10, y);
  };

  // Add a stylish header
  doc.setFillColor(52, 152, 219); // Light blue background
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(`${projectType.charAt(0).toUpperCase() + projectType.slice(1)} Project Proposal`, 105, 25, { align: "center" });

  // Project Overview
  let yPos = 50;
  addSectionTitle("Project Overview", yPos);
  yPos += 15;
  addContent(`Name: ${projectData.name}`, yPos);
  yPos += 10;
  addContent(`Description: ${projectData.description}`, yPos);
  yPos += 10;
  addContent(`Technologies: ${projectData.technologies.join(", ")}`, yPos);
  yPos += 10;
  addContent(`Deliverables: ${projectData.deliverables.join(", ")}`, yPos);

  // Technical Requirements
  yPos += 20;
  addSectionTitle("Technical Requirements", yPos);
  yPos += 15;
  projectData.technicalRequirements.forEach((req, index) => {
    addContent(`• ${req}`, yPos);
    yPos += 7;
  });

  // Tasks and Time Estimates
  yPos += 10;
  addSectionTitle("Tasks and Time Estimates", yPos);
  yPos += 15;
  const taskData = projectData.tasks.map((task, index) => [
    task,
    `${projectData.timeEstimates[task] || 0} hours`,
  ]);
  (doc as any).autoTable({
    startY: yPos,
    head: [["Task", "Estimated Time"]],
    body: taskData,
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [235, 245, 255] },
  });

  // Project Cost
  yPos = (doc as any).lastAutoTable.finalY + 20;
  addSectionTitle("Project Cost", yPos);
  yPos += 15;
  const totalHours = Object.values(projectData.timeEstimates).reduce((sum, hours) => sum + hours, 0);
  const totalCost = totalHours * projectData.hourlyRate;
  const adjustedCost = totalCost * (1 + projectData.margin / 100);
  addContent(`Hourly Rate: $${projectData.hourlyRate.toFixed(2)}`, yPos);
  yPos += 7;
  addContent(`Total Hours: ${totalHours}`, yPos);
  yPos += 7;
  addContent(`Base Cost: $${totalCost.toFixed(2)}`, yPos);
  yPos += 7;
  addContent(`Adjusted Cost (including ${projectData.margin}% margin): $${adjustedCost.toFixed(2)}`, yPos);

  // Milestones
  doc.addPage();
  yPos = 20;
  addSectionTitle("Project Milestones", yPos);
  yPos += 15;
  projectData.milestones.forEach((milestone, index) => {
    doc.setFillColor(235, 245, 255); // Light blue background
    doc.rect(10, yPos - 5, 190, 30, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${milestone.title}`, 15, yPos);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Description: ${milestone.description}`, 20, yPos + 10);
    doc.text(`Due Date: ${milestone.dueDate}`, 20, yPos + 20);
    yPos += 40;
  });

  // Add a footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
  }

  // Save the PDF with the appropriate name
  doc.save(`${projectType}-project-proposal.pdf`);
};

export default generatePDF;