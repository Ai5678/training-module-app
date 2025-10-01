import React from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle, FileText, Eye } from 'lucide-react';
import { pendingTrainings, completedTrainings } from '../../data/sampleData';

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

export default EmployeeDashboard;
