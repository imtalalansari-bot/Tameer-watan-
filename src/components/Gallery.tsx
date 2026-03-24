import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

const images = [
  { id: 1, url: 'https://picsum.photos/seed/campus1/800/600', title: 'Main Campus' },
  { id: 2, url: 'https://picsum.photos/seed/lab1/800/600', title: 'Science Lab' },
  { id: 3, url: 'https://picsum.photos/seed/library1/800/600', title: 'Digital Library' },
  { id: 4, url: 'https://picsum.photos/seed/sports1/800/600', title: 'Sports Complex' },
  { id: 5, url: 'https://picsum.photos/seed/classroom1/800/600', title: 'Smart Classroom' },
  { id: 6, url: 'https://picsum.photos/seed/auditorium1/800/600', title: 'Auditorium' },
];

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 px-6 bg-[#020804]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">Campus Gallery</h2>
          <div className="w-20 h-1 bg-[#10b981] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <motion.div
              key={img.id}
              layoutId={`img-${img.id}`}
              onClick={() => setSelectedId(img.id)}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-white font-bold text-xl tracking-tighter">{img.title}</h3>
                <div className="flex items-center gap-2 text-[#10b981] text-xs font-bold uppercase tracking-widest mt-2">
                  <Maximize2 className="w-3 h-3" /> View Large
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedId(null)}
            >
              <button
                className="absolute top-10 right-10 text-white/60 hover:text-white transition-colors"
                onClick={() => setSelectedId(null)}
              >
                <X className="w-10 h-10" />
              </button>

              <motion.div
                layoutId={`img-${selectedId}`}
                className="max-w-5xl w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images.find(i => i.id === selectedId)?.url}
                  alt="Large View"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
