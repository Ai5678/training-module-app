export const pendingTrainings = [
  { id: 1, docName: 'GMP Basic Training', revision: 'Rev 3.2', assignedDate: '2025-09-15', dueDate: '2025-10-15', status: 'pending' },
  { id: 2, docName: 'Equipment Cleaning SOP', revision: 'Rev 2.1', assignedDate: '2025-09-20', dueDate: '2025-10-20', status: 'in-progress' },
];

export const completedTrainings = [
  { id: 3, docName: 'Safety Protocol', revision: 'Rev 4.0', completedDate: '2025-09-01', verifiedBy: 'John Smith', verified: true },
  { id: 4, docName: 'Quality Control Basics', revision: 'Rev 1.5', completedDate: '2025-08-15', verifiedBy: 'Jane Doe', verified: true },
  { id: 5, docName: 'Cleanroom Procedures', revision: 'Rev 2.5', completedDate: '2025-06-20', verifiedBy: 'Jane Doe', verified: true },
  { id: 6, docName: 'Documentation Standards', revision: 'Rev 1.2', completedDate: '2025-06-05', verifiedBy: 'John Smith', verified: true },
  { id: 7, docName: 'Environmental Monitoring', revision: 'Rev 3.0', completedDate: '2025-05-15', verifiedBy: 'Jane Doe', verified: true },
];

export const qualifiedTemplates = [
  'DO1679: Adult Capnoxygen Mask',
  'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"',
  'DO1528: Baxter recon',
  'DO1674: OxyMask II Kid 7\'',
  'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''
];

