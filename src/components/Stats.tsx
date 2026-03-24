import { motion } from 'framer-motion';

export default function Stats() {
  const stats = [
    { label: 'Board Toppers', value: '15+', sub: 'Malakand Board' },
    { label: '100% Result Success', value: '100%', sub: 'Academic Record' },
    { label: 'Qualified Teachers', value: '60+', sub: 'PhD & MPhil' },
    { label: 'Top Positions', value: '25+', sub: 'District Level' },
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center group hover:bg-white/10 transition-all"
            >
              <div className="text-5xl font-black text-white mb-2 group-hover:text-[#10b981] transition-colors tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white/60 uppercase tracking-widest mb-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-[#10b981] font-bold uppercase tracking-widest opacity-60">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          {['BISE Malakand', 'Higher Education Dept', 'ISO Certified', 'Excellence Award'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
