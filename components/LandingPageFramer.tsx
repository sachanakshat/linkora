"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaStar, FaUsers, FaRobot, FaComments, FaNetworkWired, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className="text-blue-600 w-12 h-12" />,
    title: "AI-Backed Insights",
    description:
      "Linkora uses advanced AI algorithms to analyze and display relevant information about individuals, ensuring data is accurate and up-to-date.",
  },
  {
    icon: <FaUsers className="text-green-600 w-12 h-12" />,
    title: "Crowdsourced Reviews",
    description:
      "Our platform relies on user-generated content, making it a true reflection of public opinion. Contribute and build a rich database.",
  },
  {
    icon: <FaStar className="text-yellow-500 w-12 h-12" />,
    title: "Public Appeal Meter",
    description:
      "Get a quick snapshot of how a person is perceived by others. This helps you make informed decisions based on public opinion.",
  },
  {
    icon: <FaComments className="text-purple-600 w-12 h-12" />,
    title: "Honest Feedback",
    description:
      "Linkora encourages honest and constructive feedback, offering users a realistic understanding of a person's character and abilities.",
  },
  {
    icon: <FaNetworkWired className="text-pink-500 w-12 h-12" />,
    title: "Find Similar Interests",
    description:
      "Whether for professional networking or personal connections, this feature helps you find people with similar interests.",
  },
  {
    icon: <FaUserCheck className="text-indigo-600 w-12 h-12" />,
    title: "Eliminate the Need for Endorsements",
    description:
      "With Linkora, you no longer need to ask for letters of recommendation or endorsements. All the information is available to make the process seamless.",
  },
];

export default function LandingPageFramer() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    // bg-white
    <main className="min-h-screen text-gray-900">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
        <motion.div
          className="container mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to Linkora</h1>
          <p className="text-lg">
            Find comprehensive reviews and insights about people - crowdsourced and AI-powered.
          </p>
          <Button className="mt-4" size="lg" variant="outline">
            Get Started
          </Button>
        </motion.div>
      </header>

      <section className="container mx-auto p-8">
        <motion.div
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg shadow-lg bg-white border"
              whileHover={{ scale: 1.05 }}
            >
              <Card>
                <CardHeader className="flex items-center space-x-4">
                  <div>{feature.icon}</div>
                  <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">{feature.description}</CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gray-50 py-16">
        <Tabs defaultValue="prerequisites" className="container mx-auto">
          <TabsList>
            <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="contributing">Contributing</TabsTrigger>
          </TabsList>
          <TabsContent value="prerequisites">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">Prerequisites</h2>
              <p>A modern web browser and an active internet connection.</p>
            </div>
          </TabsContent>
          <TabsContent value="installation">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">Installation</h2>
              <pre className="bg-gray-200 p-4 rounded">
                <code>
                  git clone https://github.com/sachanakshat/linkora.git
                  <br />
                  cd linkora
                  <br />
                  npm install
                  <br />
                  npm run dev
                </code>
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="usage">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">Usage</h2>
              <p>Open your browser and navigate to <code>localhost</code> after starting the application.</p>
            </div>
          </TabsContent>
          <TabsContent value="contributing">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">Contributing</h2>
              <p>We welcome contributions! Fork the repository and submit a pull request.</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>
          Built with ❤️ by the people, for the people. Reach out to Akshat Sachan on Twitter for any queries.
        </p>
      </footer>
    </main>
  );
}
