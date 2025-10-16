import React, { useState, useMemo } from 'react';
import { FileText, Users, CheckCircle2, AlertCircle, Search, ChevronRight, ChevronLeft, Printer, X, Eye } from 'lucide-react';
import { trainingDocs, teamMembers } from '../../data/sampleData';

const GroupTrainingSession = () => {
  // Main wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionStartTime] = useState(new Date().toISOString());

  // Step 1: Training Document Selection
  const [selectedTrainingIds, setSelectedTrainingIds] = useState([]);
  const [trainingSearchTerm, setTrainingSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Step 2: Employee Selection
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');

  // Step 3: Employee Sign-offs
  const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
  const [employeeSignatures, setEmployeeSignatures] = useState({});
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

  // Step 4: Supervisor Verification
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

  // Filtered training documents
  const filteredTrainings = useMemo(() => {
    return trainingDocs
      .filter(doc => doc.status === 'Active')
      .filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(trainingSearchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
        return matchesSearch && matchesCategory;
      });
  }, [trainingSearchTerm, categoryFilter]);

  // Get unique categories
  const categories = useMemo(() => {
    return ['all', ...new Set(trainingDocs.filter(doc => doc.status === 'Active').map(doc => doc.category))];
  }, []);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return teamMembers.filter(emp =>
      emp.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(employeeSearchTerm.toLowerCase())
    );
  }, [employeeSearchTerm]);

  // Selected data
  const selectedTrainings = trainingDocs.filter(t => selectedTrainingIds.includes(t.id));
  const selectedEmployees = teamMembers.filter(e => selectedEmployeeIds.includes(e.id));
  const currentEmployee = selectedEmployees[currentEmployeeIndex];

  // Total assignments
  const totalAssignments = selectedEmployeeIds.length * selectedTrainingIds.length;

  // Toggle training selection
  const toggleTraining = (trainingId) => {
    setSelectedTrainingIds(prev =>
      prev.includes(trainingId)
        ? prev.filter(id => id !== trainingId)
        : [...prev, trainingId]
    );
  };

  // Toggle employee selection
  const toggleEmployee = (employeeId) => {
    setSelectedEmployeeIds(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  // Select/Clear all employees
  const selectAllEmployees = () => {
    setSelectedEmployeeIds(filteredEmployees.map(e => e.id));
  };

  const clearAllEmployees = () => {
    setSelectedEmployeeIds([]);
  };

  // Checklist handlers
  const handleChecklistChange = (field) => {
    setCurrentChecklist(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSupervisorChecklistChange = (field) => {
    setSupervisorChecklist(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Navigation
  const canProceedStep1 = selectedTrainingIds.length > 0;
  const canProceedStep2 = selectedEmployeeIds.length > 0;
  const allChecklistChecked = Object.values(currentChecklist).every(v => v);
  const canOpenSignatureModal = allChecklistChecked;
  const canConfirmSignature = modalPassword.trim().length > 0;
  const allSupervisorChecklistChecked = Object.values(supervisorChecklist).every(v => v);
  const canOpenSupervisorModal = allSupervisorChecklistChecked;
  const canConfirmSupervisorSignature = supervisorModalPassword.trim().length > 0;

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const handleOpenSignatureModal = () => {
    if (!canOpenSignatureModal) return;
    setShowSignatureModal(true);
  };

  const handleCloseSignatureModal = () => {
    setShowSignatureModal(false);
    setModalPassword('');
  };

  const handleEmployeeSign = () => {
    if (!canConfirmSignature) return;

    // Store signature
    const signature = {
      employeeId: currentEmployee.id,
      employeeName: currentEmployee.name,
      checklist: { ...currentChecklist },
      password: modalPassword,
      comments: currentComments,
      timestamp: new Date().toISOString()
    };

    setEmployeeSignatures(prev => ({
      ...prev,
      [currentEmployee.id]: signature
    }));

    // Reset current form
    setCurrentChecklist({
      read: false,
      understood: false,
      follow: false,
      questions: false
    });
    setCurrentComments('');
    setModalPassword('');
    setShowSignatureModal(false);

    // Move to next employee or go to supervisor step
    if (currentEmployeeIndex < selectedEmployees.length - 1) {
      setCurrentEmployeeIndex(prev => prev + 1);
    } else {
      goToStep(4);
    }
  };

  const handlePreviousEmployee = () => {
    if (currentEmployeeIndex > 0) {
      setCurrentEmployeeIndex(prev => prev - 1);
    }
  };

  const handleSkipEmployee = () => {
    // Reset current form
    setCurrentChecklist({
      read: false,
      understood: false,
      follow: false,
      questions: false
    });
    setCurrentComments('');

    // Move to next employee or go to supervisor step
    if (currentEmployeeIndex < selectedEmployees.length - 1) {
      setCurrentEmployeeIndex(prev => prev + 1);
    } else {
      goToStep(4);
    }
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
      trainings: selectedTrainings,
      employees: selectedEmployees,
      employeeSignatures,
      supervisorSignature: {
        password: supervisorModalPassword,
        checklist: supervisorChecklist,
        location: sessionLocation,
        notes: supervisorNotes,
        timestamp: new Date().toISOString()
      },
      totalAssignments,
      signedCount: Object.keys(employeeSignatures).length,
      skippedCount: selectedEmployees.length - Object.keys(employeeSignatures).length
    };

    console.log('Group Training Session Submitted:', sessionData);
    // TODO: Send to backend/database

    alert(`Group Training Session completed!\n\n${Object.keys(employeeSignatures).length} employees signed\n${selectedEmployees.length - Object.keys(employeeSignatures).length} employees skipped\n\nAll signed employees have been verified.`);

    // Close modal and reset the form
    setShowSupervisorModal(false);
    setSupervisorModalPassword('');
    resetSession();
  };

  const resetSession = () => {
    setCurrentStep(1);
    setSelectedTrainingIds([]);
    setSelectedEmployeeIds([]);
    setEmployeeSignatures({});
    setCurrentEmployeeIndex(0);
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
    // TODO: Implement print functionality
    alert('Print summary feature coming soon!');
  };

  // Progress indicator
  const signedEmployees = Object.keys(employeeSignatures);
  const progressPercentage = selectedEmployees.length > 0
    ? (signedEmployees.length / selectedEmployees.length) * 100
    : 0;

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
            { num: 1, label: 'Select Training' },
            { num: 2, label: 'Select Employees' },
            { num: 3, label: 'Employee Sign-Off' },
            { num: 4, label: 'Supervisor Verification' }
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
              {idx < 3 && (
                <div className={`flex-1 h-1 mx-4 ${
                  currentStep > step.num ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Select Training Documents */}
      {currentStep === 1 && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Step 1: Select Training Documents
              {selectedTrainingIds.length > 0 && (
                <span className="text-sm font-normal text-blue-600">
                  ({selectedTrainingIds.length} selected)
                </span>
              )}
            </h2>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search training documents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={trainingSearchTerm}
                onChange={(e) => setTrainingSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Training List */}
          <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
            {filteredTrainings.map(training => (
              <label
                key={training.id}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={selectedTrainingIds.includes(training.id)}
                  onChange={() => toggleTraining(training.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{training.name}</p>
                  <p className="text-xs text-gray-600">
                    <span className="font-mono">{training.currentRev}</span> • {training.category} • Last updated: {training.lastUpdated}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              {!canProceedStep1 && (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle size={16} />
                  <span>Please select at least one training document</span>
                </div>
              )}
            </div>
            <button
              onClick={() => goToStep(2)}
              disabled={!canProceedStep1}
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                canProceedStep1
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next: Select Employees
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Employees */}
      {currentStep === 2 && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              Step 2: Select Employees
              {selectedEmployeeIds.length > 0 && (
                <span className="text-sm font-normal text-blue-600">
                  ({selectedEmployeeIds.length} selected)
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={selectAllEmployees}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Select All
              </button>
              {selectedEmployeeIds.length > 0 && (
                <button
                  onClick={clearAllEmployees}
                  className="text-sm text-gray-600 hover:text-gray-700"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search employees by name, ID, or role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={employeeSearchTerm}
              onChange={(e) => setEmployeeSearchTerm(e.target.value)}
            />
          </div>

          {/* Employee List */}
          <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
            {filteredEmployees.map(employee => (
              <label
                key={employee.id}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              >
                <input
                  type="checkbox"
                  checked={selectedEmployeeIds.includes(employee.id)}
                  onChange={() => toggleEmployee(employee.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                  <p className="text-xs text-gray-600">
                    {employee.employeeId} • {employee.role} • {employee.trainings} completed trainings
                  </p>
                </div>
              </label>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Session Summary</h4>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                <span>{selectedTrainingIds.length} training document{selectedTrainingIds.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <span>{selectedEmployeeIds.length} employee{selectedEmployeeIds.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span className="font-semibold">{totalAssignments} total assignment{totalAssignments !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={() => goToStep(1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Back
            </button>
            <div className="flex items-center gap-4">
              {!canProceedStep2 && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertCircle size={16} />
                  <span>Please select at least one employee</span>
                </div>
              )}
              <button
                onClick={() => goToStep(3)}
                disabled={!canProceedStep2}
                className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  canProceedStep2
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Start Sign-Off Process
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Employee Sign-Off (Kiosk Mode) */}
      {currentStep === 3 && currentEmployee && (
        <div className="bg-white rounded-lg shadow">
          {/* Progress Bar */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {signedEmployees.length} of {selectedEmployees.length} employees signed
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progressPercentage)}% complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Current Employee Info */}
          <div className="p-6 bg-blue-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentEmployee.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {currentEmployee.employeeId} • {currentEmployee.role}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Employee</p>
                <p className="text-2xl font-bold text-blue-600">
                  {currentEmployeeIndex + 1} / {selectedEmployees.length}
                </p>
              </div>
            </div>
          </div>

          {/* Training Documents to Review */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Training Documents to Review:</h3>
            <div className="space-y-2">
              {selectedTrainings.map((training, idx) => (
                <div key={training.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="text-blue-600" size={20} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{training.name}</p>
                    <p className="text-xs text-gray-600">Revision: {training.currentRev}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1">
                    <Eye size={14} />
                    Open
                  </button>
                </div>
              ))}
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
                <span className="text-sm text-gray-700">I have read and understood all sections of these training documents</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentChecklist.understood}
                  onChange={() => handleChecklistChange('understood')}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I understand the procedures and requirements outlined in these documents</span>
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
              {currentEmployeeIndex > 0 && (
                <button
                  onClick={handlePreviousEmployee}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                >
                  <ChevronLeft size={18} />
                  Previous Employee
                </button>
              )}
              <button
                onClick={handleSkipEmployee}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Skip (Employee Absent)
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
              {currentEmployeeIndex < selectedEmployees.length - 1 ? 'Sign & Next Employee' : 'Sign & Continue to Verification'}
            </button>
          </div>
        </div>
      )}

      {/* Signature Confirmation Modal */}
      {showSignatureModal && currentEmployee && (
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
                <p className="font-semibold text-gray-900">{currentEmployee.name}</p>
                <p className="text-sm text-gray-600">{currentEmployee.employeeId}</p>
              </div>

              {/* Training Documents Summary */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Training Documents ({selectedTrainings.length}):</p>
                <div className="space-y-1">
                  {selectedTrainings.map((training) => (
                    <div key={training.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                      <FileText size={16} className="text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{training.name}</p>
                        <p className="text-xs text-gray-600">{training.currentRev}</p>
                      </div>
                    </div>
                  ))}
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
                By submitting, you confirm that you have read and understood all selected training documents.
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

      {/* Step 4: Supervisor Verification */}
      {currentStep === 4 && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Step 4: Supervisor Verification</h2>

          {/* Session Summary */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Session Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Training Documents:</p>
                <p className="font-medium text-gray-900">{selectedTrainings.length}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Employees:</p>
                <p className="font-medium text-gray-900">{selectedEmployees.length}</p>
              </div>
              <div>
                <p className="text-gray-600">Employees Signed:</p>
                <p className="font-medium text-green-700">{signedEmployees.length}</p>
              </div>
              <div>
                <p className="text-gray-600">Employees Skipped:</p>
                <p className="font-medium text-amber-700">{selectedEmployees.length - signedEmployees.length}</p>
              </div>
            </div>
          </div>

          {/* Signed Employees List */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Employees Who Signed:</h3>
            <div className="border border-gray-200 rounded-lg divide-y max-h-64 overflow-y-auto">
              {signedEmployees.length > 0 ? (
                signedEmployees.map(empId => {
                  const emp = selectedEmployees.find(e => e.id === parseInt(empId));
                  const sig = employeeSignatures[empId];
                  return (
                    <div key={empId} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-600">{emp.employeeId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Signed at</p>
                        <p className="text-xs font-medium text-gray-900">
                          {new Date(sig.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p className="text-sm">No employees have signed yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Skipped Employees List */}
          {selectedEmployees.length - signedEmployees.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Employees Who Did Not Sign:</h3>
              <div className="border border-amber-200 bg-amber-50 rounded-lg divide-y max-h-48 overflow-y-auto">
                {selectedEmployees
                  .filter(emp => !signedEmployees.includes(emp.id.toString()))
                  .map(emp => (
                    <div key={emp.id} className="p-3">
                      <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                      <p className="text-xs text-gray-600">{emp.employeeId}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

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
              onClick={() => {
                setCurrentStep(3);
                setCurrentEmployeeIndex(selectedEmployees.length - 1);
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Back to Sign-Off
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
                    <span className="text-gray-600">Training Documents:</span>
                    <span className="font-medium text-gray-900">{selectedTrainings.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees Signed:</span>
                    <span className="font-medium text-green-700">{signedEmployees.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees Skipped:</span>
                    <span className="font-medium text-amber-700">{selectedEmployees.length - signedEmployees.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Assignments:</span>
                    <span className="font-medium text-gray-900">{totalAssignments}</span>
                  </div>
                </div>
              </div>

              {/* Training Documents List */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Training Documents:</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {selectedTrainings.map((training) => (
                    <div key={training.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                      <FileText size={16} className="text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{training.name}</p>
                        <p className="text-xs text-gray-600">{training.currentRev}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signed Employees */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Signed Employees ({signedEmployees.length}):</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {signedEmployees.map(empId => {
                    const emp = selectedEmployees.find(e => e.id === parseInt(empId));
                    return (
                      <div key={empId} className="flex items-center gap-2 p-2 bg-green-50 rounded text-sm">
                        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-600">{emp.employeeId}</p>
                        </div>
                      </div>
                    );
                  })}
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
                  Your signature will be applied as verification to all {signedEmployees.length} signed employee{signedEmployees.length !== 1 ? 's' : ''}
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
