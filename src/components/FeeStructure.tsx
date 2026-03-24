import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, Info } from 'lucide-react';

const feeData = [
  {
    section: "Primary Section",
    level: "Grade 1 - 5",
    admission: "5,000",
    monthly: "2,500",
    annual: "3,000",
    features: ["Modern Classrooms", "Basic Computer Lab", "Sports Activities", "Library Access"]
  },
  {
    section: "Middle Section",
    level: "Grade 6 - 8",
    admission: "6,000",
    monthly: "3,000",
    annual: "4,000",
    features: ["Science Labs", "Advanced IT Lab", "Extracurricular Clubs", "Career Counseling"]
  },
  {
    section: "High School",
    level: "Grade 9 - 10",
    admission: "8,000",
    monthly: "4,000",
    annual: "5,000",
    features: ["Board Exam Prep", "Specialized Science Labs", "Leadership Programs", "Robotics Lab"]
  },
  {
    section: "College (FSc)",
    level: "Grade 11 - 12",
    admission: "10,000",
    monthly: "6,000",
    annual: "8,000",
    features: ["Pre-Medical/Engineering", "Entry Test Prep", "Research Projects", "University Placement"]
  }
];

export default function FeeStructure() {
  return (
    <section className="py-24 px-6 bg-[#020804] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <CreditCard className="w-3 h-3" />
            Transparent Pricing
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 uppercase">
            Fee <span className="text-[#10b981]">Structure</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            We offer competitive fee structures while maintaining the highest standards of education and facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {feeData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <div className="relative bg-[#020804] rounded-[2.4rem] p-8 overflow-hidden h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-white tracking-tighter mb-1 uppercase">{item.section}</h3>
                    <p className="text-[#10b981] text-xs font-bold uppercase tracking-widest">{item.level}</p>
                  </div>

                  <div className="space-y-6 mb-8 flex-1">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Admission</span>
                      <span className="text-2xl font-black text-white tracking-tighter">Rs. {item.admission}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Monthly</span>
                      <span className="text-2xl font-black text-[#10b981] tracking-tighter">Rs. {item.monthly}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Annual Fund</span>
                      <span className="text-2xl font-black text-white tracking-tighter">Rs. {item.annual}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-white/5 border border-white/10 rounded-3xl flex items-start gap-4 max-w-3xl mx-auto"
        >
          <Info className="w-6 h-6 text-[#10b981] shrink-0 mt-1" />
          <div className="text-sm text-white/40 leading-relaxed">
            <span className="text-white font-bold block mb-1">Important Note:</span>
            Fees are subject to change as per the decision of the Board of Governors. Admission fee is a one-time payment. Monthly fees are payable by the 10th of each month. Scholarships are available for deserving and high-achieving students.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
