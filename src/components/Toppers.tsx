import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Star, Award } from 'lucide-react';

export default function Toppers() {
  const toppers = [
    {
      name: "Ahmed Khan",
      position: "1st Position",
      year: "2025",
      board: "Malakand Board",
      image: "https://picsum.photos/seed/student1/400/400",
      rank: 1
    },
    {
      name: "Sara Ali",
      position: "2nd Position",
      year: "2024",
      board: "Malakand Board",
      image: "https://picsum.photos/seed/student2/400/400",
      rank: 2
    },
    {
      name: "Zubair Shah",
      position: "1st Position",
      year: "2023",
      board: "Malakand Board",
      image: "https://picsum.photos/seed/student3/400/400",
      rank: 1
    },
    {
      name: "Ayesha Bibi",
      position: "3rd Position",
      year: "2025",
      board: "Malakand Board",
      image: "https://picsum.photos/seed/student4/400/400",
      rank: 3
    }
  ];

  return (
    <section id="toppers" className="py-24 px-6 bg-[#020804] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10b981]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Trophy className="w-3 h-3" />
            Academic Excellence
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 uppercase">
            Our Pride – <span className="text-[#10b981]">Board Toppers</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            Celebrating the outstanding achievements of our students who have consistently secured top positions in the Malakand Board.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {toppers.map((topper, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <div className="relative bg-[#020804] rounded-[2.4rem] p-6 overflow-hidden">
                  {/* Rank Badge */}
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-20 ${
                    topper.rank === 1 ? 'bg-[#10b981] text-black' : 'bg-white/10 text-white'
                  }`}>
                    <span className="text-xs font-black">{topper.rank}{topper.rank === 1 ? 'st' : topper.rank === 2 ? 'nd' : 'rd'}</span>
                  </div>

                  <div className="aspect-square rounded-3xl overflow-hidden mb-6 relative">
                    <img 
                      src={topper.image} 
                      alt={topper.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-[#10b981] transition-colors">{topper.name}</h3>
                    <div className="text-[#10b981] text-sm font-black uppercase tracking-tighter mb-2">{topper.position}</div>
                    <div className="flex items-center justify-center gap-2 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                      <Star className="w-3 h-3" />
                      {topper.year} • {topper.board}
                    </div>
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
          className="mt-20 p-12 bg-white/5 border border-white/10 rounded-[3rem] text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Award className="w-12 h-12 text-[#10b981] mx-auto mb-6 animate-bounce" />
          <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">
            Join the Institution That Produces Board Toppers
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            "Our institution has proudly produced top position holders in the Malakand Board, reflecting our commitment to excellence."
          </p>
          <Link 
            to="/admissions"
            className="inline-block px-12 py-4 bg-[#10b981] text-black font-black rounded-2xl uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          >
            Apply Now for Session 2026
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
