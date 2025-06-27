import React from 'react';
import { Heart, Thermometer, Activity, Droplets, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const vitals = [
    { label: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-600', status: 'normal' },
    { label: 'Blood Pressure', value: '120/80', icon: Activity, color: 'text-blue-600', status: 'normal' },
    { label: 'Temperature', value: '98.6°F', icon: Thermometer, color: 'text-orange-600', status: 'normal' },
    { label: 'Blood Glucose', value: '95 mg/dL', icon: Droplets, color: 'text-purple-600', status: 'normal' },
  ];

  const recentActivities = [
    { time: '2 hours ago', activity: 'Symptom check completed', type: 'prediction' },
    { time: '1 day ago', activity: 'Treatment plan updated', type: 'treatment' },
    { time: '3 days ago', activity: 'Health chat session', type: 'chat' },
    { time: '1 week ago', activity: 'Vital signs recorded', type: 'analytics' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, John</h2>
        <p className="text-blue-100">Your health dashboard is ready. How can I assist you today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vitals.map((vital, index) => {
          const Icon = vital.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${vital.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {vital.status}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{vital.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{vital.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Overall Health Score</p>
                  <p className="text-sm text-gray-600">Improved by 12% this month</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">85%</span>
            </div>
            <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Health trend chart visualization</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <h4 className="font-medium text-amber-900">Health Reminder</h4>
        </div>
        <p className="text-sm text-amber-800 mt-2">
          Your next health check-up is scheduled for next Tuesday. Don't forget to prepare your questions!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;