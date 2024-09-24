'use client'
import React, { useState } from 'react';

interface SocialLinks {
  linkedin: string;
  facebook: string;
  twitter: string;
  email: string;
  phone: string;
  moreLinks: string;
}

interface ReviewInput {
  username: string;
  socials: SocialLinks;
  feedback: string;
}

const CreateReview: React.FC = () => {
  const [formData, setFormData] = useState<ReviewInput>({
    username: '',
    socials: {
      linkedin: '',
      facebook: '',
      twitter: '',
      email: '',
      phone: '',
      moreLinks: '',
    },
    feedback: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name in formData.socials) {
      setFormData({
        ...formData,
        socials: {
          ...formData.socials,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const hasAtLeastOneSocial = () => {
    return Object.values(formData.socials).some((link) => link.trim() !== '');
  };

  const handleSubmit = async () => {
    if (!hasAtLeastOneSocial()) {
      alert('Please provide at least one social link.');
      return;
    }

    if (formData.feedback.trim() === '') {
      alert('Please provide feedback.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/createReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        // Optionally, clear the form after submission
        setFormData({
          username: '',
          socials: {
            linkedin: '',
            facebook: '',
            twitter: '',
            email: '',
            phone: '',
            moreLinks: '',
          },
          feedback: '',
        });
      } else {
        alert('Failed to submit the review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting the review.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Create Review</h2>

      {/* Username Input */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter the user's name"
          required
        />
      </div>

      {/* Social Links Input */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Social Links (at least one is required)</label>

        {['linkedin', 'facebook', 'twitter', 'email', 'phone', 'moreLinks'].map((social) => (
          <div className="mb-2" key={social}>
            <input
              type="text"
              name={social}
              value={formData.socials[social as keyof SocialLinks]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter ${social.charAt(0).toUpperCase() + social.slice(1)} URL`}
            />
          </div>
        ))}
      </div>

      {/* Feedback Input */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="feedback">
          Feedback
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your feedback"
          rows={4}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default CreateReview;
