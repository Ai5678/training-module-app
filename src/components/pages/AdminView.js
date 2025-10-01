import React from 'react';

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

export default AdminView;
