import React, { useState } from 'react';
import { FileText, Eye, ArrowLeft } from 'lucide-react';

const TrainingSignOffModal = ({ trainingData, onClose }) => {
  const [checklist, setChecklist] = useState({
    read: false,
    understood: false,
    follow: false,
    questions: false
  });

  // Use provided training data or fallback to default
  const document = trainingData || {
    docName: 'GMP Basic Training',
    revision: 'Rev 3.2',
    assignedDate: '2025-09-15',
    dueDate: '2025-10-15'
  };

  const handleChecklistChange = (field) => {
    setChecklist(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const allChecked = Object.values(checklist).every(value => value);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-800">Training Document Review & Sign-off</h1>
        </div>
      </div>

      {/* Document Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Document Name</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{document.docName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Revision</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{document.revision}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Assigned Date</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{document.assignedDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{document.dueDate}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-2">Document Location</p>
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded">
            <FileText className="text-gray-500" size={20} />
            <span className="text-sm text-gray-700 flex-1 font-mono">
              \\SM-NAS\Training\QA\{document.docName.replace(/\s+/g, '-')}-{document.revision.replace(/\s+/g, '')}.pdf
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
            <input 
              type="checkbox" 
              checked={checklist.read}
              onChange={() => handleChecklistChange('read')}
              className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" 
            />
            <span className="text-sm text-gray-700">I have read and understood all sections of this training document</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={checklist.understood}
              onChange={() => handleChecklistChange('understood')}
              className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" 
            />
            <span className="text-sm text-gray-700">I understand the procedures and requirements outlined in this document</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={checklist.follow}
              onChange={() => handleChecklistChange('follow')}
              className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" 
            />
            <span className="text-sm text-gray-700">I will follow these procedures in my daily work activities</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={checklist.questions}
              onChange={() => handleChecklistChange('questions')}
              className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" 
            />
            <span className="text-sm text-gray-700">I have had an opportunity to ask questions and clarify any unclear points</span>
          </label>
        </div>
        {!allChecked && (
          <p className="text-xs text-amber-600 mt-3 flex items-center gap-1">
            <span className="font-medium">⚠</span> Please check all items before signing
          </p>
        )}
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
                value={today}
                disabled
                className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              disabled={!allChecked}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                allChecked 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
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
};

export default TrainingSignOffModal;
