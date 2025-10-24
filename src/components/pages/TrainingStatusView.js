import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { teamMembers, employeeTrainingAssignments } from '../../data/sampleData';

const TrainingStatusView = () => {
  const [searchType, setSearchType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Group training records by employee
  const groupedRecords = useMemo(() => {
    const grouped = [];
    
    teamMembers.forEach(member => {
      const assignments = employeeTrainingAssignments[member.employeeId] || [];
      
      if (assignments.length > 0) {
        grouped.push({
          employeeId: member.employeeId,
          employeeName: member.name,
          role: member.role,
          assignments: assignments
        });
      }
    });
    
    return grouped;
  }, []);

  // Filter grouped records based on search
  const filteredGroupedRecords = useMemo(() => {
    if (!searchTerm.trim()) {
      return groupedRecords;
    }

    const term = searchTerm.toLowerCase();
    
    return groupedRecords.filter(group => {
      switch (searchType) {
        case 'document':
          return group.assignments.some(a => 
            a.documentName.toLowerCase().includes(term) ||
            a.documentId.toString().includes(term)
          );
        case 'template':
          return group.assignments.some(a => 
            a.templateNo && a.templateNo.toLowerCase().includes(term)
          );
        case 'employee':
          return group.employeeName.toLowerCase().includes(term) ||
                 group.employeeId.toLowerCase().includes(term) ||
                 group.role.toLowerCase().includes(term);
        case 'supervisor':
          return group.assignments.some(a => 
            a.supervisorVerification && 
            a.supervisorVerification.initials.toLowerCase().includes(term)
          );
        case 'all':
        default:
          return group.employeeName.toLowerCase().includes(term) ||
                 group.employeeId.toLowerCase().includes(term) ||
                 group.role.toLowerCase().includes(term) ||
                 group.assignments.some(a => 
                   a.documentName.toLowerCase().includes(term) ||
                   (a.templateNo && a.templateNo.toLowerCase().includes(term)) ||
                   (a.supervisorVerification && a.supervisorVerification.initials.toLowerCase().includes(term))
                 );
      }
    });
  }, [groupedRecords, searchType, searchTerm]);

  // Calculate total records for pagination display
  const totalRecords = useMemo(() => {
    return filteredGroupedRecords.reduce((sum, group) => sum + group.assignments.length, 0);
  }, [filteredGroupedRecords]);

  // Pagination - paginate by employee groups
  const totalPages = Math.ceil(filteredGroupedRecords.length / rowsPerPage);
  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredGroupedRecords.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredGroupedRecords, currentPage, rowsPerPage]);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchType, searchTerm]);

  const formatInitials = (initials) => {
    if (!initials) return null;
    // Convert "AJ" to "A.J."
    return initials.split('').join('.');
  };

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
              <option value="employee">Employee Name</option>
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
            Found {totalRecords} training record{totalRecords !== 1 ? 's' : ''} matching your search
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" colSpan="2">
                  Employee Signed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" colSpan="2">
                  Supervisor Signed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
              <tr className="bg-gray-50">
                <th colSpan="6"></th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-400">sign</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-400">date</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-400">sign</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-400">date</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedGroups.length > 0 ? (
                paginatedGroups.map((group) => (
                  group.assignments.map((assignment, assignmentIdx) => (
                    <tr key={`${group.employeeId}-${assignmentIdx}`} className="hover:bg-gray-50">
                      {assignmentIdx === 0 && (
                        <>
                          <td className="px-6 py-4 text-sm font-mono text-gray-600" rowSpan={group.assignments.length}>
                            {group.employeeId}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900" rowSpan={group.assignments.length}>
                            {group.employeeName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600" rowSpan={group.assignments.length}>
                            {group.role}
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4 text-sm text-gray-900">{assignment.documentName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{assignment.revision}</td>
                      <td className="px-6 py-4 text-sm">{getDocumentStatusBadge(assignment.documentStatus)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                        {assignment.employeeSignature ? formatInitials(assignment.employeeSignature.initials) : <span className="text-gray-400">N/A</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {assignment.employeeSignature ? assignment.employeeSignature.dateTime : <span className="text-gray-400">N/A</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                        {assignment.supervisorVerification ? formatInitials(assignment.supervisorVerification.initials) : <span className="text-gray-400">N/A</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {assignment.supervisorVerification ? assignment.supervisorVerification.dateTime : <span className="text-gray-400">N/A</span>}
                      </td>
                      <td className="px-6 py-4 text-sm">{getStatusBadge(assignment.status)}</td>
                    </tr>
                  ))
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
        {filteredGroupedRecords.length > 0 && (
          <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredGroupedRecords.length)} of {filteredGroupedRecords.length} employees
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

