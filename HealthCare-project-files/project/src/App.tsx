import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PatientChat from './components/PatientChat';
import DiseasePrediction from './components/DiseasePrediction';
import TreatmentPlans from './components/TreatmentPlans';
import HealthAnalytics from './components/HealthAnalytics';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <PatientChat />;
      case 'prediction':
        return <DiseasePrediction />;
      case 'treatment':
        return <TreatmentPlans />;
      case 'analytics':
        return <HealthAnalytics />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;