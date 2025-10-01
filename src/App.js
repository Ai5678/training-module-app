import React, { useState } from 'react';
import { FileText, Users, ClipboardCheck, BookOpen, CheckCircle, Clock, AlertCircle, Search, Filter, Plus, Upload, Eye, Edit, MoreVertical } from 'lucide-react';

const TrainingModuleUI = () => {
  const [currentPage, setCurrentPage] = useState('employee-dashboard');
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Sample data
  const pendingTrainings = [
    { id: 1, docName: 'GMP Basic Training', revision: 'Rev 3.2', assignedDate: '2025-09-15', dueDate: '2025-10-15', status: 'pending' },
    { id: 2, docName: 'Equipment Cleaning SOP', revision: 'Rev 2.1', assignedDate: '2025-09-20', dueDate: '2025-10-20', status: 'in-progress' },
  ];

  const completedTrainings = [
    { id: 3, docName: 'Safety Protocol', revision: 'Rev 4.0', completedDate: '2025-09-01', verifiedBy: 'John Smith', verified: true },
    { id: 4, docName: 'Quality Control Basics', revision: 'Rev 1.5', completedDate: '2025-08-15', verifiedBy: 'Jane Doe', verified: true },
  ];

  const trainingDocs = [
    { id: 1, name: 'GMP Basic Training', category: 'Quality', currentRev: '3.2', lastUpdated: '2025-09-01', status: 'Active', templates: 3 },
    { id: 2, name: 'Equipment Cleaning SOP', category: 'Operations', currentRev: '2.1', lastUpdated: '2025-08-15', status: 'Active', templates: 5 },
    { id: 3, name: 'Safety Protocol', category: 'Safety', currentRev: '4.0', lastUpdated: '2025-07-20', status: 'Active', templates: 8 },
  ];

  const teamMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Production', trainings: 12, pending: 2, qualified: ['Template A', 'Template B'] },
    { id: 2, name: 'Bob Wilson', role: 'Production', trainings: 10, pending: 1, qualified: ['Template A', 'Template C'] },
    { id: 3, name: 'Carol Martinez', role: 'Production', trainings: 15, pending: 0, qualified: ['Template A', 'Template B', 'Template C'] },
  ];

  const pendingVerifications = [
    { id: 1, employee: 'Alice Johnson', docName: 'GMP Basic Training', revision: 'Rev 3.2', signedDate: '2025-09-28', status: 'pending' },
    { id: 2, employee: 'Bob Wilson', docName: 'Safety Protocol', revision: 'Rev 4.0', signedDate: '2025-09-27', status: 'pending' },
  ];

  // Page Components
  const EmployeeDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Training Dashboard</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <BookOpen size={18} />
            My Qualifications
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Pending Training</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">24</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Qualified Templates</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
            </div>
            <FileText className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Due This Week</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">1</p>
            </div>
            <AlertCircle className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      {/* Pending Trainings */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Assigned Training</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingTrainings.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{training.docName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.revision}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.assignedDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.dueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      training.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {training.status === 'pending' ? 'Not Started' : 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-1">
                      <Eye size={14} />
                      View & Sign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Completed Trainings */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recently Completed Training</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {completedTrainings.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{training.docName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.revision}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.completedDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.verifiedBy}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                      <CheckCircle size={12} />
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TrainingDocumentsList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Training Documents</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Upload size={18} />
            Sync from NAS
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={18} />
            Add Document
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Revision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Templates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainingDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{doc.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{doc.currentRev}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.templates} templates</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded" title="View">
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                        <Edit size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded" title="More">
                        <MoreVertical size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TeamLeaderView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Team Training Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={18} />
          Assign Training
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Team Members</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">8</p>
          <p className="text-xs text-green-600 mt-2">All active</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Pending Trainings</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">12</p>
          <p className="text-xs text-yellow-600 mt-2">3 due this week</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Compliance Rate</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">94%</p>
          <p className="text-xs text-green-600 mt-2">+2% from last month</p>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Team Members Training Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qualified Templates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
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
                    <div className="flex gap-1 flex-wrap">
                      {member.qualified.map((template, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {template}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Assign Training
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Batch Records */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Batch Records & Training Gaps</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">Batch Record: Product ABC - Lot 2025-10-001</h3>
                  <p className="text-sm text-gray-600 mt-1">Template: Product ABC Manufacturing</p>
                  <p className="text-sm text-gray-600">Planned Start: Oct 5, 2025</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">3 training gaps</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Required Training:</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">GMP Basic Training (Rev 3.2)</span>
                    <span className="text-xs text-red-600">2 employees need training</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">Equipment Cleaning SOP (Rev 2.1)</span>
                    <span className="text-xs text-red-600">1 employee needs training</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SupervisorView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Training Verification</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Pending Verification</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
            </div>
            <ClipboardCheck className="text-yellow-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Verified Today</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">8</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">45</p>
            </div>
            <FileText className="text-blue-500" size={24} />
          </div>
        </div>
      </div>

      {/* Pending Verifications */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Pending Verifications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Signed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingVerifications.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.employee}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.docName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{item.revision}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.signedDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      Awaiting Verification
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Review
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                        Verify
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Qualification Matrix */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Team Qualification Matrix</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Employee</th>
                  <th className="text-center py-2 px-4">Template A</th>
                  <th className="text-center py-2 px-4">Template B</th>
                  <th className="text-center py-2 px-4">Template C</th>
                  <th className="text-center py-2 px-4">Template D</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">Alice Johnson</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle className="inline text-green-500" size={18} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle className="inline text-green-500" size={18} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <Clock className="inline text-yellow-500" size={18} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-gray-300">-</span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">Bob Wilson</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle className="inline text-green-500" size={18} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="text-gray-300">-</span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle className="inline text-green-500" size={18} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <Clock className="inline text-yellow-500" size={18} />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">Carol Martinez</td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle className="inline text-green-500" size={18} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle className="inline text-green-500" size={18} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle className="inline text-green-500" size={18} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <CheckCircle className="inline text-green-500" size={18} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <CheckCircle className="text-green-500" size={14} />
              <span>Qualified</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="text-yellow-500" size={14} />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-300">-</span>
              <span>Not Assigned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TrainingSignOffModal = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Training Document Review & Sign-off</h1>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Close
        </button>
      </div>

      {/* Document Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Document Name</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">GMP Basic Training</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Revision</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">Rev 3.2</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Effective Date</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">September 1, 2025</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Document Owner</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">Quality Assurance Dept.</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-2">Document Location</p>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded">
            <FileText className="text-gray-500" size={20} />
            <span className="text-sm text-gray-700 flex-1 font-mono">
              \\SM-NAS\Training\QA\GMP-Basic-Training-Rev3.2.pdf
            </span>
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-1">
              <Eye size={14} />
              Open Document
            </button>
          </div>
        </div>
      </div>

      {/* Training Checklist */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Training Confirmation Checklist</h2>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">I have read and understood all sections of this training document</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">I understand the procedures and requirements outlined in this document</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">I will follow these procedures in my daily work activities</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">I have had an opportunity to ask questions and clarify any unclear points</span>
          </label>
        </div>
      </div>

      {/* Quiz Section (Optional) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Knowledge Check (Optional)</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">1. What is the primary purpose of GMP?</p>
            <div className="space-y-2 ml-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="q1" className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">To ensure product quality and safety</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="q1" className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">To reduce production costs</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="q1" className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">To increase production speed</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-off Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Employee Sign-off</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comments (Optional)</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Add any comments or questions..."
            ></textarea>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Electronic Signature</label>
              <input
                type="password"
                placeholder="Enter your password to sign"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="text"
                value="2025-09-30"
                disabled
                className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Submit for Verification
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Training Administration</h1>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Documents</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">156</p>
          <p className="text-xs text-gray-500 mt-2">12 active revisions</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Active Employees</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">48</p>
          <p className="text-xs text-gray-500 mt-2">Production staff</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Trainings</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">1,247</p>
          <p className="text-xs text-green-600 mt-2">+45 this month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-600">Compliance Rate</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">96%</p>
          <p className="text-xs text-green-600 mt-2">Company target: 95%</p>
        </div>
      </div>

      {/* Template-Training Mapping */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Template Training Requirements</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Edit Mappings
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Template: Product ABC Manufacturing</h3>
                  <p className="text-sm text-gray-600 mt-1">Batch Record Template ID: TPL-001</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Required Training Documents:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    GMP Basic Training (Rev 3.2)
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Equipment Cleaning SOP (Rev 2.1)
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Safety Protocol (Rev 4.0)
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Product ABC SOP (Rev 1.3)
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Template: Product XYZ Manufacturing</h3>
                  <p className="text-sm text-gray-600 mt-1">Batch Record Template ID: TPL-002</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Required Training Documents:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    GMP Basic Training (Rev 3.2)
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Safety Protocol (Rev 4.0)
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Product XYZ SOP (Rev 2.0)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Training Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="text-gray-900">
                  <span className="font-medium">Alice Johnson</span> completed training on 
                  <span className="font-medium"> GMP Basic Training (Rev 3.2)</span>
                </p>
                <p className="text-gray-500 text-xs mt-1">Verified by John Smith • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="text-gray-900">
                  <span className="font-medium">Training document</span> updated: 
                  <span className="font-medium"> Equipment Cleaning SOP</span> to Rev 2.2
                </p>
                <p className="text-gray-500 text-xs mt-1">By Admin • 5 hours ago • 12 employees need retraining</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
              <div className="flex-1">
                <p className="text-gray-900">
                  <span className="font-medium">Team Leader Sarah</span> assigned training to 
                  <span className="font-medium"> 5 employees</span>
                </p>
                <p className="text-gray-500 text-xs mt-1">For upcoming Batch BR-2025-045 • Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation
  const pages = {
    'employee-dashboard': { title: 'Employee Dashboard', component: <EmployeeDashboard />, icon: <Users size={20} /> },
    'documents': { title: 'Training Documents', component: <TrainingDocumentsList />, icon: <FileText size={20} /> },
    'team-leader': { title: 'Team Management', component: <TeamLeaderView />, icon: <Users size={20} /> },
    'supervisor': { title: 'Verification', component: <SupervisorView />, icon: <ClipboardCheck size={20} /> },
    'sign-off': { title: 'Sign-off', component: <TrainingSignOffModal />, icon: <BookOpen size={20} /> },
    'admin': { title: 'Administration', component: <AdminView />, icon: <FileText size={20} /> },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Training Module</h2>
          <p className="text-xs text-gray-500 mt-1">Batch Record System</p>
        </div>
        <nav className="p-4">
          <div className="space-y-1">
            <button
              onClick={() => setCurrentPage('employee-dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'employee-dashboard'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span>My Dashboard</span>
            </button>
            <button
              onClick={() => setCurrentPage('sign-off')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'sign-off'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen size={20} />
              <span>Sign-off</span>
            </button>
            
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Management</p>
            </div>
            
            <button
              onClick={() => setCurrentPage('documents')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'documents'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText size={20} />
              <span>Documents</span>
            </button>
            <button
              onClick={() => setCurrentPage('team-leader')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'team-leader'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span>Team Management</span>
            </button>
            <button
              onClick={() => setCurrentPage('supervisor')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'supervisor'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ClipboardCheck size={20} />
              <span>Verification</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'admin'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText size={20} />
              <span>Administration</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {pages[currentPage].component}
        </div>
      </div>
    </div>
  );
};

export default TrainingModuleUI;