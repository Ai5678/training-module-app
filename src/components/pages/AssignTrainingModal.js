import React, { useState, useMemo } from 'react';
import { X, Search, Users, FileText, Calendar, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { trainingDocs, teamMembers, templateTrainingMappings } from '../../data/sampleData';

const AssignTrainingModal = ({ isOpen, onClose, preSelectedUsers = [] }) => {
  const [selectedUserIds, setSelectedUserIds] = useState(preSelectedUsers.map(u => u.id));
  const [selectedTrainingIds, setSelectedTrainingIds] = useState([]);
  const [dueDateOption, setDueDateOption] = useState('14days');
  const [customDueDate, setCustomDueDate] = useState('');
  const [sendNotification, setSendNotification] = useState(true);
  const [highPriority, setHighPriority] = useState(false);
  const [notes, setNotes] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [trainingSearchTerm, setTrainingSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectionMode, setSelectionMode] = useState('individual'); // 'individual' or 'template'
  const [selectedTemplateIds, setSelectedTemplateIds] = useState([]);
  const [expandedTemplates, setExpandedTemplates] = useState({});

  // Calculate due date based on selection
  const calculateDueDate = () => {
    const today = new Date();
    switch (dueDateOption) {
      case '7days':
        return new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0];
      case '14days':
        return new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0];
      case '30days':
        return new Date(today.setDate(today.getDate() + 30)).toISOString().split('T')[0];
      case 'custom':
        return customDueDate;
      default:
        return new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0];
    }
  };

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    return teamMembers.filter(user =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(userSearchTerm.toLowerCase())
    );
  }, [userSearchTerm]);

  // Filter training documents
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

  // Toggle user selection
  const toggleUser = (userId) => {
    setSelectedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Toggle training selection
  const toggleTraining = (trainingId) => {
    setSelectedTrainingIds(prev =>
      prev.includes(trainingId)
        ? prev.filter(id => id !== trainingId)
        : [...prev, trainingId]
    );
  };

  // Toggle template selection
  const toggleTemplate = (templateId) => {
    setSelectedTemplateIds(prev => {
      const isSelected = prev.includes(templateId);
      const template = templateTrainingMappings.find(t => t.templateId === templateId);
      
      if (template) {
        // Get training IDs for this template
        const templateTrainingIds = template.requiredTrainings
          .map(reqTraining => {
            const doc = trainingDocs.find(d => d.name === reqTraining.name && d.currentRev === reqTraining.revision);
            return doc?.id;
          })
          .filter(Boolean);

        if (isSelected) {
          // Deselect template and its trainings
          setSelectedTrainingIds(prevTrainings =>
            prevTrainings.filter(id => !templateTrainingIds.includes(id))
          );
          return prev.filter(id => id !== templateId);
        } else {
          // Select template and its trainings
          setSelectedTrainingIds(prevTrainings => [
            ...new Set([...prevTrainings, ...templateTrainingIds])
          ]);
          return [...prev, templateId];
        }
      }
      
      return prev;
    });
  };

  // Toggle template expansion
  const toggleTemplateExpansion = (templateId) => {
    setExpandedTemplates(prev => ({
      ...prev,
      [templateId]: !prev[templateId]
    }));
  };

  // Select all users
  const selectAllUsers = () => {
    setSelectedUserIds(filteredUsers.map(u => u.id));
  };

  // Clear all users
  const clearAllUsers = () => {
    setSelectedUserIds([]);
  };

  // Calculate summary
  const totalAssignments = selectedUserIds.length * selectedTrainingIds.length;
  const selectedUsers = teamMembers.filter(u => selectedUserIds.includes(u.id));
  const selectedTrainings = trainingDocs.filter(t => selectedTrainingIds.includes(t.id));

  // Validation
  const isValid = selectedUserIds.length > 0 && selectedTrainingIds.length > 0 &&
    (dueDateOption !== 'custom' || customDueDate);

  // Handle submit
  const handleSubmit = () => {
    if (!isValid) return;

    const dueDate = calculateDueDate();
    const assignments = {
      users: selectedUsers,
      trainings: selectedTrainings,
      dueDate,
      sendNotification,
      highPriority,
      notes,
      totalAssignments
    };

    console.log('Creating assignments:', assignments);
    // TODO: Implement actual assignment logic
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Assign Training Documents</h2>
            <p className="text-sm text-gray-600 mt-1">
              {preSelectedUsers.length > 0
                ? `Assigning to ${preSelectedUsers.map(u => u.name).join(', ')}`
                : 'Select employees and training documents to assign'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1: Select Employees */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                Step 1: Select Employees
                {selectedUserIds.length > 0 && (
                  <span className="text-sm font-normal text-blue-600">
                    ({selectedUserIds.length} selected)
                  </span>
                )}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={selectAllUsers}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Select All
                </button>
                {selectedUserIds.length > 0 && (
                  <button
                    onClick={clearAllUsers}
                    className="text-sm text-gray-600 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="mb-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search employees by name or role..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
              />
            </div>

            <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
              {filteredUsers.map(user => (
                <label
                  key={user.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.role} • {user.pending} pending trainings</p>
                  </div>
                  <div className="flex gap-1 flex-wrap max-w-xs">
                    {user.qualified.slice(0, 2).map((template, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                        {template.split(':')[0]}
                      </span>
                    ))}
                    {user.qualified.length > 2 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        +{user.qualified.length - 2}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Select Training Documents */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Step 2: Select Training Documents
                {selectedTrainingIds.length > 0 && (
                  <span className="text-sm font-normal text-blue-600">
                    ({selectedTrainingIds.length} selected)
                  </span>
                )}
              </h3>
            </div>

            {/* Selection Mode Toggle */}
            <div className="mb-4 flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectionMode('individual')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectionMode === 'individual'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Select Individual Documents
              </button>
              <button
                onClick={() => setSelectionMode('template')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectionMode === 'template'
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Select by Template
              </button>
            </div>

            {selectionMode === 'individual' ? (
              <>
                <div className="flex gap-3 mb-3">
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

                <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                  {filteredTrainings.map(training => (
                    <label
                      key={training.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTrainingIds.includes(training.id)}
                        onChange={() => toggleTraining(training.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{training.name}</p>
                        <p className="text-xs text-gray-600">
                          <span className="font-mono">{training.currentRev}</span> • {training.category} • {training.relatedTemplates.length} templates
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {training.status}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Select templates to automatically include all related training documents
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                  {templateTrainingMappings.map(template => {
                    const isExpanded = expandedTemplates[template.templateId];
                    const isSelected = selectedTemplateIds.includes(template.templateId);
                    
                    return (
                      <div key={template.id} className="border-b last:border-b-0">
                        <div className="flex items-center gap-3 p-3 hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleTemplate(template.templateId)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {template.templateId}: {template.templateName}
                            </p>
                            <p className="text-xs text-gray-600">
                              {template.requiredTrainings.length} training document{template.requiredTrainings.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleTemplateExpansion(template.templateId)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            {isExpanded ? (
                              <ChevronUp size={16} className="text-gray-600" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-600" />
                            )}
                          </button>
                        </div>
                        
                        {isExpanded && (
                          <div className="px-3 pb-3 pl-12 space-y-1 bg-gray-50">
                            {template.requiredTrainings.map((training, idx) => (
                              <div key={idx} className="text-xs text-gray-700 py-1">
                                • {training.name} ({training.revision})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Step 3: Set Due Date */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
              <Calendar size={20} className="text-blue-600" />
              Step 3: Set Due Date
            </h3>

            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="dueDate"
                  value="7days"
                  checked={dueDateOption === '7days'}
                  onChange={(e) => setDueDateOption(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">7 days from now</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="dueDate"
                  value="14days"
                  checked={dueDateOption === '14days'}
                  onChange={(e) => setDueDateOption(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">14 days from now (recommended)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="dueDate"
                  value="30days"
                  checked={dueDateOption === '30days'}
                  onChange={(e) => setDueDateOption(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">30 days from now</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="dueDate"
                  value="custom"
                  checked={dueDateOption === 'custom'}
                  onChange={(e) => setDueDateOption(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Custom date:</span>
                <input
                  type="date"
                  value={customDueDate}
                  onChange={(e) => {
                    setCustomDueDate(e.target.value);
                    setDueDateOption('custom');
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </label>
            </div>
          </div>

          {/* Step 4: Additional Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Step 4: Additional Options (Optional)
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Send email notification to employees</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highPriority}
                  onChange={(e) => setHighPriority(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Mark as high priority</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                  placeholder="Add any additional notes or instructions..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Summary */}
        <div className="border-t bg-gray-50 flex-shrink-0">
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Assignment Summary</h4>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <span>{selectedUserIds.length} employee{selectedUserIds.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                <span>
                  {selectedTrainingIds.length} training document{selectedTrainingIds.length !== 1 ? 's' : ''}
                  {selectionMode === 'template' && selectedTemplateIds.length > 0 && (
                    <span className="text-xs text-gray-600 ml-1">
                      (from {selectedTemplateIds.length} template{selectedTemplateIds.length !== 1 ? 's' : ''})
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                <span className="font-semibold">{totalAssignments} total assignment{totalAssignments !== 1 ? 's' : ''}</span>
              </div>
              {(dueDateOption !== 'custom' || customDueDate) && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  <span>Due: {new Date(calculateDueDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 flex justify-between items-center">
            {!isValid && (
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <AlertCircle size={16} />
                <span>Please select at least one employee and one training document</span>
              </div>
            )}
            {isValid && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 size={16} />
                <span>Ready to assign</span>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${isValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Assign Training
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTrainingModal;
