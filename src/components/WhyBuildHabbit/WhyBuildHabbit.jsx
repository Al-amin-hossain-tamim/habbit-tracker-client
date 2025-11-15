import React from "react";
import { motion } from "framer-motion";
import { Brain, Activity, Smile, TrendingUp } from "lucide-react"; // icons

const WhyBuildHabbit = () => {
  const benefits = [
    {
      id: 1,
      title: "Better Focus",
      desc: "Daily habits improve concentration and help you stay consistent with your goals.",
      icon: <Brain className="w-10 h-10 text-purple-600" />,
    },
    {
      id: 2,
      title: "Boost Productivity",
      desc: "Structured routines turn effort into progress and keep you motivated every day.",
      icon: <Activity className="w-10 h-10 text-purple-600" />,
    },
    {
      id: 3,
      title: "Reduce Stress",
      desc: "Habits simplify decisions, helping you feel calmer and more balanced in life.",
      icon: <Smile className="w-10 h-10 text-purple-600" />,
    },
    {
      id: 4,
      title: "Continuous Growth",
      desc: "Small daily improvements add up to big personal and professional growth.",
      icon: <TrendingUp className="w-10 h-10 text-purple-600" />,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b mt-10 from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why <span className="text-purple-600">Build Habits?</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="bg-purple-100 rounded-full p-4 mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuildHabbit;
