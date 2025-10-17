import React, { useState, useMemo } from 'react';
import { FileText, Users, CheckCircle2, AlertCircle, Search, ChevronRight, ChevronLeft, Printer, X, Eye, Plus } from 'lucide-react';
import { trainingDocs, teamMembers, templateTrainingMappings, employeeTrainingCompletions } from '../../data/sampleData';

const GroupTrainingSession = () => {
  // Main wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionStartTime] = useState(new Date().toISOString());

  // Step 1: Template Selection
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateSearchTerm, setTemplateSearchTerm] = useState('');

  // Step 2: Employee Sign-off (immediate after entering ID)
  const [employees, setEmployees] = useState([]); // Array of {employee, missingTrainings} - completed employees
  const [employeeIdInput, setEmployeeIdInput] = useState('');
  const [employeeIdError, setEmployeeIdError] = useState('');

  // Current employee signing flow
  const [currentEmployee, setCurrentEmployee] = useState(null); // Current employee being processed
  const [currentTrainingIndex, setCurrentTrainingIndex] = useState(0);
  const [employeeSignatures, setEmployeeSignatures] = useState({}); // {empId: {trainingId: {signature}}}
  const [currentChecklist, setCurrentChecklist] = useState({
    read: false,
    understood: false,
    follow: false,
    questions: false
  });
  const [currentComments, setCurrentComments] = useState('');

  // Signature confirmation modal (for employees)
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [modalPassword, setModalPassword] = useState('');

  // Step 3: Supervisor Verification
  const [supervisorChecklist, setSupervisorChecklist] = useState({
    allEmployeesPresent: false,
    documentsReviewed: false,
    questionsAnswered: false,
    sessionCompleted: false
  });
  const [sessionLocation, setSessionLocation] = useState('');
  const [supervisorNotes, setSupervisorNotes] = useState('');

  // Supervisor signature modal
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [supervisorModalPassword, setSupervisorModalPassword] = useState('');

  // Filtered templates
  const filteredTemplates = useMemo(() => {
    return templateTrainingMappings.filter(template =>
      template.templateName.toLowerCase().includes(templateSearchTerm.toLowerCase()) ||
      template.templateId.toLowerCase().includes(templateSearchTerm.toLowerCase())
    );
  }, [templateSearchTerm]);

  // Get required trainings for selected template
  const requiredTrainings = useMemo(() => {
    if (!selectedTemplate) return [];
    return selectedTemplate.requiredTrainings.map(reqTraining => {
      const doc = trainingDocs.find(d =>
        d.name === reqTraining.name &&
        d.currentRev === reqTraining.revision
      );
      return doc;
    }).filter(Boolean);
  }, [selectedTemplate]);

  // Current training for signing
  const currentTraining = currentEmployee?.missingTrainings[currentTrainingIndex];

  // Calculate total assignments and progress
  const totalAssignments = employees.reduce((sum, emp) => sum + emp.missingTrainings.length, 0);
  const completedAssignments = Object.values(employeeSignatures).reduce((sum, empSigs) => {
    return sum + Object.keys(empSigs).length;
  }, 0);

  // Navigation validation
  const canProceedStep1 = selectedTemplate !== null;
  const canProceedStep2 = employees.length > 0; // At least one employee completed
  const allChecklistChecked = Object.values(currentChecklist).every(v => v);
  const canOpenSignatureModal = allChecklistChecked;
  const canConfirmSignature = modalPassword.trim().length > 0;
  const allSupervisorChecklistChecked = Object.values(supervisorChecklist).every(v => v);
  const canOpenSupervisorModal = allSupervisorChecklistChecked;
  const canConfirmSupervisorSignature = supervisorModalPassword.trim().length > 0;

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  // Template selection handler
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  // Employee addition with gap analysis
  const handleAddEmployee = () => {
    setEmployeeIdError('');
    const employeeId = employeeIdInput.trim().toUpperCase();

    if (!employeeId) {
      setEmployeeIdError('Please enter an employee ID');
      return;
    }

    // Check if employee exists
    const employee = teamMembers.find(e => e.employeeId.toUpperCase() === employeeId);
    if (!employee) {
      setEmployeeIdError(`Employee ID "${employeeId}" not found`);
      return;
    }

    // Check if already completed
    if (employees.some(e => e.employee.id === employee.id)) {
      setEmployeeIdError(`${employee.name} has already completed training in this session`);
      return;
    }

    // Check if currently signing
    if (currentEmployee && currentEmployee.employee.id === employee.id) {
      setEmployeeIdError(`${employee.name} is currently signing trainings`);
      return;
    }

    // Perform gap analysis using employeeTrainingCompletions
    const completedTrainings = employeeTrainingCompletions[employee.employeeId] || [];

    // Find all required trainings for this template that haven't been completed
    const missingTrainings = selectedTemplate.requiredTrainings
      .map(reqTraining => {
        // Match by name and revision (handle "Rev X.X" vs "X.X" format)
        const training = trainingDocs.find(d => {
          const revisionMatch = d.currentRev === reqTraining.revision ||
                                `Rev ${d.currentRev}` === reqTraining.revision ||
                                d.currentRev === reqTraining.revision.replace('Rev ', '');
          return d.name === reqTraining.name && revisionMatch;
        });
        return training;
      })
      .filter(training => {
        // Include only trainings that haven't been completed
        return training && !completedTrainings.includes(training.id);
      });

    if (missingTrainings.length === 0) {
      setEmployeeIdError(`${employee.name} has no training gaps for this template`);
      return;
    }

    // Start signing flow for this employee
    setCurrentEmployee({ employee, missingTrainings });
    setCurrentTrainingIndex(0);
    setEmployeeIdInput('');
    setCurrentChecklist({ read: false, understood: false, follow: false, questions: false });
    setCurrentComments('');
  };

  const handleRemoveEmployee = (employeeId) => {
    setEmployees(prev => prev.filter(e => e.employee.id !== employeeId));
    // Also remove their signatures
    setEmployeeSignatures(prev => {
      const newSigs = { ...prev };
      delete newSigs[employeeId];
      return newSigs;
    });
  };

  // Signature modal handlers
  const handleOpenSignatureModal = () => {
    if (!canOpenSignatureModal) return;
    setShowSignatureModal(true);
  };

  const handleCloseSignatureModal = () => {
    setShowSignatureModal(false);
    setModalPassword('');
  };

  const handleEmployeeSign = () => {
    if (!canConfirmSignature || !currentEmployee || !currentTraining) return;

    const signature = {
      employeeId: currentEmployee.employee.id,
      employeeName: currentEmployee.employee.name,
      trainingId: currentTraining.id,
      trainingName: currentTraining.name,
      revision: currentTraining.currentRev,
      checklist: { ...currentChecklist },
      password: modalPassword,
      comments: currentComments,
      timestamp: new Date().toISOString()
    };

    // Store signature
    setEmployeeSignatures(prev => ({
      ...prev,
      [currentEmployee.employee.id]: {
        ...prev[currentEmployee.employee.id],
        [currentTraining.id]: signature
      }
    }));

    // Reset form
    setCurrentChecklist({
      read: false,
      understood: false,
      follow: false,
      questions: false
    });
    setCurrentComments('');
    setModalPassword('');
    setShowSignatureModal(false);

    // Move to next training or complete employee
    if (currentTrainingIndex < currentEmployee.missingTrainings.length - 1) {
      // More trainings for this employee
      setCurrentTrainingIndex(prev => prev + 1);
    } else {
      // This employee completed all trainings
      handleEmployeeComplete();
    }
  };

  const handleSkipTraining = () => {
    // Reset form
    setCurrentChecklist({
      read: false,
      understood: false,
      follow: false,
      questions: false
    });
    setCurrentComments('');

    // Move to next training or complete employee
    if (currentTrainingIndex < currentEmployee.missingTrainings.length - 1) {
      setCurrentTrainingIndex(prev => prev + 1);
    } else {
      handleEmployeeComplete();
    }
  };

  const handleEmployeeComplete = () => {
    // Add completed employee to list
    setEmployees(prev => [...prev, currentEmployee]);
    // Clear current employee
    setCurrentEmployee(null);
    setCurrentTrainingIndex(0);
  };

  const handleAddAnotherEmployee = () => {
    // Stay on step 2, allow adding another employee
    setEmployeeIdInput('');
    setEmployeeIdError('');
  };

  const handleProceedToVerification = () => {
    // Go to supervisor verification
    setCurrentStep(3);
  };

  const handlePreviousTraining = () => {
    if (currentTrainingIndex > 0) {
      setCurrentTrainingIndex(prev => prev - 1);
    }
    // Can't go back to previous employee in the new flow
  };

  // Supervisor handlers
  const handleChecklistChange = (field) => {
    setCurrentChecklist(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSupervisorChecklistChange = (field) => {
    setSupervisorChecklist(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleOpenSupervisorModal = () => {
    if (!canOpenSupervisorModal) return;
    setShowSupervisorModal(true);
  };

  const handleCloseSupervisorModal = () => {
    setShowSupervisorModal(false);
    setSupervisorModalPassword('');
  };

  const handleSubmitSession = () => {
    if (!canConfirmSupervisorSignature) return;

    const sessionData = {
      sessionId: `GTS-${Date.now()}`,
      sessionStartTime,
      sessionEndTime: new Date().toISOString(),
      template: selectedTemplate,
      employees: employees.map(e => e.employee),
      employeeSignatures,
      supervisorSignature: {
        password: supervisorModalPassword,
        checklist: supervisorChecklist,
        location: sessionLocation,
        notes: supervisorNotes,
        timestamp: new Date().toISOString()
      },
      totalAssignments,
      completedAssignments
    };

    console.log('Group Training Session Submitted:', sessionData);

    alert(`Group Training Session completed!\n\nTemplate: ${selectedTemplate.templateName}\n${completedAssignments} of ${totalAssignments} assignments signed\n\nAll signed employees have been verified.`);

    // Close modal and reset
    setShowSupervisorModal(false);
    setSupervisorModalPassword('');
    resetSession();
  };

  const resetSession = () => {
    setCurrentStep(1);
    setSelectedTemplate(null);
    setEmployees([]);
    setEmployeeSignatures({});
    setCurrentEmployee(null);
    setCurrentTrainingIndex(0);
    setSupervisorChecklist({
      allEmployeesPresent: false,
      documentsReviewed: false,
      questionsAnswered: false,
      sessionCompleted: false
    });
    setSessionLocation('');
    setSupervisorNotes('');
  };

  const handlePrintSummary = () => {
    console.log('Printing session summary...');
    alert('Print summary feature coming soon!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Group Training Session</h1>
          <p className="text-sm text-gray-600 mt-1">Conduct in-person group training with sequential employee sign-off</p>
        </div>
        {currentStep === 4 && (
          <button
            onClick={handlePrintSummary}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Printer size={18} />
            Print Summary
          </button>
        )}
      </div>

      {/* Step Indicator */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Select Template' },
            { num: 2, label: 'Employee Sign-off' },
            { num: 3, label: 'Supervisor Verification' }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep === step.num
                    ? 'bg-blue-600 text-white'
                    : currentStep > step.num
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.num ? <CheckCircle2 size={20} /> : step.num}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep === step.num ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {step.label}
                </span>
              </div>
              {idx < 2 && (
                <div className={`flex-1 h-1 mx-4 ${
                  currentStep > step.num ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Select Template */}
      {currentStep === 1 && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Step 1: Select Template
              {selectedTemplate && (
                <span className="text-sm font-normal text-blue-600">
                  ({selectedTemplate.templateId} selected)
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Choose the template that employees will be trained for</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={templateSearchTerm}
              onChange={(e) => setTemplateSearchTerm(e.target.value)}
            />
          </div>

          {/* Template List */}
          <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
            {filteredTemplates.map(template => (
              <label
                key={template.id}
                className="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              >
                <input
                  type="radio"
                  name="template"
                  checked={selectedTemplate?.id === template.id}
                  onChange={() => handleTemplateSelect(template)}
                  className="mt-1 w-5 h-5 text-blue-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {template.templateId}: {template.templateName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Requires {template.requiredTrainings.length} training document{template.requiredTrainings.length !== 1 ? 's' : ''}
                  </p>
                  {selectedTemplate?.id === template.id && (
                    <div className="mt-3 pt-3 border-t space-y-2">
                      <p className="text-xs font-medium text-gray-700">Required Training Documents:</p>
                      {template.requiredTrainings.map((training, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">
                          <FileText size={14} />
                          {training.name} ({training.revision})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-end items-center pt-4 border-t">
            {!canProceedStep1 && (
              <div className="flex items-center gap-2 text-sm text-amber-600 mr-4">
                <AlertCircle size={16} />
                <span>Please select a template</span>
              </div>
            )}
            <button
              onClick={() => goToStep(2)}
              disabled={!canProceedStep1}
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                canProceedStep1
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next: Add Employees
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Employee Sign-off */}
      {currentStep === 2 && !currentEmployee && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              Step 2: Employee Sign-off
              {employees.length > 0 && (
                <span className="text-sm font-normal text-green-600">
                  ({employees.length} completed)
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Enter employee ID - they will immediately review and sign their training documents
            </p>
          </div>

          {/* Selected Template Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-gray-900">
              Template: {selectedTemplate.templateId} - {selectedTemplate.templateName}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {selectedTemplate.requiredTrainings.length} required training{selectedTemplate.requiredTrainings.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Add Employee Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter Employee ID
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={employeeIdInput}
                  onChange={(e) => {
                    setEmployeeIdInput(e.target.value);
                    setEmployeeIdError('');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddEmployee();
                    }
                  }}
                  placeholder="e.g., EMP001"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    employeeIdError ? 'border-red-300' : 'border-gray-300'
                  }`}
                  autoFocus
                />
                {employeeIdError && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {employeeIdError}
                  </p>
                )}
              </div>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={18} />
                Start
              </button>
            </div>
          </div>

          {/* Completed Employees List */}
          {employees.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Completed Employees:</p>
              <div className="border border-gray-200 rounded-lg divide-y max-h-64 overflow-y-auto">
                {employees.map((emp) => (
                  <div key={emp.employee.id} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{emp.employee.name}</p>
                      <p className="text-xs text-gray-600">{emp.employee.employeeId} • Signed {emp.missingTrainings.length} training{emp.missingTrainings.length !== 1 ? 's' : ''}</p>
                    </div>
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 size={16} />
                      <span className="text-sm">Complete</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={() => goToStep(1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Back
            </button>
            {employees.length > 0 && (
              <button
                onClick={handleProceedToVerification}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                Proceed to Supervisor Verification
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Employee Signing Interface (shows during Step 2 when currentEmployee exists) */}
      {currentStep === 2 && currentEmployee && currentTraining && (
        <div className="bg-white rounded-lg shadow">
          {/* Progress Bar */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {completedAssignments} of {totalAssignments} assignments signed
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((completedAssignments / totalAssignments) * 100)}% complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedAssignments / totalAssignments) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Employee & Training Info */}
          <div className="p-6 bg-blue-50 border-b">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentEmployee.employee.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {currentEmployee.employee.employeeId} • {currentEmployee.employee.role}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Completed Employees</p>
                <p className="text-2xl font-bold text-green-600">
                  {employees.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="text-blue-600" size={16} />
              <span className="text-gray-700">
                Training {currentTrainingIndex + 1} of {currentEmployee.missingTrainings.length}
              </span>
            </div>
          </div>

          {/* Current Training Document */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Training Document:</h3>
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <FileText className="text-blue-600" size={24} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{currentTraining.name}</p>
                <p className="text-sm text-gray-600">Revision: {currentTraining.currentRev} • {currentTraining.category}</p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-1">
                <Eye size={14} />
                Open
              </button>
            </div>
          </div>

          {/* Training Checklist */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Training Confirmation Checklist</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentChecklist.read}
                  onChange={() => handleChecklistChange('read')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I have read and understood all sections of this training document</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentChecklist.understood}
                  onChange={() => handleChecklistChange('understood')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I understand the procedures and requirements outlined in this document</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentChecklist.follow}
                  onChange={() => handleChecklistChange('follow')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I will follow these procedures in my daily work activities</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentChecklist.questions}
                  onChange={() => handleChecklistChange('questions')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I have had an opportunity to ask questions and clarify any unclear points</span>
              </label>
            </div>
            {!allChecklistChecked && (
              <p className="text-xs text-amber-600 mt-3 flex items-center gap-1">
                <AlertCircle size={14} />
                Please check all items before signing
              </p>
            )}
          </div>

          {/* Comments Section */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Comments</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comments (Optional)</label>
              <textarea
                value={currentComments}
                onChange={(e) => setCurrentComments(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
                placeholder="Add any comments or questions..."
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="p-6 bg-gray-50 flex justify-between items-center border-t">
            <div className="flex gap-2">
              {currentTrainingIndex > 0 && (
                <button
                  onClick={handlePreviousTraining}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>
              )}
              <button
                onClick={handleSkipTraining}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Skip This Training
              </button>
              <button
                onClick={() => goToStep(4)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Complete & Verify Training
              </button>
            </div>
            <button
              onClick={handleOpenSignatureModal}
              disabled={!canOpenSignatureModal}
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                canOpenSignatureModal
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 size={18} />
              Sign This Training
            </button>
          </div>
        </div>
      )}

      {/* Employee Signature Modal */}
      {showSignatureModal && currentEmployee && currentTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Confirm Electronic Signature</h3>
                <button
                  onClick={handleCloseSignatureModal}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Employee Info */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Employee</p>
                <p className="font-semibold text-gray-900">{currentEmployee.employee.name}</p>
                <p className="text-sm text-gray-600">{currentEmployee.employee.employeeId}</p>
              </div>

              {/* Training Document */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Training Document:</p>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                  <FileText size={16} className="text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{currentTraining.name}</p>
                    <p className="text-xs text-gray-600">{currentTraining.currentRev}</p>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Password to Sign <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={modalPassword}
                  onChange={(e) => setModalPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && canConfirmSignature) {
                      handleEmployeeSign();
                    }
                  }}
                />
              </div>

              <p className="text-xs text-gray-600">
                By submitting, you confirm that you have read and understood this training document.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              <button
                onClick={handleCloseSignatureModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEmployeeSign}
                disabled={!canConfirmSignature}
                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  canConfirmSignature
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 size={18} />
                Submit Signature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Supervisor Verification */}
      {currentStep === 3 && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Step 3: Supervisor Verification</h2>

          {/* Session Summary */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Session Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Template:</p>
                <p className="font-medium text-gray-900">{selectedTemplate.templateId}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Employees:</p>
                <p className="font-medium text-gray-900">{employees.length}</p>
              </div>
              <div>
                <p className="text-gray-600">Completed Assignments:</p>
                <p className="font-medium text-green-700">{completedAssignments}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Assignments:</p>
                <p className="font-medium text-gray-900">{totalAssignments}</p>
              </div>
            </div>
          </div>

          {/* Employee Signatures */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Employee Signatures:</h3>
            <div className="border border-gray-200 rounded-lg divide-y max-h-64 overflow-y-auto">
              {employees.map(emp => {
                const empSigs = employeeSignatures[emp.employee.id] || {};
                const signedCount = Object.keys(empSigs).length;
                return (
                  <div key={emp.employee.id} className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{emp.employee.name}</p>
                        <p className="text-xs text-gray-600">{emp.employee.employeeId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Signed</p>
                        <p className={`text-sm font-medium ${signedCount === emp.missingTrainings.length ? 'text-green-700' : 'text-amber-700'}`}>
                          {signedCount} / {emp.missingTrainings.length}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supervisor Checklist */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Supervisor Confirmation Checklist</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={supervisorChecklist.allEmployeesPresent}
                  onChange={() => handleSupervisorChecklistChange('allEmployeesPresent')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I confirm that all employees who signed were present during the training session</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={supervisorChecklist.documentsReviewed}
                  onChange={() => handleSupervisorChecklistChange('documentsReviewed')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">All training documents were reviewed and discussed with employees</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={supervisorChecklist.questionsAnswered}
                  onChange={() => handleSupervisorChecklistChange('questionsAnswered')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">All employee questions were answered and concerns were addressed</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={supervisorChecklist.sessionCompleted}
                  onChange={() => handleSupervisorChecklistChange('sessionCompleted')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">The training session was completed successfully and all participants understand the material</span>
              </label>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Training Location (Optional)</label>
              <input
                type="text"
                value={sessionLocation}
                onChange={(e) => setSessionLocation(e.target.value)}
                placeholder="e.g., Training Room A, Production Floor"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor Notes (Optional)</label>
              <textarea
                value={supervisorNotes}
                onChange={(e) => setSupervisorNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Add any additional notes about the training session..."
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Back to Employee Sign-Off
            </button>
            <div className="flex items-center gap-4">
              {!canOpenSupervisorModal && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertCircle size={16} />
                  <span>Complete all checklist items to continue</span>
                </div>
              )}
              <button
                onClick={handleOpenSupervisorModal}
                disabled={!canOpenSupervisorModal}
                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  canOpenSupervisorModal
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 size={18} />
                Complete & Verify All Signatures
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supervisor Signature Modal */}
      {showSupervisorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Supervisor Verification - Confirm Signature</h3>
                <button
                  onClick={handleCloseSupervisorModal}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Session Summary */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Session Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Template:</span>
                    <span className="font-medium text-gray-900">{selectedTemplate.templateId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees:</span>
                    <span className="font-medium text-gray-900">{employees.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed Assignments:</span>
                    <span className="font-medium text-green-700">{completedAssignments} / {totalAssignments}</span>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Supervisor Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={supervisorModalPassword}
                  onChange={(e) => setSupervisorModalPassword(e.target.value)}
                  placeholder="Enter your password to verify"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && canConfirmSupervisorSignature) {
                      handleSubmitSession();
                    }
                  }}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Your signature will be applied as verification to all signed assignments
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
              <button
                onClick={handleCloseSupervisorModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitSession}
                disabled={!canConfirmSupervisorSignature}
                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  canConfirmSupervisorSignature
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 size={18} />
                Verify & Complete Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupTrainingSession;
