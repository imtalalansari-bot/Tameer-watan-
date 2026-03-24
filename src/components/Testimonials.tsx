import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="principal" className="py-24 px-6 bg-[#020804] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">Principal's Message</h2>
          <div className="w-20 h-1 bg-[#10b981] mx-auto rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group hover:bg-white/10 transition-all duration-500"
        >
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="relative min-h-[400px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                alt="Principal"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020804] via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
            
            <div className="p-12 md:p-16 flex flex-col justify-center relative">
              <Quote className="w-24 h-24 text-[#10b981]/10 absolute top-8 right-8" />
              
              <div className="relative z-10">
                <p className="text-white/80 text-xl italic leading-relaxed mb-10 font-serif">
                  "Our institution has proudly produced top position holders in the Malakand Board, reflecting our commitment to excellence. We believe in nurturing not just academic brilliance, but character and leadership in every student. At Tameer-E-Watan, we prepare you for the future."
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-3xl font-black text-white tracking-tight uppercase">Prof. Muhammad Ali</h4>
                  <div className="flex items-center gap-4">
                    <div className="h-px w-8 bg-[#10b981]" />
                    <p className="text-[#10b981] font-bold uppercase tracking-[0.2em] text-xs">Principal & Academic Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
