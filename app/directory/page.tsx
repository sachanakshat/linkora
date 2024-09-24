import React from 'react';
import UserProfileCard from '@/components/UserProfileCard';

const Page: React.FC = () => {
  const userData = {
    userId: 'AkshatSachan54994',
    username: 'Ankriti Sachan',
    socials: {
      linkedin: [
        {
          link: 'linkedin.com/in/sachanakshat',
          count: 7,
        },
        {
          link: 'linkedin.com/in/ankritisachan',
          count: 2,
        },
      ],
      twitter: [
        {
          link: 'newTwitterHandle.com',
          count: 8,
        },
        {
          link: 'twitter.com/ankritisachan',
          count: 1,
        },
      ],
      email: [
        {
          link: 'sachanakshat@normalenginnering.com',
          count: 8,
        },
        {
          link: 'ankritisachan@normalenginnering.com',
          count: 1,
        },
      ],
      phone: [
        {
          link: '1234512345',
          count: 8,
        },
      ],
      moreLinks: [
        {
          link: 'linktree.com',
          count: 7,
        },
        {
          link: 'dimaagkharab.linktree.com',
          count: 2,
        },
      ],
      facebook: [
        {
          link: 'facebook.com/sachanakshat',
          count: 3,
        },
        {
          link: 'facebook.com/akshatsachan',
          count: 1,
        },
        {
          link: 'facebook.com/ankritisachan',
          count: 2,
        },
      ],
    },
    feedbacks: [
      'Bhai stocks hila daale hain is bande ne',
      'Bhai stocks hila daale hain is bande ne',
      'Bhai stocks hila daale hain is bande ne',
      'Bhai stocks hila daale hain is bande ne',
      'Bhai stocks hila daale hain is bande ne',
      'Bhai stocks hila daale hain is bande ne',
      'Bhai stocks hila daale hain is bande ne',
      'The most savage abnormally hilarious person you will ever meet',
      'The most savage abnormally hilarious person you will ever meet',
    ],
  };

  return (
    // bg-gray-100
    <div className="min-h-screen  flex items-center justify-center">
      <UserProfileCard user={userData} />
    </div>
  );
};

export default Page;




// export default function Directory() {
//     return (
//         <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?nature')" }}>
//             <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-lg">
//                 <h1 className="text-3xl font-serif mb-4 text-center">Directory</h1>
//                 <div className="flex flex-col items-center justify-center space-y-6 p-4 md:p-0">
//                     <div className="text-center">
//                         <h2 className="font-serif text-3xl">Welcome to LINKORA</h2>
//                         <p className="font-sans text-xl">Experience a new way to connect</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }