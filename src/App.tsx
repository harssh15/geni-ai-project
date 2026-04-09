/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CareerForm } from "./components/CareerForm";
import { RecommendationResult } from "./components/RecommendationResult";
import { getCareerRecommendations, UserProfile, CareerGuidanceResponse } from "./services/gemini";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<CareerGuidanceResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFormSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    try {
      const recommendations = await getCareerRecommendations(profile);
      setResult(recommendations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-slate-200/30 blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6"
          >
            <Compass className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-black tracking-tight text-slate-900 mb-4"
          >
            CareerPath <span className="text-indigo-600">AI</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-slate-500 max-w-xl flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Navigate your professional future with AI-driven insights
          </motion.p>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CareerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center max-w-2xl mx-auto">
                    {error}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <RecommendationResult data={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>© 2026 CareerPath AI. Empowering your professional journey.</p>
        </footer>
      </div>
    </div>
  );
}
