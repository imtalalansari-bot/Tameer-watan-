import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Trophy, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#10b981] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            Empowering Future Leaders
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            SHAPING THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-white to-[#10b981] animate-gradient">
              FUTURISTIC
            </span> <br />
            EDUCATION.
          </h1>
          
          <p className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed">
            Tameer-E-Watan Model School & College Wari Dir (U) is where innovation meets tradition. 
            Experience a 3D-integrated learning environment designed for the next generation.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admissions"
              className="group relative px-8 py-4 bg-[#10b981] rounded-2xl text-black font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            
            <Link
              to="/#programs"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all"
            >
              Explore More
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-bold text-white">1500+</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Students</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Teachers</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Results</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/school/800/800" 
              alt="School Campus" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020804] to-transparent opacity-60" />
          </div>
          
          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 p-6 bg-black/40 backdrop-blur-xl border border-[#10b981]/30 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)] z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10b981] to-emerald-600 flex items-center justify-center shadow-lg">
                <Medal className="text-white w-5 h-5" />
              </div>
              <div>
                <div className="text-[#10b981] font-black tracking-tighter">TOP POSITIONS</div>
                <div className="text-white/50 text-[10px] uppercase tracking-widest">Academic Excellence</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
