export const pendingTrainings = [
  { id: 1, docName: 'GMP Basic Training', revision: 'Rev 3.2', assignedDate: '2025-09-15', dueDate: '2025-10-15', status: 'pending' },
  { id: 2, docName: 'Equipment Cleaning SOP', revision: 'Rev 2.1', assignedDate: '2025-09-20', dueDate: '2025-10-20', status: 'in-progress' },
];

export const completedTrainings = [
  { id: 3, docName: 'Safety Protocol', revision: 'Rev 4.0', completedDate: '2025-09-01', verifiedBy: 'John Smith', verified: true },
  { id: 4, docName: 'Quality Control Basics', revision: 'Rev 1.5', completedDate: '2025-08-15', verifiedBy: 'Jane Doe', verified: true },
  { id: 5, docName: 'DO1679: Adult Capnoxygen Mask Training', revision: 'Rev 2.0', completedDate: '2025-08-10', verifiedBy: 'John Smith', verified: true },
  { id: 6, docName: 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8" Training', revision: 'Rev 1.8', completedDate: '2025-07-25', verifiedBy: 'Jane Doe', verified: true },
  { id: 7, docName: 'DO1528: Baxter recon Training', revision: 'Rev 3.1', completedDate: '2025-07-10', verifiedBy: 'John Smith', verified: true },
  { id: 8, docName: 'Cleanroom Procedures', revision: 'Rev 2.5', completedDate: '2025-06-20', verifiedBy: 'Jane Doe', verified: true },
  { id: 9, docName: 'Documentation Standards', revision: 'Rev 1.2', completedDate: '2025-06-05', verifiedBy: 'John Smith', verified: true },
  { id: 10, docName: 'Environmental Monitoring', revision: 'Rev 3.0', completedDate: '2025-05-15', verifiedBy: 'Jane Doe', verified: true },
];

export const qualifiedTemplates = [
  'DO1679: Adult Capnoxygen Mask',
  'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"',
  'DO1528: Baxter recon',
  'DO1674: OxyMask II Kid 7\'',
  'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''
];

export const trainingDocs = [
  { id: 1, name: 'GMP Basic Training', category: 'Quality', currentRev: '3.2', lastUpdated: '2025-09-01', status: 'Active', templates: 3 },
  { id: 2, name: 'Equipment Cleaning SOP', category: 'Operations', currentRev: '2.1', lastUpdated: '2025-08-15', status: 'Active', templates: 5 },
  { id: 3, name: 'Safety Protocol', category: 'Safety', currentRev: '4.0', lastUpdated: '2025-07-20', status: 'Active', templates: 8 },
];

export const teamMembers = [
  { id: 1, name: 'Alice Johnson', role: 'Production', trainings: 12, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 2, name: 'Bob Wilson', role: 'Production', trainings: 10, pending: 1, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon'] },
  { id: 3, name: 'Carol Martinez', role: 'Production', trainings: 15, pending: 0, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
];

export const pendingVerifications = [
  { id: 1, employee: 'Alice Johnson', docName: 'GMP Basic Training', revision: 'Rev 3.2', signedDate: '2025-09-28', status: 'pending' },
  { id: 2, employee: 'Bob Wilson', docName: 'Safety Protocol', revision: 'Rev 4.0', signedDate: '2025-09-27', status: 'pending' },
];

export const templateTrainingMappings = [
  {
    id: 1,
    templateName: 'Adult Capnoxygen Mask',
    templateId: 'DO1679',
    requiredTrainings: [
      { name: 'GMP Basic Training', revision: 'Rev 3.2' },
      { name: 'Safety Protocol', revision: 'Rev 4.0' },
      { name: 'Cleanroom Procedures', revision: 'Rev 2.5' }
    ]
  },
  {
    id: 2,
    templateName: 'Oxy II EtCO2 Adult Subassembly SLF 8"',
    templateId: 'DO1007',
    requiredTrainings: [
      { name: 'GMP Basic Training', revision: 'Rev 3.2' },
      { name: 'Safety Protocol', revision: 'Rev 4.0' },
      { name: 'Equipment Cleaning SOP', revision: 'Rev 2.1' }
    ]
  },
  {
    id: 3,
    templateName: 'Baxter recon',
    templateId: 'DO1528',
    requiredTrainings: [
      { name: 'GMP Basic Training', revision: 'Rev 3.2' },
      { name: 'Safety Protocol', revision: 'Rev 4.0' },
      { name: 'Quality Control Basics', revision: 'Rev 1.5' }
    ]
  },
  {
    id: 4,
    templateName: 'OxyMask II Kid 7\'',
    templateId: 'DO1674',
    requiredTrainings: [
      { name: 'GMP Basic Training', revision: 'Rev 3.2' },
      { name: 'Safety Protocol', revision: 'Rev 4.0' },
      { name: 'Cleanroom Procedures', revision: 'Rev 2.5' }
    ]
  },
  {
    id: 5,
    templateName: 'OxyMask II Adult EtCO2 14", SLM 15\'',
    templateId: 'DO1862',
    requiredTrainings: [
      { name: 'GMP Basic Training', revision: 'Rev 3.2' },
      { name: 'Safety Protocol', revision: 'Rev 4.0' },
      { name: 'Equipment Cleaning SOP', revision: 'Rev 2.1' },
      { name: 'Documentation Standards', revision: 'Rev 1.2' }
    ]
  }
];
