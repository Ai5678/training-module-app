import React from 'react';
import { Plus } from 'lucide-react';
import { teamMembers } from '../../data/sampleData';

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

export default TeamLeaderView;
