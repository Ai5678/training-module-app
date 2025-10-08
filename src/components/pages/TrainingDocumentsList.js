import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Edit, X, FileText, Users, CheckCircle, Archive, Save, Upload, ChevronDown, ChevronRight } from 'lucide-react';
import { trainingDocs, employeeSignatures } from '../../data/sampleData';

const TrainingDocumentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedSignatures, setSelectedSignatures] = useState(null);
  const [showSignaturesModal, setShowSignaturesModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [expandedDocs, setExpandedDocs] = useState({});

  // Group documents by name with active first, then archived
  const groupedDocs = useMemo(() => {
    // First, group by document name
    const groups = {};
    trainingDocs.forEach(doc => {
      if (!groups[doc.name]) {
        groups[doc.name] = [];
      }
      groups[doc.name].push(doc);
    });

    // Sort each group: Active first, then Archived by date (newest first)
    Object.keys(groups).forEach(name => {
      groups[name].sort((a, b) => {
        if (a.status === 'Active' && b.status !== 'Active') return -1;
        if (a.status !== 'Active' && b.status === 'Active') return 1;
        // Both archived, sort by date
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      });
    });

    return groups;
  }, []);

  // Filter and search logic with auto-expand
  const filteredGroups = useMemo(() => {
    const filtered = {};
    const shouldExpand = {};

    Object.keys(groupedDocs).forEach(docName => {
      const versions = groupedDocs[docName];
      
      // Check if any version matches the search/filter
      const matchingVersions = versions.filter(doc => {
        // Check search term
        const matchesDocumentFields = 
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.relatedTemplates.some(template => 
            template.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          doc.status.toLowerCase().includes(searchTerm.toLowerCase());
        
        const signatures = employeeSignatures[doc.id] || [];
        const matchesEmployeeName = signatures.some(signature =>
          signature.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        const matchesSearch = !searchTerm || matchesDocumentFields || matchesEmployeeName;
        
        // Check status filter
        const matchesStatus = statusFilter === 'all' || doc.status.toLowerCase() === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
      });

      if (matchingVersions.length > 0) {
        filtered[docName] = matchingVersions;
        
        // Auto-expand if search matches an archived version
        const hasArchivedMatch = matchingVersions.some((doc, idx) => 
          idx > 0 && searchTerm // idx > 0 means it's not the active (first) one
        );
        if (hasArchivedMatch) {
          shouldExpand[docName] = true;
        }
      }
    });

    // Apply auto-expand
    setExpandedDocs(prev => ({ ...prev, ...shouldExpand }));

    return filtered;
  }, [groupedDocs, searchTerm, statusFilter]);

  // Count total documents
  const totalDocCount = useMemo(() => {
    return Object.values(filteredGroups).reduce((sum, versions) => sum + versions.length, 0);
  }, [filteredGroups]);

  const toggleDocExpansion = (docName) => {
    setExpandedDocs(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  const handleTemplateClick = (templates, docName) => {
    setSelectedTemplates({ templates, docName });
    setShowTemplateModal(true);
  };

  const handleSignaturesClick = (docId, docName, revision) => {
    const signatures = employeeSignatures[docId] || [];
    setSelectedSignatures({ signatures, docName, revision });
    setShowSignaturesModal(true);
  };

  const handleEditClick = (doc) => {
    setEditingDoc({
      ...doc,
      expirationDate: doc.expirationDate || ''
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Here you would typically save to backend/state management
    console.log('Saving document:', editingDoc);
    setShowEditModal(false);
    setEditingDoc(null);
    // TODO: Implement actual save logic
  };

  const handleArchiveToggle = () => {
    const newStatus = editingDoc.status === 'Active' ? 'Archived' : 'Active';
    setEditingDoc({
      ...editingDoc,
      status: newStatus,
      expirationDate: newStatus === 'Archived' ? new Date().toISOString().split('T')[0] : null
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Training Documents</h1>
          <p className="text-sm text-gray-600 mt-1">Automatically synced from UniPoint</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by document name, template, employee name, or status..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter size={18} />
            Filter {statusFilter !== 'all' && <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">{statusFilter}</span>}
          </button>
          
          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-2">
                <p className="text-xs font-medium text-gray-500 uppercase px-2 py-1">Status</p>
                <button
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm ${statusFilter === 'all' ? 'bg-blue-50 text-blue-700' : ''}`}
                  onClick={() => { setStatusFilter('all'); setShowFilterMenu(false); }}
                >
                  All Documents
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm ${statusFilter === 'active' ? 'bg-blue-50 text-blue-700' : ''}`}
                  onClick={() => { setStatusFilter('active'); setShowFilterMenu(false); }}
                >
                  Active Only
                </button>
                <button
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm ${statusFilter === 'archived' ? 'bg-blue-50 text-blue-700' : ''}`}
                  onClick={() => { setStatusFilter('archived'); setShowFilterMenu(false); }}
                >
                  Archived Only
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {Object.keys(filteredGroups).length} document{Object.keys(filteredGroups).length !== 1 ? 's' : ''} ({totalDocCount} total versions)
        {searchTerm && (
          <span className="ml-2 text-blue-600">
            • Searching for "{searchTerm}"
          </span>
        )}
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revision</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Effective Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiration Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Signed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Templates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.keys(filteredGroups).map((docName) => {
                const versions = filteredGroups[docName];
                const activeDoc = versions[0]; // First one is always active or the main one
                const archivedVersions = versions.slice(1);
                const isExpanded = expandedDocs[docName];

                return (
                  <React.Fragment key={docName}>
                    {/* Active/Main Document Row */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          {archivedVersions.length > 0 && (
                            <button
                              onClick={() => toggleDocExpansion(docName)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              title={isExpanded ? 'Collapse' : 'Expand'}
                            >
                              {isExpanded ? (
                                <ChevronDown size={16} className="text-gray-600" />
                              ) : (
                                <ChevronRight size={16} className="text-gray-600" />
                              )}
                            </button>
                          )}
                          <span>{activeDoc.name}</span>
                          {archivedVersions.length > 0 && (
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                              {archivedVersions.length} archived
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{activeDoc.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{activeDoc.currentRev}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{activeDoc.lastUpdated}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {activeDoc.expirationDate || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          activeDoc.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {activeDoc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                          onClick={() => handleSignaturesClick(activeDoc.id, activeDoc.name, activeDoc.currentRev)}
                        >
                          <Users size={14} />
                          {activeDoc.signedByCount} employees
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                          onClick={() => handleTemplateClick(activeDoc.relatedTemplates, activeDoc.name)}
                        >
                          <FileText size={14} />
                          {activeDoc.relatedTemplates.length} templates
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            className="p-1 hover:bg-gray-100 rounded" 
                            title="View Document"
                          >
                            <Eye size={16} className="text-gray-600" />
                          </button>
                          <button 
                            className="p-1 hover:bg-gray-100 rounded" 
                            title="Edit Document"
                            onClick={() => handleEditClick(activeDoc)}
                          >
                            <Edit size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Archived Versions Rows (Expandable) */}
                    {isExpanded && archivedVersions.map((doc) => (
                      <tr key={doc.id} className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div className="flex items-center gap-2 pl-8 border-l-2 border-gray-300 ml-2">
                            <Archive size={14} className="text-gray-500" />
                            <span className="text-gray-600">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{doc.category}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">{doc.currentRev}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{doc.lastUpdated}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {doc.expirationDate || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                            onClick={() => handleSignaturesClick(doc.id, doc.name, doc.currentRev)}
                          >
                            <Users size={14} />
                            {doc.signedByCount} employees
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                            onClick={() => handleTemplateClick(doc.relatedTemplates, doc.name)}
                          >
                            <FileText size={14} />
                            {doc.relatedTemplates.length} templates
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              className="p-1 hover:bg-gray-100 rounded" 
                              title="View Document"
                            >
                              <Eye size={16} className="text-gray-600" />
                            </button>
                            <button 
                              className="p-1 hover:bg-gray-100 rounded" 
                              title="Edit Document"
                              onClick={() => handleEditClick(doc)}
                            >
                              <Edit size={16} className="text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Template Modal */}
      {showTemplateModal && selectedTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Related Templates</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedTemplates.docName}</p>
              </div>
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                This document is required for the following templates:
              </p>
              <div className="space-y-2">
                {selectedTemplates.templates.map((template, index) => {
                  const [templateId, ...nameParts] = template.split(':');
                  const templateName = nameParts.join(':').trim();
                  return (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FileText className="text-blue-600 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">{templateId}</p>
                        <p className="text-sm text-gray-600">{templateName}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Signatures Modal */}
      {showSignaturesModal && selectedSignatures && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Employee Signatures</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedSignatures.docName} - Rev {selectedSignatures.revision}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Total: {selectedSignatures.signatures.length} employees
                </p>
              </div>
              <button 
                onClick={() => setShowSignaturesModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {selectedSignatures.signatures.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Signed Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified By</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedSignatures.signatures.map((signature, index) => (
                        <tr key={signature.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{signature.employeeName}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{signature.signedDate}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{signature.verifiedDate}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{signature.verifiedBy}</td>
                          <td className="px-4 py-3">
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
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No signatures found for this document</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-between items-center flex-shrink-0">
              <button
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2"
              >
                <Upload size={16} />
                Export to Excel
              </button>
              <button
                onClick={() => setShowSignaturesModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Document Modal */}
      {showEditModal && editingDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Edit Document</h2>
              <p className="text-sm text-gray-600 mt-1">{editingDoc.name} - Rev {editingDoc.currentRev}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={editingDoc.category}
                  onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Quality">Quality</option>
                  <option value="Safety">Safety</option>
                  <option value="Operations">Operations</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Training">Training</option>
                </select>
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-2 text-sm rounded-lg font-medium ${
                      editingDoc.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {editingDoc.status}
                    </span>
                  </div>
                  <button
                    onClick={handleArchiveToggle}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Archive size={16} />
                    {editingDoc.status === 'Active' ? 'Archive Document' : 'Activate Document'}
                  </button>
                </div>
                {editingDoc.status === 'Active' && (
                  <p className="text-xs text-gray-500 mt-2">
                    Archiving will automatically set an expiration date to today
                  </p>
                )}
              </div>

              {/* Expiration Date Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={editingDoc.expirationDate || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, expirationDate: e.target.value })}
                  disabled={editingDoc.status === 'Active'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {editingDoc.status === 'Active' 
                    ? 'Expiration date can only be set for archived documents' 
                    : 'Set when this archived document expires'}
                </p>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingDoc(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TrainingDocumentsList;
