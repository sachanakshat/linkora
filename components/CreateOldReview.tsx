'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ModeToggle } from './ModeToggle';

const CreateOldReview: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [socials, setSocials] = useState<{ [key: string]: string }>({});
    const [feedback, setFeedback] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSocials((prevSocials) => ({ ...prevSocials, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/signup', {
                username: username,
                socials: socials,
                feedback: feedback,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                router.push('/homepage/page');
            }
        } catch (err) {
            setError('Submission failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?nature')" }}>
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-serif mb-4 text-center">Create Review</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Username</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Social Links</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="linkedin"
                            placeholder="LinkedIn URL"
                            onChange={handleSocialChange}
                        />
                        <input
                            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="facebook"
                            placeholder="Facebook URL"
                            onChange={handleSocialChange}
                        />
                        <input
                            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="twitter"
                            placeholder="Twitter URL"
                            onChange={handleSocialChange}
                        />
                        <input
                            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleSocialChange}
                        />
                        <input
                            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            onChange={handleSocialChange}
                        />
                        <input
                            className="w-full px-3 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="moreLinks"
                            placeholder="Other Links"
                            onChange={handleSocialChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Feedback</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">
                        Submit
                    </button>
                </form>
                
            </div>
            <ModeToggle/>
        </div>
    );
};

export default CreateOldReview;
