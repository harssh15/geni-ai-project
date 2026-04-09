import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/src/services/gemini";
import { motion } from "motion/react";

interface CareerFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

export function CareerForm({ onSubmit, isLoading }: CareerFormProps) {
  const [formData, setFormData] = React.useState<UserProfile>({
    name: "",
    education: "",
    skills: "",
    interests: "",
    personalityTraits: "",
    experienceLevel: "Entry Level",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto border-none shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">Tell us about yourself</CardTitle>
          <CardDescription className="text-slate-500">
            The more details you provide, the better our AI can recommend your ideal career path.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-slate-50/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-slate-50/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Student">Student</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education Background</Label>
              <Input
                id="education"
                name="education"
                placeholder="e.g. B.Tech in Computer Science, MBA in Marketing"
                value={formData.education}
                onChange={handleChange}
                required
                className="bg-slate-50/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Key Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                placeholder="e.g. Python, Public Speaking, Graphic Design, Project Management"
                value={formData.skills}
                onChange={handleChange}
                required
                className="min-h-[100px] bg-slate-50/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests & Hobbies</Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="What do you love doing? e.g. Solving puzzles, traveling, helping people, gaming"
                value={formData.interests}
                onChange={handleChange}
                required
                className="min-h-[100px] bg-slate-50/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalityTraits">Personality Traits</Label>
              <Input
                id="personalityTraits"
                name="personalityTraits"
                placeholder="e.g. Introverted, Analytical, Creative, Empathetic"
                value={formData.personalityTraits}
                onChange={handleChange}
                required
                className="bg-slate-50/50"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing Profile...
                </div>
              ) : (
                "Get Career Recommendations"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
