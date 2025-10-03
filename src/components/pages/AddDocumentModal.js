import React, { useState, useMemo } from 'react';
import { X, Search, AlertCircle, CheckCircle2, Link as LinkIcon, FileText, Calendar, Loader } from 'lucide-react';
import { qualifiedTemplates } from '../../data/sampleData';

const AddDocumentModal = ({ isOpen, onClose, onSuccess }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    revision: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    uniPointUrl: '',
    description: '',
    author: '',
    nasLocation: ''
  });

  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [templateSearchTerm, setTemplateSearchTerm] = useState('');
  const [urlValidationState, setUrlValidationState] = useState('idle'); // idle, testing, success, error
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const categories = ['Quality', 'Safety', 'Operations', 'Compliance', 'Training'];

  // Filter templates based on search
  const filteredTemplates = useMemo(() => {
    return qualifiedTemplates.filter(template =>
      template.toLowerCase().includes(templateSearchTerm.toLowerCase())
    );
  }, [templateSearchTerm]);

  // Handle field changes
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Toggle template selection
  const toggleTemplate = (template) => {
    setSelectedTemplates(prev =>
      prev.includes(template)
        ? prev.filter(t => t !== template)
        : [...prev, template]
    );

    // Clear template error when user selects one
    if (errors.templates) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.templates;
        return newErrors;
      });
    }
  };

  // Select all templates
  const selectAllTemplates = () => {
    setSelectedTemplates(filteredTemplates);
  };

  // Clear all templates
  const clearAllTemplates = () => {
    setSelectedTemplates([]);
  };

  // Validate revision format (e.g., 1.0, 2.5, 3.2)
  const validateRevisionFormat = (revision) => {
    const revisionPattern = /^\d+\.\d+$/;
    return revisionPattern.test(revision);
  };

  // Validate UniPoint URL
  const validateUniPointUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Test UniPoint connection
  const testUniPointConnection = async () => {
    if (!formData.uniPointUrl) {
      setErrors(prev => ({ ...prev, uniPointUrl: 'Please enter a URL first' }));
      return;
    }

    if (!validateUniPointUrl(formData.uniPointUrl)) {
      setErrors(prev => ({ ...prev, uniPointUrl: 'Invalid URL format' }));
      return;
    }

    setUrlValidationState('testing');

    // Simulate API call to test connection
    setTimeout(() => {
      setUrlValidationState('success');
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.uniPointUrl;
        return newErrors;
      });
    }, 1500);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.name.trim()) {
      newErrors.name = 'Document name is required';
    } else if (formData.name.length > 200) {
      newErrors.name = 'Document name must be less than 200 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.revision.trim()) {
      newErrors.revision = 'Revision number is required';
    } else if (!validateRevisionFormat(formData.revision)) {
      newErrors.revision = 'Invalid revision format (use X.X, e.g., 1.0, 2.5)';
    }

    if (!formData.effectiveDate) {
      newErrors.effectiveDate = 'Effective date is required';
    }

    if (!formData.uniPointUrl.trim()) {
      newErrors.uniPointUrl = 'UniPoint URL is required';
    } else if (!validateUniPointUrl(formData.uniPointUrl)) {
      newErrors.uniPointUrl = 'Invalid URL format (must start with http:// or https://)';
    }

    if (selectedTemplates.length === 0) {
      newErrors.templates = 'Select at least one template';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save as draft
  const handleSaveAsDraft = () => {
    const draftDoc = {
      ...formData,
      relatedTemplates: selectedTemplates,
      status: 'Draft',
      id: Date.now(),
      signedByCount: 0,
      expirationDate: null,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    console.log('Saving as draft:', draftDoc);
    // TODO: Implement actual save logic
    onSuccess && onSuccess(draftDoc);
    handleClose();
  };

  // Handle add document
  const handleAddDocument = () => {
    if (!validateForm()) {
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        category: true,
        revision: true,
        effectiveDate: true,
        uniPointUrl: true
      });
      return;
    }

    const newDoc = {
      ...formData,
      relatedTemplates: selectedTemplates,
      status: 'Active',
      id: Date.now(),
      signedByCount: 0,
      expirationDate: null,
      lastUpdated: formData.effectiveDate,
      currentRev: formData.revision,
      createdBy: 'Current User',
      createdDate: new Date().toISOString().split('T')[0]
    };

    console.log('Adding new document:', newDoc);
    // TODO: Implement actual save logic
    onSuccess && onSuccess(newDoc);
    handleClose();
  };

  // Handle close
  const handleClose = () => {
    // Reset form
    setFormData({
      name: '',
      category: '',
      revision: '',
      effectiveDate: new Date().toISOString().split('T')[0],
      uniPointUrl: '',
      description: '',
      author: '',
      nasLocation: ''
    });
    setSelectedTemplates([]);
    setTemplateSearchTerm('');
    setUrlValidationState('idle');
    setErrors({});
    setTouched({});
    onClose();
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.category &&
      formData.revision.trim() &&
      validateRevisionFormat(formData.revision) &&
      formData.effectiveDate &&
      formData.uniPointUrl.trim() &&
      validateUniPointUrl(formData.uniPointUrl) &&
      selectedTemplates.length > 0
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Add Training Document</h2>
            <p className="text-sm text-gray-600 mt-1">Register a new training document in the system</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Document Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Document Information
            </h3>

            <div className="space-y-4">
              {/* Document Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., GMP Basic Training"
                  maxLength={200}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">{formData.name.length}/200 characters</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFieldChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    touched.category && errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {touched.category && errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Revision and Effective Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Revision Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.revision}
                    onChange={(e) => handleFieldChange('revision', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      touched.revision && errors.revision ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 1.0, 2.5, 3.2"
                  />
                  {touched.revision && errors.revision && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.revision}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Format: X.X</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Effective Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => handleFieldChange('effectiveDate', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      touched.effectiveDate && errors.effectiveDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {touched.effectiveDate && errors.effectiveDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.effectiveDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: UniPoint Integration */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <LinkIcon size={20} className="text-blue-600" />
              UniPoint Integration
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UniPoint Document URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.uniPointUrl}
                onChange={(e) => handleFieldChange('uniPointUrl', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  touched.uniPointUrl && errors.uniPointUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://unipoint.com/docs/..."
              />
              {touched.uniPointUrl && errors.uniPointUrl && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.uniPointUrl}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                <LinkIcon size={12} />
                Link to document in UniPoint system
              </p>

              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={testUniPointConnection}
                  disabled={urlValidationState === 'testing'}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {urlValidationState === 'testing' ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <LinkIcon size={16} />
                      Test Connection
                    </>
                  )}
                </button>

                {urlValidationState === 'success' && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle2 size={16} />
                    Connection successful
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Template Assignment */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Template Assignment
              <span className="text-red-500 text-base">*</span>
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              Select which manufacturing templates require this training document
            </p>

            <div className="mb-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={templateSearchTerm}
                onChange={(e) => setTemplateSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mb-3">
              <button
                type="button"
                onClick={selectAllTemplates}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Select All
              </button>
              {selectedTemplates.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllTemplates}
                  className="text-sm text-gray-600 hover:text-gray-700"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className={`border rounded-lg max-h-64 overflow-y-auto ${
              errors.templates ? 'border-red-500' : 'border-gray-200'
            }`}>
              {filteredTemplates.map((template, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={selectedTemplates.includes(template)}
                    onChange={() => toggleTemplate(template)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">{template}</span>
                </label>
              ))}
            </div>

            {errors.templates && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.templates}
              </p>
            )}

            <p className="mt-2 text-sm text-gray-600">
              Selected: <span className="font-semibold">{selectedTemplates.length}</span> template{selectedTemplates.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Section 4: Additional Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Additional Information (Optional)
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                  placeholder="Brief description of the document..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author/Owner
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleFieldChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Location on NAS
                </label>
                <input
                  type="text"
                  value={formData.nasLocation}
                  onChange={(e) => handleFieldChange('nasLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="\\SM-NAS\Training\QA\..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Summary */}
        <div className="border-t bg-gray-50 flex-shrink-0">
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Summary</h4>
            <div className="space-y-1 text-sm text-gray-700">
              {formData.name && (
                <div>• Document: <span className="font-semibold">{formData.name}</span> {formData.revision && `(Rev ${formData.revision})`}</div>
              )}
              {formData.category && (
                <div>• Category: <span className="font-semibold">{formData.category}</span></div>
              )}
              {formData.effectiveDate && (
                <div>• Effective: <span className="font-semibold">{new Date(formData.effectiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
              )}
              {selectedTemplates.length > 0 && (
                <div>• Linked to: <span className="font-semibold">{selectedTemplates.length}</span> template{selectedTemplates.length !== 1 ? 's' : ''}</div>
              )}
              <div>• Status: Will be set to <span className="font-semibold">"Active"</span></div>
            </div>
          </div>

          <div className="p-6 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {!isFormValid() && (
                <span className="flex items-center gap-1 text-amber-600">
                  <AlertCircle size={16} />
                  Please fill in all required fields
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAsDraft}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Save as Draft
              </button>
              <button
                onClick={handleAddDocument}
                disabled={!isFormValid()}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isFormValid()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;
