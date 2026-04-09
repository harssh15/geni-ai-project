import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CareerGuidanceResponse } from "@/src/services/gemini";
import { motion } from "motion/react";
import { Briefcase, GraduationCap, TrendingUp, DollarSign, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";

interface RecommendationResultProps {
  data: CareerGuidanceResponse;
  onReset: () => void;
}

export function RecommendationResult({ data, onReset }: RecommendationResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-5xl mx-auto pb-20"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Your Career Roadmap</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Based on your unique profile, our AI has identified these high-potential career paths for you.
        </p>
        <button
          onClick={onReset}
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 mx-auto transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Start Over
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommendations List */}
        <div className="lg:col-span-2 space-y-6">
          {data.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                <div className="h-2 bg-indigo-600" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-bold text-slate-900">{rec.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                          {rec.matchScore}% Match
                        </Badge>
                        <span className="text-slate-400">•</span>
                        <span className="text-indigo-600 font-medium flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {rec.marketOutlook}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Potential Salary</div>
                      <div className="text-lg font-bold text-emerald-600 flex items-center justify-end gap-1">
                        <DollarSign className="w-4 h-4" />
                        {rec.potentialSalary}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-600 leading-relaxed">{rec.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Why it matches
                      </h4>
                      <p className="text-sm text-slate-500 italic">{rec.whyMatch}</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                        Skills to Master
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.requiredSkills.map((skill, sIndex) => (
                          <Badge key={sIndex} variant="outline" className="border-slate-200 text-slate-600">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-100" />

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                      Learning Path
                    </h4>
                    <div className="space-y-3">
                      {rec.learningPath.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </div>
                          <p className="text-sm text-slate-600">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Advice */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-indigo-900 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Briefcase className="w-5 h-5" />
                Expert Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-indigo-100 text-sm leading-relaxed">
                {data.generalAdvice}
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Next Steps</CardTitle>
              <CardDescription>Actionable items to start your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {data.nextSteps.map((step, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