export const trainingDocs = [
  // Active versions
  { 
    id: 1, 
    name: 'GMP Basic Training', 
    category: 'Quality', 
    currentRev: '3.2', 
    lastUpdated: '2025-09-01', 
    status: 'Active', 
    signedByCount: 8,
    expirationDate: null,
    relatedTemplates: [
      'DO1679: Adult Capnoxygen Mask',
      'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"',
      'DO1528: Baxter recon',
      'DO1674: OxyMask II Kid 7\'',
      'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''
    ]
  },
  { 
    id: 2, 
    name: 'Equipment Cleaning SOP', 
    category: 'Operations', 
    currentRev: '2.1', 
    lastUpdated: '2025-08-15', 
    status: 'Active', 
    signedByCount: 5,
    expirationDate: null,
    relatedTemplates: [
      'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"',
      'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''
    ]
  },
  { 
    id: 3, 
    name: 'Safety Protocol', 
    category: 'Safety', 
    currentRev: '4.0', 
    lastUpdated: '2025-07-20', 
    status: 'Active', 
    signedByCount: 6,
    expirationDate: null,
    relatedTemplates: [
      'DO1679: Adult Capnoxygen Mask',
      'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"',
      'DO1528: Baxter recon',
      'DO1674: OxyMask II Kid 7\'',
      'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''
    ]
  },
  { 
    id: 4, 
    name: 'Cleanroom Procedures', 
    category: 'Operations', 
    currentRev: '2.5', 
    lastUpdated: '2025-06-20', 
    status: 'Active', 
    signedByCount: 4,
    expirationDate: null,
    relatedTemplates: [
      'DO1679: Adult Capnoxygen Mask',
      'DO1674: OxyMask II Kid 7\''
    ]
  },
  { 
    id: 5, 
    name: 'Quality Control Basics', 
    category: 'Quality', 
    currentRev: '1.5', 
    lastUpdated: '2025-08-15', 
    status: 'Active', 
    signedByCount: 3,
    expirationDate: null,
    relatedTemplates: [
      'DO1528: Baxter recon'
    ]
  },
  { 
    id: 6, 
    name: 'Documentation Standards', 
    category: 'Quality', 
    currentRev: '1.2', 
    lastUpdated: '2025-06-05', 
    status: 'Active', 
    signedByCount: 5,
    expirationDate: null,
    relatedTemplates: [
      'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''
    ]
  },
  
  // Archived versions
  { 
    id: 7, 
    name: 'GMP Basic Training', 
    category: 'Quality', 
    currentRev: '3.1', 
    lastUpdated: '2024-12-15', 
    status: 'Archived', 
    signedByCount: 3,
    expirationDate: '2025-09-01',
    relatedTemplates: [
      'DO1679: Adult Capnoxygen Mask',
      'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"',
      'DO1528: Baxter recon'
    ]
  },
  { 
    id: 8, 
    name: 'Equipment Cleaning SOP', 
    category: 'Operations', 
    currentRev: '2.0', 
    lastUpdated: '2024-11-10', 
    status: 'Archived', 
    signedByCount: 2,
    expirationDate: '2025-08-15',
    relatedTemplates: [
      'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'
    ]
  },
  { 
    id: 9, 
    name: 'Safety Protocol', 
    category: 'Safety', 
    currentRev: '3.5', 
    lastUpdated: '2024-10-01', 
    status: 'Archived', 
    signedByCount: 4,
    expirationDate: '2025-07-20',
    relatedTemplates: [
      'DO1679: Adult Capnoxygen Mask',
      'DO1528: Baxter recon'
    ]
  },
  { 
    id: 10, 
    name: 'Cleanroom Procedures', 
    category: 'Operations', 
    currentRev: '2.0', 
    lastUpdated: '2024-08-15', 
    status: 'Archived', 
    signedByCount: 2,
    expirationDate: '2025-06-20',
    relatedTemplates: [
      'DO1679: Adult Capnoxygen Mask'
    ]
  },
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

// Employee signature records for training documents
export const employeeSignatures = {
  1: [ // GMP Basic Training Rev 3.2
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2025-09-05', verifiedDate: '2025-09-06', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2025-09-06', verifiedDate: '2025-09-07', verifiedBy: 'Jane Doe' },
    { id: 3, employeeName: 'Carol Martinez', signedDate: '2025-09-07', verifiedDate: '2025-09-08', verifiedBy: 'John Smith' },
    { id: 4, employeeName: 'David Chen', signedDate: '2025-09-08', verifiedDate: '2025-09-09', verifiedBy: 'Jane Doe' },
    { id: 5, employeeName: 'Emily Rodriguez', signedDate: '2025-09-10', verifiedDate: '2025-09-11', verifiedBy: 'John Smith' },
    { id: 6, employeeName: 'Frank Thompson', signedDate: '2025-09-12', verifiedDate: '2025-09-13', verifiedBy: 'Jane Doe' },
    { id: 7, employeeName: 'Grace Lee', signedDate: '2025-09-14', verifiedDate: '2025-09-15', verifiedBy: 'John Smith' },
    { id: 8, employeeName: 'Henry Park', signedDate: '2025-09-16', verifiedDate: '2025-09-17', verifiedBy: 'Jane Doe' },
  ],
  2: [ // Equipment Cleaning SOP Rev 2.1
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2025-08-20', verifiedDate: '2025-08-21', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2025-08-22', verifiedDate: '2025-08-23', verifiedBy: 'Jane Doe' },
    { id: 3, employeeName: 'Carol Martinez', signedDate: '2025-08-24', verifiedDate: '2025-08-25', verifiedBy: 'John Smith' },
    { id: 4, employeeName: 'David Chen', signedDate: '2025-08-26', verifiedDate: '2025-08-27', verifiedBy: 'Jane Doe' },
    { id: 5, employeeName: 'Emily Rodriguez', signedDate: '2025-08-28', verifiedDate: '2025-08-29', verifiedBy: 'John Smith' },
  ],
  3: [ // Safety Protocol Rev 4.0
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2025-07-22', verifiedDate: '2025-07-23', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2025-07-24', verifiedDate: '2025-07-25', verifiedBy: 'Jane Doe' },
    { id: 3, employeeName: 'Carol Martinez', signedDate: '2025-07-26', verifiedDate: '2025-07-27', verifiedBy: 'John Smith' },
    { id: 4, employeeName: 'David Chen', signedDate: '2025-07-28', verifiedDate: '2025-07-29', verifiedBy: 'Jane Doe' },
    { id: 5, employeeName: 'Emily Rodriguez', signedDate: '2025-07-30', verifiedDate: '2025-07-31', verifiedBy: 'John Smith' },
    { id: 6, employeeName: 'Frank Thompson', signedDate: '2025-08-01', verifiedDate: '2025-08-02', verifiedBy: 'Jane Doe' },
  ],
  4: [ // Cleanroom Procedures Rev 2.5
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2025-06-22', verifiedDate: '2025-06-23', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2025-06-24', verifiedDate: '2025-06-25', verifiedBy: 'Jane Doe' },
    { id: 3, employeeName: 'Carol Martinez', signedDate: '2025-06-26', verifiedDate: '2025-06-27', verifiedBy: 'John Smith' },
    { id: 4, employeeName: 'David Chen', signedDate: '2025-06-28', verifiedDate: '2025-06-29', verifiedBy: 'Jane Doe' },
  ],
  5: [ // Quality Control Basics Rev 1.5
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2025-08-16', verifiedDate: '2025-08-17', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2025-08-18', verifiedDate: '2025-08-19', verifiedBy: 'Jane Doe' },
    { id: 3, employeeName: 'Carol Martinez', signedDate: '2025-08-20', verifiedDate: '2025-08-21', verifiedBy: 'John Smith' },
  ],
  6: [ // Documentation Standards Rev 1.2
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2025-06-06', verifiedDate: '2025-06-07', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2025-06-08', verifiedDate: '2025-06-09', verifiedBy: 'Jane Doe' },
    { id: 3, employeeName: 'Carol Martinez', signedDate: '2025-06-10', verifiedDate: '2025-06-11', verifiedBy: 'John Smith' },
    { id: 4, employeeName: 'David Chen', signedDate: '2025-06-12', verifiedDate: '2025-06-13', verifiedBy: 'Jane Doe' },
    { id: 5, employeeName: 'Emily Rodriguez', signedDate: '2025-06-14', verifiedDate: '2025-06-15', verifiedBy: 'John Smith' },
  ],
  7: [ // GMP Basic Training Rev 3.1 (Archived)
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2024-12-20', verifiedDate: '2024-12-21', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2024-12-22', verifiedDate: '2024-12-23', verifiedBy: 'Jane Doe' },
    { id: 3, employeeName: 'Carol Martinez', signedDate: '2024-12-24', verifiedDate: '2024-12-25', verifiedBy: 'John Smith' },
  ],
  8: [ // Equipment Cleaning SOP Rev 2.0 (Archived)
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2024-11-15', verifiedDate: '2024-11-16', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2024-11-17', verifiedDate: '2024-11-18', verifiedBy: 'Jane Doe' },
  ],
  9: [ // Safety Protocol Rev 3.5 (Archived)
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2024-10-05', verifiedDate: '2024-10-06', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2024-10-07', verifiedDate: '2024-10-08', verifiedBy: 'Jane Doe' },
    { id: 3, employeeName: 'Carol Martinez', signedDate: '2024-10-09', verifiedDate: '2024-10-10', verifiedBy: 'John Smith' },
    { id: 4, employeeName: 'David Chen', signedDate: '2024-10-11', verifiedDate: '2024-10-12', verifiedBy: 'Jane Doe' },
  ],
  10: [ // Cleanroom Procedures Rev 2.0 (Archived)
    { id: 1, employeeName: 'Alice Johnson', signedDate: '2024-08-20', verifiedDate: '2024-08-21', verifiedBy: 'John Smith' },
    { id: 2, employeeName: 'Bob Wilson', signedDate: '2024-08-22', verifiedDate: '2024-08-23', verifiedBy: 'Jane Doe' },
  ],
};
