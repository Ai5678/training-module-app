import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { pendingVerifications, templateTrainingMappings } from '../../data/sampleData';

const AdminView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter templates based on search term
  const filteredTemplates = useMemo(() => {
    if (!searchTerm) return templateTrainingMappings;

    return templateTrainingMappings.filter(template => {
      const matchesTemplateName = template.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   template.templateId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTrainingDoc = template.requiredTrainings.some(training =>
        training.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return matchesTemplateName || matchesTrainingDoc;
    });
  }, [searchTerm]);

  return (
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
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Template Training Requirements</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by template name or training document..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            Found {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <div className="p-6">
        {filteredTemplates.length > 0 ? (
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900">Template: {template.templateName}</h3>
                  <p className="text-sm text-gray-600 mt-1">Template ID: {template.templateId}</p>
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No templates found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default AdminView;
