import React, { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  selected: boolean;
}

interface PredictionResult {
  condition: string;
  probability: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
}

const DiseasePrediction: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: '1', name: 'Headache', selected: false },
    { id: '2', name: 'Fever', selected: false },
    { id: '3', name: 'Fatigue', selected: false },
    { id: '4', name: 'Cough', selected: false },
    { id: '5', name: 'Nausea', selected: false },
    { id: '6', name: 'Muscle aches', selected: false },
    { id: '7', name: 'Sore throat', selected: false },
    { id: '8', name: 'Shortness of breath', selected: false },
  ]);

  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSymptomToggle = (symptomId: string) => {
    setSymptoms(prev => 
      prev.map(symptom => 
        symptom.id === symptomId 
          ? { ...symptom, selected: !symptom.selected }
          : symptom
      )
    );
  };

  const analyzeSymptomsWithAI = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const selectedSymptoms = symptoms.filter(s => s.selected);
      const mockPredictions: PredictionResult[] = [
        {
          condition: 'Common Cold',
          probability: 75,
          description: 'A viral infection affecting the upper respiratory system.',
          severity: 'low',
          recommendations: [
            'Get plenty of rest',
            'Stay hydrated',
            'Use over-the-counter medications for symptom relief',
            'Avoid contact with others to prevent spread'
          ]
        },
        {
          condition: 'Viral Flu',
          probability: 60,
          description: 'Influenza is a viral infection that attacks the respiratory system.',
          severity: 'medium',
          recommendations: [
            'Rest and stay home',
            'Drink plenty of fluids',
            'Consider antiviral medication if caught early',
            'Monitor symptoms for complications'
          ]
        },
        {
          condition: 'Stress-related symptoms',
          probability: 45,
          description: 'Physical symptoms that may be related to stress or anxiety.',
          severity: 'low',
          recommendations: [
            'Practice stress management techniques',
            'Ensure adequate sleep',
            'Consider speaking with a healthcare provider',
            'Engage in relaxation activities'
          ]
        }
      ];

      setPredictions(mockPredictions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Disease Prediction</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Select your symptoms below, and our AI will analyze them to provide potential condition predictions.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Select your symptoms:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => handleSymptomToggle(symptom.id)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    symptom.selected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {symptom.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Additional Information (Optional):</h3>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Describe any additional symptoms, duration, or relevant medical history..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <button
            onClick={analyzeSymptomsWithAI}
            disabled={symptoms.filter(s => s.selected).length === 0 || isAnalyzing}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 animate-spin" />
                <span>Analyzing symptoms...</span>
              </div>
            ) : (
              'Analyze Symptoms with AI'
            )}
          </button>
        </div>
      </div>

      {predictions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">AI Prediction Results</h3>
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{prediction.condition}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(prediction.severity)}`}>
                    {prediction.severity} severity
                  </span>
                  <span className="text-sm font-medium text-gray-600">{prediction.probability}% match</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${prediction.probability}%` }}
                ></div>
              </div>

              <p className="text-gray-700 mb-4">{prediction.description}</p>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Recommended Actions:</h5>
                <ul className="space-y-1">
                  {prediction.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h4 className="font-medium text-amber-900">Important Disclaimer</h4>
            </div>
            <p className="text-sm text-amber-800 mt-2">
              These predictions are for informational purposes only and should not replace professional medical advice. 
              Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseasePrediction;