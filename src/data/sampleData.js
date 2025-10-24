export const pendingTrainings = [
  { id: 2, docName: 'Equipment Cleaning SOP', revision: 'Rev 2.1', assignedDate: '2025-09-20', dueDate: '2025-10-20', status: 'in-progress' },
];

export const completedTrainings = [
  { id: 1, docName: 'GMP Basic Training', revision: 'Rev 3.2', completedDate: '2025-08-28', verifiedDate: '2025-08-29', verifiedBy: 'John Smith', verified: true },
  { id: 3, docName: 'Safety Protocol', revision: 'Rev 4.0', completedDate: '2025-09-01', verifiedDate: '2025-09-02', verifiedBy: 'John Smith', verified: true },
  { id: 4, docName: 'Quality Control Basics', revision: 'Rev 1.5', completedDate: '2025-08-15', verifiedDate: '2025-08-17', verifiedBy: 'Jane Doe', verified: true },
  { id: 5, docName: 'Cleanroom Procedures', revision: 'Rev 2.5', completedDate: '2025-06-20', verifiedDate: '2025-06-21', verifiedBy: 'Jane Doe', verified: true },
  { id: 6, docName: 'Documentation Standards', revision: 'Rev 1.2', completedDate: '2025-06-05', verifiedDate: '2025-06-06', verifiedBy: 'John Smith', verified: true },
  { id: 7, docName: 'Environmental Monitoring', revision: 'Rev 3.0', completedDate: '2025-05-15', verifiedDate: '2025-05-16', verifiedBy: 'Jane Doe', verified: true },
  { id: 8, docName: 'Batch Record Review', revision: 'Rev 2.0', completedDate: '2025-09-28', verifiedDate: null, verifiedBy: null, verified: false },
];

export const qualifiedTemplates = [
  'DO1679: Adult Capnoxygen Mask',
  'DO1528: Baxter recon',
  'DO1674: OxyMask II Kid 7\''
  // Employee HAS completed and verified:
  // ✓ GMP Basic Training (Rev 3.2)
  // ✓ Safety Protocol (Rev 4.0)
  // ✓ Quality Control Basics (Rev 1.5)
  // ✓ Cleanroom Procedures (Rev 2.5)
  // ✓ Documentation Standards (Rev 1.2)
  
  // Employee is NOT qualified for (missing Equipment Cleaning SOP):
  // ❌ DO1007: Oxy II EtCO2 Adult Subassembly SLF 8" (needs: GMP✓, Safety✓, Equipment Cleaning❌)
  // ❌ DO1862: OxyMask II Adult EtCO2 14", SLM 15' (needs: GMP✓, Safety✓, Equipment Cleaning❌, Documentation✓)
];

