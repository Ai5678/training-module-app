import React, { useState, useMemo } from 'react';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { teamMembers, templateTrainingMappings, trainingDocs } from '../../data/sampleData';
import AssignTrainingModal from './AssignTrainingModal';
import QualifiedTemplatesModal from './QualifiedTemplatesModal';

const TeamLeaderView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preSelectedUsers, setPreSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [qualifiedTemplatesModalOpen, setQualifiedTemplatesModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Training Gaps Section State
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [gapsSearchTerm, setGapsSearchTerm] = useState('');
  const [gapsDocSearchTerm, setGapsDocSearchTerm] = useState('');

  const handleBulkAssign = () => {
    setPreSelectedUsers([]);
    setIsModalOpen(true);
  };

  const handleIndividualAssign = (user) => {
    setPreSelectedUsers([user]);
    setIsModalOpen(true);
  };

  const handleShowQualifiedTemplates = (employee) => {
    setSelectedEmployee(employee);
    setQualifiedTemplatesModalOpen(true);
  };

  // Filter employees based on search
  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredMembers.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredMembers, currentPage, rowsPerPage]);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Training Gaps Logic
  const trainingGapsData = useMemo(() => {
    if (!selectedTemplate) return [];

    const template = templateTrainingMappings.find(t => t.templateId === selectedTemplate);
    if (!template) return [];

    const requiredTrainingNames = template.requiredTrainings.map(t => t.name);
    
    // Find employees who have gaps
    const employeesWithGaps = teamMembers.map(member => {
      // Get the training docs the employee has completed (based on their qualified templates)
      const hasTemplate = member.qualified.some(q => q.startsWith(selectedTemplate));
      
      if (hasTemplate) {
        return null; // Employee is fully qualified for this template
      }

      // Find which specific trainings they're missing
      const missingTrainings = template.requiredTrainings.filter(reqTraining => {
        // This is simplified - in a real app, you'd check actual completion records
        // For now, we'll simulate some employees having completed some trainings
        return Math.random() > 0.3; // 70% chance of missing each training
      });

      if (missingTrainings.length === 0) {
        return null;
      }

      return {
        ...member,
        missingTrainings
      };
    }).filter(Boolean);

    return employeesWithGaps;
  }, [selectedTemplate]);

  // Filter training gaps data
  const filteredGapsData = useMemo(() => {
    return trainingGapsData.filter(employee => {
      const matchesEmployee = employee.name.toLowerCase().includes(gapsSearchTerm.toLowerCase()) ||
                             employee.employeeId.toLowerCase().includes(gapsSearchTerm.toLowerCase());
      
      const matchesDoc = !gapsDocSearchTerm || 
                        employee.missingTrainings.some(t => 
                          t.name.toLowerCase().includes(gapsDocSearchTerm.toLowerCase())
                        );
      
      return matchesEmployee && matchesDoc;
    });
  }, [trainingGapsData, gapsSearchTerm, gapsDocSearchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Production Training Management</h1>
        <button
          onClick={handleBulkAssign}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Assign Training
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Active Workers</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">750</p>
          <p className="text-xs text-green-600 mt-2">All active</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Pending Trainings</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">147</p>
          <p className="text-xs text-yellow-600 mt-2">38 due this week</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Compliance Rate</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">94%</p>
          <p className="text-xs text-green-600 mt-2">+2% from last month</p>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Production Staff Training Status</h2>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, role, or employee ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2">
              Found {filteredMembers.length} employee{filteredMembers.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qualified Templates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedMembers.length > 0 ? (
                paginatedMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{member.employeeId}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{member.trainings}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        member.pending === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.pending}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex gap-1 flex-wrap items-center">
                        {member.qualified.slice(0, 3).map((template, idx) => {
                          const [templateId] = template.split(':');
                          return (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {templateId}
                            </span>
                          );
                        })}
                        {member.qualified.length > 3 && (
                          <button
                            onClick={() => handleShowQualifiedTemplates(member)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded text-xs font-medium transition-colors"
                          >
                            +{member.qualified.length - 3} more
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleIndividualAssign(member)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Assign Training
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No employees found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredMembers.length > 0 && (
          <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredMembers.length)} of {filteredMembers.length} employees
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded flex items-center gap-1 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded flex items-center gap-1 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Training Gaps Analysis Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Training Gaps Analysis</h2>
          <p className="text-sm text-gray-600 mt-1">Select a template to view employees who need training</p>
        </div>
        
        <div className="p-6">
          {/* Template Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Choose a template --</option>
              {templateTrainingMappings.map((template) => (
                <option key={template.id} value={template.templateId}>
                  {template.templateId}: {template.templateName}
                </option>
              ))}
            </select>
          </div>

          {selectedTemplate && (
            <>
              {/* Summary Stats */}
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-gray-800">
                  {filteredGapsData.length} employee{filteredGapsData.length !== 1 ? 's' : ''} need{filteredGapsData.length === 1 ? 's' : ''} training for this template
                </p>
              </div>

              {/* Search Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by employee name or ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={gapsSearchTerm}
                    onChange={(e) => setGapsSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by training document..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={gapsDocSearchTerm}
                    onChange={(e) => setGapsDocSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Gaps Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Missing Trainings</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredGapsData.length > 0 ? (
                      filteredGapsData.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-mono text-gray-600">{employee.employeeId}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{employee.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{employee.role}</td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              {employee.missingTrainings.map((training, idx) => (
                                <div key={idx} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded inline-block mr-1">
                                  {training.name} ({training.revision})
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              employee.pending === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {employee.pending}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleIndividualAssign(employee)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              Assign Training
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          {gapsSearchTerm || gapsDocSearchTerm
                            ? 'No employees found matching your search criteria.'
                            : 'No training gaps found for this template. All employees are qualified!'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {!selectedTemplate && (
            <div className="text-center py-12 text-gray-500">
              <p>Select a template above to view training gaps analysis</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AssignTrainingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preSelectedUsers={preSelectedUsers}
      />

      <QualifiedTemplatesModal
        isOpen={qualifiedTemplatesModalOpen}
        onClose={() => setQualifiedTemplatesModalOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default TeamLeaderView;
