import { motion } from 'framer-motion';
import { Users, Zap, Trophy, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      title: "Experienced Faculty",
      desc: "Our teachers are highly qualified professionals with years of experience in their respective fields.",
      icon: Users,
    },
    {
      title: "Modern Teaching",
      desc: "We use 3D models, digital libraries, and interactive smart boards to make learning engaging.",
      icon: Zap,
    },
    {
      title: "Strong Results",
      desc: "Consistently achieving 100% board results with top positions in the district.",
      icon: Trophy,
    },
    {
      title: "Character Building",
      desc: "We focus on ethical development and discipline to shape students into responsible citizens.",
      icon: Heart,
    },
    {
      title: "Safe Environment",
      desc: "A secure and inclusive campus where every student feels safe and supported.",
      icon: ShieldCheck,
    },
    {
      title: "Holistic Growth",
      desc: "Extensive co-curricular activities including sports, debates, and science fairs.",
      icon: Sparkles,
    }
  ];

  return (
    <section id="why-us" className="py-24 px-6 bg-[#020804] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">Why Choose Us</h2>
          <div className="w-20 h-1 bg-[#10b981] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
            >
              <div className="w-16 h-16 bg-[#10b981]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <feature.icon className="text-[#10b981] w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter uppercase">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
