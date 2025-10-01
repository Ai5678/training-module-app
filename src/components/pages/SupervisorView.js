import React from 'react';
import { pendingVerifications } from '../../data/sampleData';

const SupervisorView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Training Verification</h1>
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

  </div>
);

export default SupervisorView;
