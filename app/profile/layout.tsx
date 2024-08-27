"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import Image from "next/image";
import linkoraLogo from "../../res/logo/l1.png";
import CreateReview from "@/app/createReview/page"; // Import the Button component

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [activeComponent, setActiveComponent] = useState("writeReview");

    const handleButtonClick = (componentName: string) => {
        setActiveComponent(componentName);
    };

    return (
        <>
            <nav className="flex items-center justify-between p-2 bg-gray-800 text-white">
                {/* style={styles.navbar} */}

                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src={linkoraLogo}
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                </div>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 mx-5 p-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // style={styles.searchBar}
                />

                {/* Buttons */}
                <div className="flex items-center space-x-3">
                    <button
                        className="bg-transparent border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out font-serif"
                        onClick={() => handleButtonClick("writeReview")}
                        // style={styles.button}
                    >
                        Write a Review
                    </button>
                    <button
                        className="bg-transparent border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out font-serif"
                        onClick={() => handleButtonClick("viewReviews")}
                        // style={styles.button}
                    >
                        View Reviews
                    </button>
                    <button
                        className="bg-transparent border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out font-serif"
                        onClick={() => handleButtonClick("viewProfile")}
                        // style={styles.button}
                    >
                        View Profile
                    </button>
                </div>
            </nav>

            <main>
                {/* Conditional rendering based on the active button clicked */}
                {activeComponent === "writeReview" && <CreateReview/>}
                {activeComponent === "viewReviews" && <ViewReviewsComponent />}
                {activeComponent === "viewProfile" && <ViewProfileComponent />}
                {activeComponent === "home" && children}
            </main>

            {/* {children}; */}
        </>
    );
}

// Styles
// const styles = {
//     navbar: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: "10px 20px",
//         backgroundColor: "#333",
//         color: "#fff",
//     },
//     logo: {
//         display: "flex",
//         alignItems: "center",
//     },
//     searchBar: {
//         flex: 1,
//         marginLeft: "20px",
//         marginRight: "20px",
//         padding: "10px",
//         borderRadius: "4px",
//         border: "1px solid #ccc",
//     },
//     buttonContainer: {
//         display: "flex",
//         alignItems: "center",
//     },
//     button: {
//         marginLeft: "10px",
//         padding: "10px 20px",
//         borderRadius: "4px",
//         backgroundColor: "#0070f3",
//         color: "#fff",
//         border: "none",
//         cursor: "pointer",
//     },
// };

// Placeholder components
const WriteReviewComponent = () => <div>Write a Review Component</div>;
const ViewReviewsComponent = () => <div>View Reviews Component</div>;
const ViewProfileComponent = () => <div>View Profile Component</div>;
