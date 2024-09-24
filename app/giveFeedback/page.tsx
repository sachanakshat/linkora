import React from 'react';
import CreateReview from '../../components/CreateReview';

const GiveFeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <CreateReview />
    </div>
  );
};

export default GiveFeedbackPage;
