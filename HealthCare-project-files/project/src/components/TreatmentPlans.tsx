import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

interface TreatmentPlan {
  id: string;
  condition: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  lifestyle: string[];
  followUp: string[];
  warnings: string[];
}

const TreatmentPlans: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    weight: '',
    allergies: '',
    currentMedications: '',
    medicalHistory: ''
  });
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const conditions = [
    'Common Cold',
    'Hypertension',
    'Type 2 Diabetes',
    'Anxiety',
    'Migraine',
    'Acid Reflux',
    'Seasonal Allergies'
  ];

  const generateTreatmentPlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const mockPlan: TreatmentPlan = {
        id: '1',
        condition: selectedCondition,
        medications: [
          {
            name: 'Acetaminophen',
            dosage: '500mg',
            frequency: 'Every 6 hours',
            duration: '3-5 days'
          },
          {
            name: 'Vitamin C',
            dosage: '1000mg',
            frequency: 'Once daily',
            duration: '7 days'
          }
        ],
        lifestyle: [
          'Get 7-9 hours of sleep nightly',
          'Drink 8-10 glasses of water daily',
          'Eat nutrient-rich foods with vitamin C',
          'Avoid smoking and limit alcohol',
          'Practice stress management techniques',
          'Maintain regular exercise (light activity)'
        ],
        followUp: [
          'Schedule follow-up appointment in 1 week',
          'Monitor symptoms daily',
          'Contact healthcare provider if symptoms worsen',
          'Complete blood work in 2 weeks if prescribed'
        ],
        warnings: [
          'Do not exceed recommended medication dosages',
          'Avoid alcohol while taking medications',
          'Contact emergency services if experiencing severe symptoms',
          'Stop medication and consult doctor if allergic reactions occur'
        ]
      };
      setTreatmentPlan(mockPlan);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Treatment Plans</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Generate personalized treatment recommendations based on your condition and medical profile.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Condition
            </label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a condition...</option>
              {conditions.map((condition) => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={patientInfo.age}
                onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (lbs)
              </label>
              <input
                type="number"
                value={patientInfo.weight}
                onChange={(e) => setPatientInfo({...patientInfo, weight: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter weight"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Known Allergies
            </label>
            <input
              type="text"
              value={patientInfo.allergies}
              onChange={(e) => setPatientInfo({...patientInfo, allergies: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="List any known allergies"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Medications
            </label>
            <textarea
              value={patientInfo.currentMedications}
              onChange={(e) => setPatientInfo({...patientInfo, currentMedications: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="List current medications and dosages"
            />
          </div>

          <button
            onClick={generateTreatmentPlan}
            disabled={!selectedCondition || isGenerating}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Generating treatment plan...</span>
              </div>
            ) : (
              'Generate Treatment Plan'
            )}
          </button>
        </div>
      </div>

      {treatmentPlan && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Treatment Plan: {treatmentPlan.condition}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Generated today</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span>Medications</span>
              </h4>
              <div className="space-y-3">
                {treatmentPlan.medications.map((med, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-900">{med.name}</h5>
                      <span className="text-sm text-blue-600 font-medium">{med.dosage}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {med.frequency} for {med.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span>Lifestyle Recommendations</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {treatmentPlan.lifestyle.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                <span>Follow-up Care</span>
              </h4>
              <div className="space-y-2">
                {treatmentPlan.followUp.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Calendar className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Important Warnings</span>
              </h4>
              <ul className="space-y-1">
                {treatmentPlan.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-red-800">• {warning}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Disclaimer:</strong> This treatment plan is generated based on general medical guidelines and should not replace professional medical advice. Always consult with your healthcare provider before starting any new treatment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentPlans;