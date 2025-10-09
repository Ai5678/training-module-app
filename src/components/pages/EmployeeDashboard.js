import React, { useState, useMemo } from 'react';
import { CheckCircle, Clock, FileText, ExternalLink, Search } from 'lucide-react';
import { pendingTrainings, completedTrainings, qualifiedTemplates, templateTrainingMappings } from '../../data/sampleData';

const EmployeeDashboard = ({ onNavigateToSignOff }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSign = (training) => {
    if (onNavigateToSignOff) {
      onNavigateToSignOff(training);
    }
  };

  const handleDocumentClick = (training) => {
    // TODO: Open UniPoint URL
    console.log('Opening document in UniPoint:', training);
    // In real implementation: window.open(training.uniPointUrl, '_blank');
  };

  // Check qualification status for selected template
  const templateStatus = useMemo(() => {
    if (!selectedTemplate) return null;

    const template = templateTrainingMappings.find(t => t.templateId === selectedTemplate);
    if (!template) return null;

    // Check if employee is qualified (has this template in their qualified list)
    const isQualified = qualifiedTemplates.some(qt => qt.startsWith(selectedTemplate));

    if (isQualified) {
      return {
        qualified: true,
        templateName: template.templateName,
        templateId: template.templateId
      };
    }

    // Find missing trainings by checking against completed & verified trainings
    const missingTrainings = template.requiredTrainings.filter(reqTraining => {
      // Check if this training is in completedTrainings AND verified
      const isCompleted = completedTrainings.some(ct => 
        ct.docName === reqTraining.name && 
        ct.revision === reqTraining.revision &&
        ct.verified === true
      );
      
      // If not completed and verified, it's missing
      return !isCompleted;
    });

    return {
      qualified: false,
      templateName: template.templateName,
      templateId: template.templateId,
      missingTrainings
    };
  }, [selectedTemplate]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Training Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="#pending-training" className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Pending Training</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{pendingTrainings.length}</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </a>
        <a href="#completed-training" className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Completed Training</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{completedTrainings.length}</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </a>
        <a href="#template-qualification" className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Qualified Templates</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{qualifiedTemplates.length}</p>
            </div>
            <FileText className="text-blue-500" size={24} />
          </div>
        </a>
      </div>

      {/* Pending Trainings */}
      <div id="pending-training" className="bg-white rounded-lg shadow scroll-mt-6">
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
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDocumentClick(training)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      {training.docName}
                      <ExternalLink size={14} />
                    </button>
                  </td>
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
                    <button 
                      onClick={() => handleSign(training)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Sign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Trainings */}
      <div id="completed-training" className="bg-white rounded-lg shadow scroll-mt-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Completed Training</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {completedTrainings.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDocumentClick(training)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      {training.docName}
                      <ExternalLink size={14} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.revision}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.completedDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.verifiedDate || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{training.verifiedBy || '-'}</td>
                  <td className="px-6 py-4">
                    {training.verified ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                        <CheckCircle size={12} />
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
                        <Clock size={12} />
                        Pending Verification
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Template Qualification Check */}
      <div id="template-qualification" className="bg-white rounded-lg shadow scroll-mt-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Template Qualification Check</h2>
          <p className="text-sm text-gray-600 mt-1">Search for a template to check your qualification status</p>
        </div>
        
        <div className="p-6">
          {/* Template Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Choose a template --</option>
              {templateTrainingMappings.map((template) => (
                <option key={template.id} value={template.templateId}>
                  {template.templateId}: {template.templateName}
                </option>
              ))}
            </select>
          </div>

          {/* Qualification Status */}
          {templateStatus && (
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <FileText className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">{templateStatus.templateId}</h3>
                  <p className="text-sm text-gray-600">{templateStatus.templateName}</p>
                </div>
              </div>

              {templateStatus.qualified ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="font-semibold text-green-800">You are qualified for this template!</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    You have completed all required trainings for this template.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-semibold text-yellow-800 mb-2">
                      Missing Trainings ({templateStatus.missingTrainings.length})
                    </p>
                    <p className="text-sm text-yellow-700">
                      Complete the following trainings to be qualified for this template:
                    </p>
                  </div>

                  {templateStatus.missingTrainings.length > 0 ? (
                    <div className="space-y-2">
                      {templateStatus.missingTrainings.map((training, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <Clock className="text-red-600 flex-shrink-0" size={16} />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{training.name}</p>
                            <p className="text-xs text-gray-600">{training.revision}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="font-semibold text-green-800">All trainings completed!</span>
                      </div>
                      <p className="text-sm text-green-700 mt-2">
                        Your qualification is being processed.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!selectedTemplate && (
            <div className="text-center py-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-3 text-gray-300" />
              <p>Select a template above to check your qualification status</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;