export const trainingDocs = [
  // Active versions
  {
    id: 1,
    name: 'GMP Basic Training',
    category: 'Quality',
    currentRev: '3.2',
    lastUpdated: '2025-09-01',
    effectiveDate: '2025-09-01',
    status: 'Active',
    signedByCount: 8,
    expirationDate: null,
    uniPointUrl: 'https://unipoint.example.com/docs/gmp-training-3.2',
    relatedTemplates: [
      'DO1679: Adult Capnoxygen Mask',
      'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"',
      'DO1528: Baxter recon',
      'DO1674: OxyMask II Kid 7\'',
      'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''
    ],
    description: 'Comprehensive GMP training covering basic manufacturing practices',
    author: 'Quality Department',
    nasLocation: '\\\\SM-NAS\\Training\\QA\\GMP-Basic-Training-Rev-3.2.pdf'
  },
  {
    id: 2,
    name: 'Equipment Cleaning SOP',
    category: 'Operations',
    currentRev: '2.1',
    lastUpdated: '2025-08-15',
    effectiveDate: '2025-08-15',
    status: 'Active',
    signedByCount: 5,
    expirationDate: null,
    uniPointUrl: 'https://unipoint.example.com/docs/equipment-cleaning-sop-2.1',
    relatedTemplates: [
      'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"',
      'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''
    ],
    description: 'Standard operating procedure for equipment cleaning and maintenance',
    author: 'Operations Team',
    nasLocation: '\\\\SM-NAS\\Training\\Operations\\Equipment-Cleaning-SOP-Rev-2.1.pdf'
  },
  {
    id: 3,
    name: 'Safety Protocol',
    category: 'Safety',
    currentRev: '4.0',
    lastUpdated: '2025-07-20',
    effectiveDate: '2025-07-20',
    status: 'Active',
    signedByCount: 6,
    expirationDate: null,
    uniPointUrl: 'https://unipoint.example.com/docs/safety-protocol-4.0',
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
    effectiveDate: '2025-06-20',
    status: 'Active',
    signedByCount: 4,
    expirationDate: null,
    uniPointUrl: 'https://unipoint.example.com/docs/cleanroom-procedures-2.5',
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
    effectiveDate: '2025-08-15',
    status: 'Active',
    signedByCount: 3,
    expirationDate: null,
    uniPointUrl: 'https://unipoint.example.com/docs/quality-control-basics-1.5',
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
    effectiveDate: '2025-06-05',
    status: 'Active',
    signedByCount: 5,
    expirationDate: null,
    uniPointUrl: 'https://unipoint.example.com/docs/documentation-standards-1.2',
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
  { id: 1, employeeId: 'EMP001', name: 'Alice Johnson', role: 'Production Operator', trainings: 12, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"', 'DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\''] },
  { id: 2, employeeId: 'EMP002', name: 'Bob Wilson', role: 'Production Operator', trainings: 10, pending: 1, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon'] },
  { id: 3, employeeId: 'EMP003', name: 'Carol Martinez', role: 'Production Supervisor', trainings: 15, pending: 0, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"', 'DO1528: Baxter recon'] },
  { id: 4, employeeId: 'EMP004', name: 'David Chen', role: 'Quality Control', trainings: 14, pending: 1, qualified: ['DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1679: Adult Capnoxygen Mask'] },
  { id: 5, employeeId: 'EMP005', name: 'Emily Rodriguez', role: 'Production Operator', trainings: 11, pending: 2, qualified: ['DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
  { id: 6, employeeId: 'EMP006', name: 'Frank Thompson', role: 'Production Operator', trainings: 9, pending: 3, qualified: ['DO1679: Adult Capnoxygen Mask'] },
  { id: 7, employeeId: 'EMP007', name: 'Grace Lee', role: 'Quality Control', trainings: 13, pending: 1, qualified: ['DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1679: Adult Capnoxygen Mask'] },
  { id: 8, employeeId: 'EMP008', name: 'Henry Park', role: 'Production Operator', trainings: 10, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 9, employeeId: 'EMP009', name: 'Isabella Martinez', role: 'Production Technician', trainings: 8, pending: 1, qualified: ['DO1528: Baxter recon', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
  { id: 10, employeeId: 'EMP010', name: 'James Brown', role: 'Production Operator', trainings: 11, pending: 0, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1674: OxyMask II Kid 7\'', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 11, employeeId: 'EMP011', name: 'Karen White', role: 'Quality Assurance', trainings: 16, pending: 1, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 12, employeeId: 'EMP012', name: 'Lucas Garcia', role: 'Production Operator', trainings: 7, pending: 4, qualified: ['DO1679: Adult Capnoxygen Mask'] },
  { id: 13, employeeId: 'EMP013', name: 'Maria Santos', role: 'Production Technician', trainings: 12, pending: 2, qualified: ['DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
  { id: 14, employeeId: 'EMP014', name: 'Nathan Kim', role: 'Production Operator', trainings: 9, pending: 1, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 15, employeeId: 'EMP015', name: 'Olivia Taylor', role: 'Production Supervisor', trainings: 18, pending: 0, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 16, employeeId: 'EMP016', name: 'Patrick O\'Brien', role: 'Production Operator', trainings: 10, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon'] },
  { id: 17, employeeId: 'EMP017', name: 'Quinn Davis', role: 'Quality Control', trainings: 14, pending: 1, qualified: ['DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
  { id: 18, employeeId: 'EMP018', name: 'Rachel Green', role: 'Production Technician', trainings: 11, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"', 'DO1674: OxyMask II Kid 7\''] },
  { id: 19, employeeId: 'EMP019', name: 'Samuel Jackson', role: 'Production Operator', trainings: 8, pending: 3, qualified: ['DO1679: Adult Capnoxygen Mask'] },
  { id: 20, employeeId: 'EMP020', name: 'Teresa Nguyen', role: 'Production Operator', trainings: 13, pending: 1, qualified: ['DO1528: Baxter recon', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 21, employeeId: 'EMP021', name: 'Uma Patel', role: 'Quality Assurance', trainings: 15, pending: 0, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
  { id: 22, employeeId: 'EMP022', name: 'Victor Lopez', role: 'Production Operator', trainings: 9, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 23, employeeId: 'EMP023', name: 'Wendy Chang', role: 'Production Technician', trainings: 12, pending: 1, qualified: ['DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
  { id: 24, employeeId: 'EMP024', name: 'Xavier Moore', role: 'Production Operator', trainings: 7, pending: 3, qualified: ['DO1679: Adult Capnoxygen Mask'] },
  { id: 25, employeeId: 'EMP025', name: 'Yolanda Rivera', role: 'Production Supervisor', trainings: 17, pending: 0, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 26, employeeId: 'EMP026', name: 'Zachary Anderson', role: 'Production Operator', trainings: 10, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 27, employeeId: 'EMP027', name: 'Amanda Foster', role: 'Quality Control', trainings: 14, pending: 1, qualified: ['DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
  { id: 28, employeeId: 'EMP028', name: 'Brian Cooper', role: 'Production Operator', trainings: 8, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon'] },
  { id: 29, employeeId: 'EMP029', name: 'Christine Bell', role: 'Production Technician', trainings: 11, pending: 1, qualified: ['DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1674: OxyMask II Kid 7\''] },
  { id: 30, employeeId: 'EMP030', name: 'Daniel Hayes', role: 'Production Operator', trainings: 9, pending: 3, qualified: ['DO1679: Adult Capnoxygen Mask'] },
  { id: 31, employeeId: 'EMP031', name: 'Elena Flores', role: 'Quality Assurance', trainings: 16, pending: 0, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
  { id: 32, employeeId: 'EMP032', name: 'Felix Turner', role: 'Production Operator', trainings: 10, pending: 1, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"', 'DO1528: Baxter recon'] },
  { id: 33, employeeId: 'EMP033', name: 'Gabriela Diaz', role: 'Production Technician', trainings: 12, pending: 2, qualified: ['DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\''] },
  { id: 34, employeeId: 'EMP034', name: 'Hassan Ali', role: 'Production Operator', trainings: 8, pending: 2, qualified: ['DO1679: Adult Capnoxygen Mask'] },
  { id: 35, employeeId: 'EMP035', name: 'Iris Chen', role: 'Production Supervisor', trainings: 18, pending: 0, qualified: ['DO1679: Adult Capnoxygen Mask', 'DO1528: Baxter recon', 'DO1674: OxyMask II Kid 7\'', 'DO1862: OxyMask II Adult EtCO2 14", SLM 15\'', 'DO1007: Oxy II EtCO2 Adult Subassembly SLF 8"'] },
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

// Employee training completion status (for gap analysis)
// Maps employeeId -> array of completed training document IDs
export const employeeTrainingCompletions = {
  'EMP001': [4, 5], // Alice: Cleanroom Procedures, Quality Control Basics
  'EMP002': [1, 3, 4], // Bob: GMP Basic, Safety Protocol, Cleanroom
  'EMP003': [], // Carol: None completed (for demo purposes)
  'EMP004': [2, 6], // David: Equipment Cleaning, Documentation Standards
  'EMP005': [1, 3], // Emily: GMP Basic, Safety Protocol
  'EMP006': [1], // Frank: GMP Basic only
  'EMP007': [], // Grace: None
  'EMP008': [3, 4], // Henry: Safety Protocol, Cleanroom
  'EMP009': [1, 2], // Isabella: GMP Basic, Equipment Cleaning
  'EMP010': [1, 3, 6], // James: GMP Basic, Safety Protocol, Documentation
  'EMP011': [], // Karen: None
  'EMP012': [], // Lucas: None (good for demo)
  'EMP013': [1, 6], // Maria: GMP Basic, Documentation
  'EMP014': [2, 3], // Nathan: Equipment Cleaning, Safety Protocol
  'EMP015': [], // Olivia: None
  'EMP016': [1, 2, 3], // Patrick: GMP Basic, Equipment Cleaning, Safety Protocol
  'EMP017': [4, 5], // Quinn: Cleanroom, Quality Control
  'EMP018': [1, 3, 4], // Rachel: GMP Basic, Safety Protocol, Cleanroom
  'EMP019': [], // Samuel: None (good for demo)
  'EMP020': [2, 6], // Teresa: Equipment Cleaning, Documentation
};

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

// Training assignment records with detailed status tracking
// Organized by employee for easier lookup
export const employeeTrainingAssignments = {
  'EMP001': [ // Alice Johnson
    {
      documentId: 1,
      documentName: 'GMP Basic Training',
      revision: '3.2',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-01',
      employeeSignature: { initials: 'AJ', dateTime: '2025-09-05 14:30' },
      supervisorVerification: { initials: 'JS', dateTime: '2025-09-06 09:15' },
      status: 'completed'
    },
    {
      documentId: 2,
      documentName: 'Equipment Cleaning SOP',
      revision: '2.1',
      documentStatus: 'Active',
      templateNo: 'DO1007',
      assignedDate: '2025-09-20',
      employeeSignature: { initials: 'AJ', dateTime: '2025-09-24 10:20' },
      supervisorVerification: null,
      status: 'awaiting_verification'
    },
    {
      documentId: 3,
      documentName: 'Safety Protocol',
      revision: '4.0',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-10-01',
      employeeSignature: null,
      supervisorVerification: null,
      status: 'pending'
    }
  ],
  'EMP002': [ // Bob Wilson
    {
      documentId: 1,
      documentName: 'GMP Basic Training',
      revision: '3.2',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-02',
      employeeSignature: { initials: 'BW', dateTime: '2025-09-06 15:45' },
      supervisorVerification: { initials: 'JD', dateTime: '2025-09-07 11:30' },
      status: 'completed'
    },
    {
      documentId: 4,
      documentName: 'Cleanroom Procedures',
      revision: '2.5',
      documentStatus: 'Active',
      templateNo: 'DO1674',
      assignedDate: '2025-09-25',
      employeeSignature: null,
      supervisorVerification: null,
      status: 'pending'
    }
  ],
  'EMP003': [ // Carol Martinez
    {
      documentId: 1,
      documentName: 'GMP Basic Training',
      revision: '3.2',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-03',
      employeeSignature: { initials: 'CM', dateTime: '2025-09-07 13:20' },
      supervisorVerification: { initials: 'JS', dateTime: '2025-09-08 10:45' },
      status: 'completed'
    },
    {
      documentId: 3,
      documentName: 'Safety Protocol',
      revision: '4.0',
      documentStatus: 'Active',
      templateNo: 'DO1007',
      assignedDate: '2025-09-10',
      employeeSignature: { initials: 'CM', dateTime: '2025-09-26 16:00' },
      supervisorVerification: { initials: 'JD', dateTime: '2025-09-27 09:30' },
      status: 'completed'
    },
    {
      documentId: 6,
      documentName: 'Documentation Standards',
      revision: '1.2',
      documentStatus: 'Active',
      templateNo: 'DO1862',
      assignedDate: '2025-09-15',
      employeeSignature: { initials: 'CM', dateTime: '2025-09-20 14:15' },
      supervisorVerification: null,
      status: 'awaiting_verification'
    }
  ],
  'EMP004': [ // David Chen
    {
      documentId: 2,
      documentName: 'Equipment Cleaning SOP',
      revision: '2.1',
      documentStatus: 'Active',
      templateNo: 'DO1007',
      assignedDate: '2025-08-20',
      employeeSignature: { initials: 'DC', dateTime: '2025-08-26 11:45' },
      supervisorVerification: { initials: 'JD', dateTime: '2025-08-27 08:20' },
      status: 'completed'
    },
    {
      documentId: 5,
      documentName: 'Quality Control Basics',
      revision: '1.5',
      documentStatus: 'Active',
      templateNo: 'DO1528',
      assignedDate: '2025-09-05',
      employeeSignature: null,
      supervisorVerification: null,
      status: 'pending'
    }
  ],
  'EMP005': [ // Emily Rodriguez
    {
      documentId: 1,
      documentName: 'GMP Basic Training',
      revision: '3.2',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-05',
      employeeSignature: { initials: 'ER', dateTime: '2025-09-10 09:30' },
      supervisorVerification: { initials: 'JS', dateTime: '2025-09-11 14:50' },
      status: 'completed'
    },
    {
      documentId: 3,
      documentName: 'Safety Protocol',
      revision: '4.0',
      documentStatus: 'Active',
      templateNo: 'DO1007',
      assignedDate: '2025-09-12',
      employeeSignature: { initials: 'ER', dateTime: '2025-09-30 10:15' },
      supervisorVerification: { initials: 'JS', dateTime: '2025-09-31 08:40' },
      status: 'completed'
    },
    {
      documentId: 2,
      documentName: 'Equipment Cleaning SOP',
      revision: '2.1',
      documentStatus: 'Active',
      templateNo: 'DO1007',
      assignedDate: '2025-10-01',
      employeeSignature: null,
      supervisorVerification: null,
      status: 'pending'
    },
    {
      documentId: 6,
      documentName: 'Documentation Standards',
      revision: '1.2',
      documentStatus: 'Active',
      templateNo: 'DO1862',
      assignedDate: '2025-10-05',
      employeeSignature: null,
      supervisorVerification: null,
      status: 'pending'
    }
  ],
  'EMP006': [ // Frank Thompson
    {
      documentId: 1,
      documentName: 'GMP Basic Training',
      revision: '3.2',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-08',
      employeeSignature: { initials: 'FT', dateTime: '2025-09-12 15:20' },
      supervisorVerification: { initials: 'JD', dateTime: '2025-09-13 10:10' },
      status: 'completed'
    },
    {
      documentId: 4,
      documentName: 'Cleanroom Procedures',
      revision: '2.5',
      documentStatus: 'Active',
      templateNo: 'DO1674',
      assignedDate: '2025-09-20',
      employeeSignature: { initials: 'FT', dateTime: '2025-09-28 13:45' },
      supervisorVerification: null,
      status: 'awaiting_verification'
    },
    {
      documentId: 3,
      documentName: 'Safety Protocol',
      revision: '4.0',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-10-02',
      employeeSignature: null,
      supervisorVerification: null,
      status: 'pending'
    }
  ],
  'EMP007': [ // Grace Lee
    {
      documentId: 5,
      documentName: 'Quality Control Basics',
      revision: '1.5',
      documentStatus: 'Active',
      templateNo: 'DO1528',
      assignedDate: '2025-08-25',
      employeeSignature: { initials: 'GL', dateTime: '2025-09-02 11:00' },
      supervisorVerification: { initials: 'JS', dateTime: '2025-09-03 09:25' },
      status: 'completed'
    },
    {
      documentId: 1,
      documentName: 'GMP Basic Training',
      revision: '3.2',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-10',
      employeeSignature: null,
      supervisorVerification: null,
      status: 'pending'
    }
  ],
  'EMP008': [ // Henry Park
    {
      documentId: 3,
      documentName: 'Safety Protocol',
      revision: '4.0',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-01',
      employeeSignature: { initials: 'HP', dateTime: '2025-09-16 12:30' },
      supervisorVerification: { initials: 'JD', dateTime: '2025-09-17 15:45' },
      status: 'completed'
    },
    {
      documentId: 4,
      documentName: 'Cleanroom Procedures',
      revision: '2.5',
      documentStatus: 'Active',
      templateNo: 'DO1674',
      assignedDate: '2025-09-18',
      employeeSignature: { initials: 'HP', dateTime: '2025-09-25 10:50' },
      supervisorVerification: null,
      status: 'awaiting_verification'
    },
    {
      documentId: 2,
      documentName: 'Equipment Cleaning SOP',
      revision: '2.1',
      documentStatus: 'Active',
      templateNo: 'DO1007',
      assignedDate: '2025-10-01',
      employeeSignature: null,
      supervisorVerification: null,
      status: 'pending'
    }
  ],
  'EMP009': [ // Isabella Martinez
    {
      documentId: 1,
      documentName: 'GMP Basic Training',
      revision: '3.2',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-08-28',
      employeeSignature: { initials: 'IM', dateTime: '2025-09-05 14:20' },
      supervisorVerification: { initials: 'JS', dateTime: '2025-09-06 11:35' },
      status: 'completed'
    },
    {
      documentId: 7,
      documentName: 'GMP Basic Training',
      revision: '3.1',
      documentStatus: 'Archived',
      templateNo: 'DO1679',
      assignedDate: '2024-12-10',
      employeeSignature: { initials: 'IM', dateTime: '2024-12-15 09:30' },
      supervisorVerification: { initials: 'JD', dateTime: '2024-12-16 13:20' },
      status: 'completed'
    }
  ],
  'EMP010': [ // James Brown
    {
      documentId: 1,
      documentName: 'GMP Basic Training',
      revision: '3.2',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-01',
      employeeSignature: { initials: 'JB', dateTime: '2025-09-08 16:45' },
      supervisorVerification: { initials: 'JD', dateTime: '2025-09-09 10:20' },
      status: 'completed'
    },
    {
      documentId: 3,
      documentName: 'Safety Protocol',
      revision: '4.0',
      documentStatus: 'Active',
      templateNo: 'DO1679',
      assignedDate: '2025-09-10',
      employeeSignature: { initials: 'JB', dateTime: '2025-09-18 11:30' },
      supervisorVerification: { initials: 'JS', dateTime: '2025-09-19 14:15' },
      status: 'completed'
    },
    {
      documentId: 6,
      documentName: 'Documentation Standards',
      revision: '1.2',
      documentStatus: 'Active',
      templateNo: 'DO1862',
      assignedDate: '2025-09-22',
      employeeSignature: { initials: 'JB', dateTime: '2025-09-28 09:50' },
      supervisorVerification: { initials: 'JD', dateTime: '2025-09-29 13:40' },
      status: 'completed'
    }
  ]
};
