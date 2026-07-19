import React from 'react';
import IPhoneMockup from '../components/IPhoneMockup';

const MockupPreview: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-3xl font-bold mb-8">iPhone Mockup Preview</h1>
      <IPhoneMockup
        imageSrc="/MonsterInteraction.png"
        alt="Monster Interaction App Screen"
      />
    </div>
  );
};

export default MockupPreview;
