import React from 'react';
import { ClipboardCheck, CheckCircle, FileText, Clock } from 'lucide-react';
import { pendingVerifications } from '../../data/sampleData';

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

export default SupervisorView;
