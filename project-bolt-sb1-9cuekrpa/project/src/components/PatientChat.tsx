import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const PatientChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your HealthAI assistant. I'm here to help answer your health-related questions. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: generateAIResponse(inputMessage),
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);

      setInputMessage('');
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = {
      headache: "I understand you're experiencing headaches. Common causes include stress, dehydration, lack of sleep, or eye strain. For immediate relief, try resting in a dark room, applying a cold compress, and staying hydrated. If headaches persist, worsen, or are accompanied by fever, vision changes, or neck stiffness, please consult a healthcare professional immediately.",
      fever: "A fever can indicate your body is fighting an infection. For adults, a fever is generally considered 100.4°F (38°C) or higher. Stay hydrated, rest, and monitor your temperature. Seek medical attention if fever exceeds 103°F (39.4°C), persists for more than 3 days, or is accompanied by severe symptoms like difficulty breathing or persistent vomiting.",
      default: "Thank you for your question. While I can provide general health information, I always recommend consulting with a qualified healthcare professional for personalized medical advice. They can properly evaluate your symptoms and medical history to provide the most appropriate care."
    };

    const input = userInput.toLowerCase();
    if (input.includes('headache') || input.includes('head')) return responses.headache;
    if (input.includes('fever') || input.includes('temperature')) return responses.fever;
    return responses.default;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[600px] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Patient Chat</h2>
        <p className="text-sm text-gray-600">Ask me anything about your health concerns</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                {message.sender === 'ai' ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="text-xs opacity-75">
                  {message.sender === 'ai' ? 'HealthAI' : 'You'}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your health question..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This AI assistant provides general information only. Always consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};

export default PatientChat;