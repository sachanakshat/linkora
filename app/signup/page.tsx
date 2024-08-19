'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/v1/signup', {
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                router.push('/homepage/page');
            }
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="flex flex-col items-center justify-center space-y-6 p-4 md:p-0">
                <div className="text-center">
                    <h1 className="font-serif text-4xl md:text-7xl">LINKORA</h1>
                    <h1 className="font-sans text-lg md:text-xl">
                        Welcome! Please sign up.
                    </h1>
                </div>
                <form onSubmit={handleSignup} className="w-full md:w-1/3 space-y-4">
                    <div>
                        <p className="font-bold">Email</p>
                        <input
                            className="w-full px-2 h-9 rounded-lg text-slate-950"
                            type="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <p className="font-bold">Password</p>
                        <input
                            className="w-full px-2 h-9 rounded-lg text-slate-950"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <p className="font-bold">Confirm Password</p>
                        <input
                            className="w-full px-2 h-9 rounded-lg text-slate-950"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg" type="submit">
                        Sign Up
                    </button>
                </form>
                <div className="w-full md:w-1/3 text-center">
                    <p className="text-sm">
                        Already have an account? <a href="/login" className="text-blue-500">Sign in here</a>
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center p-4 md:p-0">
                <div className="text-center">
                    <h2 className="font-serif text-2xl md:text-3xl">Welcome to LINKORA</h2>
                    <p className="font-sans text-lg md:text-xl">Experience a new way to connect</p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
