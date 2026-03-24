import { motion } from 'framer-motion';
import { Target, Eye, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#020804] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-black text-white tracking-tighter mb-8 uppercase">
              A Legacy of <br />
              <span className="text-[#10b981]">Discipline & Quality</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Founded with a vision to revolutionize education in Wari Dir (U), Tameer-E-Watan Model School & College has been a beacon of knowledge for over two decades. Our story is one of relentless pursuit of academic excellence and character building.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              We believe that true education goes beyond textbooks. It's about fostering a culture of discipline, curiosity, and ethical leadership in every student who walks through our doors.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-4">
                  <Target className="text-[#10b981] w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Our Mission</h3>
                <p className="text-white/40 text-sm">To provide accessible, high-quality education that empowers students to become responsible global citizens.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-4">
                  <Eye className="text-[#10b981] w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Our Vision</h3>
                <p className="text-white/40 text-sm">To be a leading institution recognized for innovation, academic rigor, and the holistic development of future leaders.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/discipline/800/1000" 
                alt="School Discipline" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute -bottom-10 -left-10 p-8 bg-[#10b981] rounded-3xl shadow-2xl max-w-xs">
              <Award className="text-black w-10 h-10 mb-4" />
              <h4 className="text-black font-black text-xl tracking-tighter mb-2">QUALITY EDUCATION</h4>
              <p className="text-black/70 text-sm font-medium">Consistently ranked among the top model schools in the province for over 10 years.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
