import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Rocket, Shield, GraduationCap } from 'lucide-react';

export default function Programs() {
  const programs = [
    {
      title: "Primary Section",
      desc: "Laying a strong foundation with a focus on literacy, numeracy, and creative thinking.",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Middle Section",
      desc: "Developing critical thinking and social awareness through deep academic study.",
      icon: Shield,
      color: "from-[#10b981] to-emerald-200"
    },
    {
      title: "High School",
      desc: "Rigorous academic preparation for board exams with a focus on science and arts.",
      icon: Rocket,
      color: "from-purple-500 to-pink-400"
    },
    {
      title: "College (FSc)",
      desc: "Specialized pre-medical and pre-engineering programs for higher education success.",
      icon: GraduationCap,
      color: "from-green-500 to-emerald-400"
    }
  ];

  return (
    <section id="programs" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">Academic Programs</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              We offer a diverse range of academic and co-curricular programs designed to prepare students for the challenges of the 21st century.
            </p>
          </div>
          <Link 
            to="/admissions"
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all text-center"
          >
            View Fee Structure
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${prog.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <prog.icon className="text-[#10b981] w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter">{prog.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {prog.desc}
              </p>
              
              <Link 
                to="/admissions"
                className="text-[#10b981] text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all"
              >
                Apply Now <div className="w-4 h-px bg-[#10b981]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
