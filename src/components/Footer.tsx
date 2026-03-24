import { GraduationCap, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#020804] border-t border-white/10 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center">
                <GraduationCap className="text-black w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">
                TAMEER-E-WATAN
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Pioneering excellence in education through innovation, technology, and traditional values. Shaping the leaders of tomorrow.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#10b981] hover:text-black transition-all text-white/60">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/#about' },
                { name: 'Academic Programs', path: '/#programs' },
                { name: 'Apply', path: '/admissions' },
                { name: 'Contact Us', path: '/#footer' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-white/60 hover:text-[#10b981] transition-colors text-sm">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Admissions</h4>
            <ul className="space-y-4">
              {[
                { name: 'How to Apply', path: '/#admissions' },
                { name: 'Fee Structure', path: '/admissions' },
                { name: 'Scholarships', path: '/admissions' },
                { name: 'Entry Test', path: '/#admissions' },
                { name: 'FAQs', path: '/admissions' }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-white/60 hover:text-[#10b981] transition-colors text-sm">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-white/60">
                <MapPin className="w-5 h-5 text-[#10b981] shrink-0" />
                <span className="text-sm">Wari Dir (U), Khyber Pakhtunkhwa, Pakistan</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Phone className="w-5 h-5 text-[#10b981] shrink-0" />
                <span className="text-sm">+92 944 123456</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Mail className="w-5 h-5 text-[#10b981] shrink-0" />
                <span className="text-sm">info@tameerewatan.edu.pk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-xs uppercase tracking-widest">
            © 2026 Tameer-E-Watan Model School & College. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-white/20 text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
