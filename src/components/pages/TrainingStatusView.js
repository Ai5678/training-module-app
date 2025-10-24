import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { teamMembers, employeeTrainingAssignments } from '../../data/sampleData';

const TrainingStatusView = () => {
  const [searchType, setSearchType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Flatten data: one row per employee-training combination
  const trainingRecords = useMemo(() => {
    const records = [];
    
    teamMembers.forEach(member => {
      const assignments = employeeTrainingAssignments[member.employeeId] || [];
      
      assignments.forEach(assignment => {
        records.push({
          employeeId: member.employeeId,
          employeeName: member.name,
          role: member.role,
          ...assignment
        });
      });
    });
    
    return records;
  }, []);

  // Filter records based on search
  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) {
      return trainingRecords;
    }

    const term = searchTerm.toLowerCase();
    
    return trainingRecords.filter(record => {
      switch (searchType) {
        case 'document':
          return record.documentName.toLowerCase().includes(term) ||
                 record.documentId.toString().includes(term);
        case 'template':
          return record.templateNo && record.templateNo.toLowerCase().includes(term);
        case 'employee':
          return record.employeeName.toLowerCase().includes(term) ||
                 record.employeeId.toLowerCase().includes(term) ||
                 record.role.toLowerCase().includes(term);
        case 'supervisor':
          return record.supervisorVerification && 
                 record.supervisorVerification.initials.toLowerCase().includes(term);
        case 'all':
        default:
          return record.employeeName.toLowerCase().includes(term) ||
                 record.employeeId.toLowerCase().includes(term) ||
                 record.role.toLowerCase().includes(term) ||
                 record.documentName.toLowerCase().includes(term) ||
                 (record.templateNo && record.templateNo.toLowerCase().includes(term)) ||
                 (record.supervisorVerification && record.supervisorVerification.initials.toLowerCase().includes(term));
      }
    });
  }, [trainingRecords, searchType, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredRecords.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredRecords, currentPage, rowsPerPage]);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchType, searchTerm]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'awaiting_verification':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Awaiting Verification</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Pending Sign-off</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getDocumentStatusBadge = (status) => {
    return status === 'Active' 
      ? <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Active</span>
      : <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">Archived</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Production Staff Training Status</h1>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Search Training Records</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search By
            </label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Fields</option>
              <option value="document">Document No.</option>
              <option value="template">Template No.</option>
              <option value="employee">Eligible User</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Term
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Enter search term..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {searchTerm && (
          <div className="mt-4 text-sm text-gray-600">
            Found {filteredRecords.length} training record{filteredRecords.length !== 1 ? 's' : ''} matching your search
          </div>
        )}
      </div>

      {/* Training Status Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Production Staff Training Status
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revision #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-l-2 border-gray-300" colSpan="2">
                  Employee Signed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border-l-2 border-gray-300" colSpan="2">
                  Verified By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
              <tr className="bg-gray-50">
                <th colSpan="6"></th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-400 border-l-2 border-gray-300">Initials</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-400">Date</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-400 border-l-2 border-gray-300">Initials</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-400">Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{record.employeeId}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.employeeName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.documentName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.revision}</td>
                    <td className="px-6 py-4 text-sm">{getDocumentStatusBadge(record.documentStatus)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 border-l-2 border-gray-300 font-mono">
                      {record.employeeSignature ? record.employeeSignature.initials : <span className="text-gray-400">N/A</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.employeeSignature ? record.employeeSignature.dateTime : <span className="text-gray-400">N/A</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 border-l-2 border-gray-300 font-mono">
                      {record.supervisorVerification ? record.supervisorVerification.initials : <span className="text-gray-400">N/A</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.supervisorVerification ? record.supervisorVerification.dateTime : <span className="text-gray-400">N/A</span>}
                    </td>
                    <td className="px-6 py-4 text-sm">{getStatusBadge(record.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="px-6 py-8 text-center text-gray-500">
                    No training records found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredRecords.length > 0 && (
          <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredRecords.length)} of {filteredRecords.length} training records
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
    </div>
  );
};

export default TrainingStatusView;

