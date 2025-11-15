import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Target, ChartLine } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "1. Add Your Habit",
      desc: "Start by adding a habit you want to improve — like drinking water or studying regularly.",
      icon: <ClipboardCheck className="w-10 h-10 text-purple-600" />,
    },
    {
      id: 2,
      title: "2. Set Your Goal",
      desc: "Decide how often you want to complete the habit — daily, weekly, or monthly.",
      icon: <Target className="w-10 h-10 text-purple-600" />,
    },
    {
      id: 3,
      title: "3. Track & Improve",
      desc: "Check your progress and stay consistent. Watch your small actions turn into big results!",
      icon: <ChartLine className="w-10 h-10 text-purple-600" />,
    },
  ];

  return (
    <section className="py-16 mt-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How <span className="text-purple-600">It Works</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="bg-purple-50 rounded-2xl shadow p-6 flex flex-col items-center hover:bg-purple-100 transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="bg-white rounded-full p-4 mb-4 shadow-md">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
