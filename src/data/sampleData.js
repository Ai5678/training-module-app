export const pendingTrainings = [
  { id: 1, docName: 'GMP Basic Training', revision: 'Rev 3.2', assignedDate: '2025-09-15', dueDate: '2025-10-15', status: 'pending' },
  { id: 2, docName: 'Equipment Cleaning SOP', revision: 'Rev 2.1', assignedDate: '2025-09-20', dueDate: '2025-10-20', status: 'in-progress' },
];

export const completedTrainings = [
  { id: 3, docName: 'Safety Protocol', revision: 'Rev 4.0', completedDate: '2025-09-01', verifiedBy: 'John Smith', verified: true },
  { id: 4, docName: 'Quality Control Basics', revision: 'Rev 1.5', completedDate: '2025-08-15', verifiedBy: 'Jane Doe', verified: true },
];

export const trainingDocs = [
  { id: 1, name: 'GMP Basic Training', category: 'Quality', currentRev: '3.2', lastUpdated: '2025-09-01', status: 'Active', templates: 3 },
  { id: 2, name: 'Equipment Cleaning SOP', category: 'Operations', currentRev: '2.1', lastUpdated: '2025-08-15', status: 'Active', templates: 5 },
  { id: 3, name: 'Safety Protocol', category: 'Safety', currentRev: '4.0', lastUpdated: '2025-07-20', status: 'Active', templates: 8 },
];

export const teamMembers = [
  { id: 1, name: 'Alice Johnson', role: 'Production', trainings: 12, pending: 2, qualified: ['Template A', 'Template B'] },
  { id: 2, name: 'Bob Wilson', role: 'Production', trainings: 10, pending: 1, qualified: ['Template A', 'Template C'] },
  { id: 3, name: 'Carol Martinez', role: 'Production', trainings: 15, pending: 0, qualified: ['Template A', 'Template B', 'Template C'] },
];

export const pendingVerifications = [
  { id: 1, employee: 'Alice Johnson', docName: 'GMP Basic Training', revision: 'Rev 3.2', signedDate: '2025-09-28', status: 'pending' },
  { id: 2, employee: 'Bob Wilson', docName: 'Safety Protocol', revision: 'Rev 4.0', signedDate: '2025-09-27', status: 'pending' },
];
