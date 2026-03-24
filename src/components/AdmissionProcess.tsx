import { motion } from 'framer-motion';
import { FileEdit, ClipboardCheck, GraduationCap } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Apply Online",
    desc: "Fill out the futuristic admission form on our website with all required details.",
    icon: FileEdit,
  },
  {
    id: 2,
    title: "Test & Interview",
    desc: "Qualified candidates will be called for a computer-based test and personal interview.",
    icon: ClipboardCheck,
  },
  {
    id: 3,
    title: "Confirmation",
    desc: "Successful candidates receive their admission letter and join the Tameer-E-Watan family.",
    icon: GraduationCap,
  }
];

export default function AdmissionProcess() {
  return (
    <section id="admissions" className="py-24 px-6 bg-[#020804] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">Admission Process</h2>
          <div className="w-20 h-1 bg-[#10b981] mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden lg:block" />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#10b981] to-[#064e3b] -translate-y-1/2 hidden lg:block"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.3 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-[#020804] border-4 border-white/10 rounded-full flex items-center justify-center group-hover:border-[#10b981] transition-colors duration-500 relative z-10">
                    <step.icon className="w-10 h-10 text-white group-hover:text-[#10b981] transition-colors duration-500" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#10b981] text-black rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                    {step.id}
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#10b981] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-full" />
                </div>

                <h3 className="text-2xl font-black text-white tracking-tighter mb-4 uppercase group-hover:text-[#10b981] transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/40 leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
