export function Login() {
    return (
        // <div className="grid grid-cols-2">
        //     <div>
        //         <div className="flex flex-col items-center justify-center">
        //             <h1 className="font-serif text-7xl">LINKORA</h1>
        //             <h1 className="font-sans text-xl">
        //                 {" "}
        //                 Hi! Welcome back. Please login.
        //             </h1>
        //             <div className="my-20">
        //                 <p className="font-bold">Email</p>
        //                 <input
        //                     className="px-2 h-9 rounded-lg text-slate-950"
        //                     type="email"
        //                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        //                     placeholder="Enter your email"
        //                 />
        //                 <p className="font-bold">Password</p>
        //                 <input
        //                     className="px-2 h-9 rounded-lg text-slate-950"
        //                     type="password"
        //                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        //                     placeholder="Enter your password"
        //                 />
        //             </div>
        //         </div>
        //         <div className="flex justify-between mx-32">
        //             <div className="flex items-center mb-4">
        //                 <input
        //                     id="default-checkbox"
        //                     type="checkbox"
        //                     value=""
        //                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        //                 />
        //                 <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        //                     Remember me
        //                 </label>
        //             </div>
        //             <a>Forgot Password</a>
        //         </div>
        //     </div>

        //     <div>This is col 2</div>
        // </div>



<div className="grid grid-cols-2 min-h-screen">
            <div className="flex flex-col items-center justify-center space-y-6">
                <div className="text-center">
                    <h1 className="font-serif text-7xl">LINKORA</h1>
                    <h1 className="font-sans text-xl">
                        Hi! Welcome back. Please login.
                    </h1>
                </div>
                <div className="w-1/3 space-y-4">
                    <div>
                        <p className="font-bold">Email</p>
                        <input
                            className="w-full px-2 h-9 rounded-lg text-slate-950"
                            type="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <p className="font-bold">Password</p>
                        <input
                            className="w-full px-2 h-9 rounded-lg text-slate-950"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>
                <div className="flex justify-between w-1/3">
                    <div className="flex items-center">
                        <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>
                    <a href="#" className="text-sm text-blue-500">Forgot Password</a>
                </div>
                <div className="w-1/3 space-y-4">
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg">Sign In</button>
                    <button className="w-full py-2 bg-red-500 text-white rounded-lg">Sign in with Google</button>
                </div>
                <div className="w-1/3 text-center">
                    <p className="text-sm">
                        Don't have an account? <a href="#" className="text-blue-500">Sign up for free</a>
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="text-center">
                    <h2 className="font-serif text-3xl">Welcome to LINKORA</h2>
                    <p className="font-sans text-xl">Experience a new way to connect</p>
                </div>
            </div>
        </div>
    );
}
