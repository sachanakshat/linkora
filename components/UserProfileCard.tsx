'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SocialLink {
  link: string;
  count: number;
}

interface User {
  userId: string;
  username: string;
  socials: {
    linkedin?: SocialLink[];
    twitter?: SocialLink[];
    email?: SocialLink[];
    phone?: SocialLink[];
    moreLinks?: SocialLink[];
    facebook?: SocialLink[];
  };
  feedbacks: string[];
}

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const [showSocials, setShowSocials] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const router = useRouter();

  // Function to extract initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Header with initials and name */}
      <div className="flex items-center p-4 bg-gray-100">
        <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {getInitials(user.username)}
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-gray-600">@{user.userId}</p>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="p-4 border-b border-gray-200">
        <button
          className="flex items-center justify-between w-full text-blue-500"
          onClick={() => setShowSocials(!showSocials)}
        >
          <span className="font-semibold">Social Links</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              showSocials ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showSocials && (
          <div className="mt-2 space-y-2">
            {Object.entries(user.socials).map(([platform, links]) => (
              <div key={platform}>
                <h3 className="text-sm font-medium text-gray-600 capitalize">{platform}</h3>
                <ul className="ml-4 list-disc list-inside">
                  {links &&
                    links.map((linkObj, idx) => (
                      <li key={idx}>
                        <a
                          href={`https://${linkObj.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600"
                        >
                          {linkObj.link}
                        </a>
                        <span className="text-gray-500 text-xs ml-2">(count: {linkObj.count})</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="p-4 border-b border-gray-200">
        <button
          className="flex items-center justify-between w-full text-blue-500"
          onClick={() => setShowReviews(!showReviews)}
        >
          <span className="font-semibold">Reviews</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              showReviews ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showReviews && (
          <div className="mt-2 space-y-2">
            {user.feedbacks.map((feedback, idx) => (
              <p key={idx} className="text-sm text-gray-700">
                - {feedback}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Review Button */}
      <div className="p-4">
        <button
          onClick={() => router.push('/giveFeedback')}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Give Review
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
