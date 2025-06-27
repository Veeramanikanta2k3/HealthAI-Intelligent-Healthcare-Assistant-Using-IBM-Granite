import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Heart, Activity } from 'lucide-react';

const HealthAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('heartRate');
  const [timeRange, setTimeRange] = useState('7days');

  const metrics = [
    { id: 'heartRate', name: 'Heart Rate', icon: Heart, unit: 'bpm', color: 'text-red-600' },
    { id: 'bloodPressure', name: 'Blood Pressure', icon: Activity, unit: 'mmHg', color: 'text-blue-600' },
    { id: 'weight', name: 'Weight', icon: BarChart3, unit: 'lbs', color: 'text-green-600' },
    { id: 'glucose', name: 'Blood Glucose', icon: TrendingUp, unit: 'mg/dL', color: 'text-purple-600' },
  ];

  const timeRanges = [
    { id: '7days', name: '7 Days' },
    { id: '30days', name: '30 Days' },
    { id: '90days', name: '90 Days' },
    { id: '1year', name: '1 Year' },
  ];

  const mockData = {
    heartRate: [
      { date: '2024-01-15', value: 72, status: 'normal' },
      { date: '2024-01-16', value: 75, status: 'normal' },
      { date: '2024-01-17', value: 68, status: 'normal' },
      { date: '2024-01-18', value: 74, status: 'normal' },
      { date: '2024-01-19', value: 69, status: 'normal' },
      { date: '2024-01-20', value: 71, status: 'normal' },
      { date: '2024-01-21', value: 73, status: 'normal' },
    ],
    trends: {
      heartRate: { trend: 'stable', change: '+2%', status: 'good' },
      bloodPressure: { trend: 'improving', change: '-5%', status: 'excellent' },
      weight: { trend: 'stable', change: '0%', status: 'good' },
      glucose: { trend: 'improving', change: '-8%', status: 'excellent' },
    }
  };

  const insights = [
    {
      title: 'Heart Rate Variability',
      description: 'Your heart rate has been consistently within the normal range (60-100 bpm). Great cardiovascular health!',
      type: 'positive'
    },
    {
      title: 'Blood Pressure Improvement',
      description: 'Your blood pressure readings show a 5% improvement over the past month. Keep up the healthy lifestyle!',
      type: 'positive'
    },
    {
      title: 'Activity Recommendation',
      description: 'Consider increasing your physical activity to 150 minutes per week for optimal health benefits.',
      type: 'suggestion'
    }
  ];

  const currentMetric = metrics.find(m => m.id === selectedMetric);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Health Analytics</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Monitor your health metrics and track trends over time.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === metric.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{metric.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentMetric?.name} Trends
          </h3>
          <div className="flex space-x-1">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  timeRange === range.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Current Average:</span>
              <span className="text-2xl font-bold text-gray-900">
                72 {currentMetric?.unit}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">+2% from last week</span>
            </div>
          </div>
          
          <div className="h-48 bg-white rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive chart visualization</p>
              <p className="text-sm text-gray-400">Showing {currentMetric?.name} over {timeRanges.find(r => r.id === timeRange)?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const trend = mockData.trends[metric.id as keyof typeof mockData.trends];
          return (
            <div key={metric.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gray-50 ${metric.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1">
                  {trend.trend === 'improving' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : trend.trend === 'stable' ? (
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-xs font-medium text-gray-600">{trend.change}</span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-gray-600">{metric.name}</h4>
              <p className="text-lg font-bold text-gray-900">
                {metric.id === 'bloodPressure' ? '120/80' : '72'} {metric.unit}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                trend.status === 'excellent' ? 'bg-green-100 text-green-800' :
                trend.status === 'good' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {trend.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Health Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              insight.type === 'positive' ? 'bg-green-50 border-green-400' :
              insight.type === 'suggestion' ? 'bg-blue-50 border-blue-400' :
              'bg-yellow-50 border-yellow-400'
            }`}>
              <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
              <p className="text-sm text-gray-700">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Recordings</h3>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span>Schedule Recording</span>
          </button>
        </div>
        <div className="space-y-3">
          {mockData.heartRate.slice(-3).map((record, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Heart Rate</p>
                  <p className="text-xs text-gray-500">{record.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{record.value} bpm</p>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthAnalytics;