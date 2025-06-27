import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit2, Save, X } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1990-05-15',
    address: '123 Main St, Anytown, ST 12345',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    bloodType: 'O+',
    height: '5\'10"',
    weight: '175 lbs',
    allergies: 'Peanuts, Shellfish',
    medications: 'Lisinopril 10mg daily',
    medicalHistory: 'Hypertension (2018), Seasonal allergies'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const ProfileField = ({ label, value, field, icon: Icon, type = 'text' }: any) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </label>
      {isEditing ? (
        type === 'textarea' ? (
          <textarea
            value={editedProfile[field as keyof typeof editedProfile]}
            onChange={(e) => setEditedProfile({...editedProfile, [field]: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        ) : (
          <input
            type={type}
            value={editedProfile[field as keyof typeof editedProfile]}
            onChange={(e) => setEditedProfile({...editedProfile, [field]: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )
      ) : (
        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{value}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">Patient ID: #12345</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
            <ProfileField 
              label="Full Name" 
              value={profile.name} 
              field="name" 
              icon={User}
            />
            <ProfileField 
              label="Email Address" 
              value={profile.email} 
              field="email" 
              icon={Mail}
              type="email"
            />
            <ProfileField 
              label="Phone Number" 
              value={profile.phone} 
              field="phone" 
              icon={Phone}
              type="tel"
            />
            <ProfileField 
              label="Date of Birth" 
              value={profile.dateOfBirth} 
              field="dateOfBirth" 
              icon={Calendar}
              type="date"
            />
            <ProfileField 
              label="Address" 
              value={profile.address} 
              field="address" 
              icon={MapPin}
            />
            <ProfileField 
              label="Emergency Contact" 
              value={profile.emergencyContact} 
              field="emergencyContact" 
              icon={Phone}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Medical Information</h3>
            <ProfileField 
              label="Blood Type" 
              value={profile.bloodType} 
              field="bloodType" 
              icon={User}
            />
            <ProfileField 
              label="Height" 
              value={profile.height} 
              field="height" 
              icon={User}
            />
            <ProfileField 
              label="Weight" 
              value={profile.weight} 
              field="weight" 
              icon={User}
            />
            <ProfileField 
              label="Known Allergies" 
              value={profile.allergies} 
              field="allergies" 
              icon={User}
              type="textarea"
            />
            <ProfileField 
              label="Current Medications" 
              value={profile.medications} 
              field="medications" 
              icon={User}
              type="textarea"
            />
            <ProfileField 
              label="Medical History" 
              value={profile.medicalHistory} 
              field="medicalHistory" 
              icon={User}
              type="textarea"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive health reminders and updates</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">Enabled</span>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">SMS Alerts</h4>
              <p className="text-sm text-gray-600">Get urgent health notifications via text</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">Enabled</span>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Data Sharing</h4>
              <p className="text-sm text-gray-600">Share anonymized data for research</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm text-gray-700">Disabled</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <h4 className="font-medium text-gray-900">Change Password</h4>
            <p className="text-sm text-gray-600">Update your account password</p>
          </button>
          <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security</p>
          </button>
          <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <h4 className="font-medium text-gray-900">Download Data</h4>
            <p className="text-sm text-gray-600">Export your health data</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;