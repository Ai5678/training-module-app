import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';

const QualifiedTemplatesModal = ({ isOpen, onClose, employee }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter templates based on search
  const filteredTemplates = useMemo(() => {
    if (!employee || !employee.qualified) return [];
    return employee.qualified.filter(template =>
      template.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employee, searchTerm]);

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Qualified Templates</h2>
            <p className="text-sm text-gray-600 mt-1">
              {employee.name} ({employee.employeeId})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Total Qualified Templates: <span className="font-semibold text-gray-800">{employee.qualified.length}</span>
              {searchTerm && (
                <span> • Showing: <span className="font-semibold text-gray-800">{filteredTemplates.length}</span></span>
              )}
            </p>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="space-y-2">
              {filteredTemplates.map((template, index) => {
                const [templateId, templateName] = template.split(': ');
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span className="px-3 py-1 bg-blue-600 text-white rounded font-mono text-sm font-medium">
                      {templateId}
                    </span>
                    <span className="text-sm text-gray-800">{templateName}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm ? 'No templates found matching your search.' : 'No qualified templates.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex-shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualifiedTemplatesModal;

