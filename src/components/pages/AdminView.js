import React from 'react';
import { pendingVerifications, templateTrainingMappings } from '../../data/sampleData';

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
          {templateTrainingMappings.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Template: {template.templateName}</h3>
                  <p className="text-sm text-gray-600 mt-1">Template ID: {template.templateId}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Required Training Documents:</p>
                <div className="flex flex-wrap gap-2">
                  {template.requiredTrainings.map((training, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {training.name} ({training.revision})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminView;
