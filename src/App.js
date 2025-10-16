import React, { useState } from 'react';
import { FileText, BookOpen, UsersRound, GraduationCap, Settings, Gauge } from 'lucide-react';
import EmployeeDashboard from './components/pages/EmployeeDashboard';
import TrainingDocumentsList from './components/pages/TrainingDocumentsList';
import TeamLeaderView from './components/pages/TeamLeaderView';
import TrainingSignOffModal from './components/pages/TrainingSignOffModal';
import AdminView from './components/pages/AdminView';
import GroupTrainingSession from './components/pages/GroupTrainingSession';

const TrainingModuleUI = () => {
  const [currentPage, setCurrentPage] = useState('employee-dashboard');
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Navigation function that can also pass data
  const navigateToSignOff = (trainingData) => {
    setSelectedTraining(trainingData);
    setCurrentPage('sign-off');
  };

  const navigateToPage = (pageName) => {
    setCurrentPage(pageName);
    if (pageName !== 'sign-off') {
      setSelectedTraining(null);
    }
  };

  // Navigation
  const pages = {
    'employee-dashboard': {
      title: 'Employee Dashboard',
      component: <EmployeeDashboard onNavigateToSignOff={navigateToSignOff} />,
      icon: <Gauge size={20} />
    },
    'documents': {
      title: 'Training Documents',
      component: <TrainingDocumentsList />,
      icon: <FileText size={20} />
    },
    'team-leader': {
      title: 'Team Management',
      component: <TeamLeaderView />,
      icon: <UsersRound size={20} />
    },
    'group-training': {
      title: 'Group Training Session',
      component: <GroupTrainingSession />,
      icon: <GraduationCap size={20} />
    },
    'sign-off': {
      title: 'Sign-off',
      component: <TrainingSignOffModal trainingData={selectedTraining} onClose={() => navigateToPage('employee-dashboard')} />,
      icon: <BookOpen size={20} />
    },
    'admin': {
      title: 'Administration',
      component: <AdminView />,
      icon: <Settings size={20} />
    },
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Training Module</h2>
          <p className="text-xs text-gray-500 mt-1">Batch Record System</p>
        </div>
        <nav className="p-4">
          <div className="space-y-1">
            <button
              onClick={() => navigateToPage('employee-dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'employee-dashboard'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Gauge size={20} />
              <span>My Dashboard</span>
            </button>
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase">Management</p>
            </div>
            
            <button
              onClick={() => navigateToPage('documents')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'documents'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText size={20} />
              <span>Documents</span>
            </button>
            <button
              onClick={() => navigateToPage('team-leader')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'team-leader'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <UsersRound size={20} />
              <span>Team Management</span>
            </button>
            <button
              onClick={() => navigateToPage('group-training')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'group-training'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <GraduationCap size={20} />
              <span>Group Training</span>
            </button>
            <button
              onClick={() => navigateToPage('admin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === 'admin'
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings size={20} />
              <span>Administration</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {pages[currentPage].component}
        </div>
      </div>
    </div>
  );
};

export default TrainingModuleUI;