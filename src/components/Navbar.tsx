import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, ShieldCheck } from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const isPrincipal = user?.email === 'imtalalansari@gmail.com';

  const navLinks = [
    { name: 'Home', path: '/#' },
    { name: 'About', path: '/#about' },
    { name: 'Programs', path: '/#programs' },
    { name: 'Fees', path: '/admissions' },
    { name: 'Apply', path: '/admissions' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Contact', path: '/#footer' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-[#020804]/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#064e3b] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            TAMEER-E-WATAN
          </span>
        </Link>
 
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-[#10b981]',
                location.pathname === link.path ? 'text-[#10b981]' : 'text-white/70'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {isPrincipal && (
            <Link
              to="/admin"
              className="flex items-center gap-2 bg-white/10 hover:bg-[#10b981] hover:text-black px-4 py-2 rounded-full border border-white/10 transition-all group"
            >
              <ShieldCheck className="w-4 h-4 text-[#10b981] group-hover:text-black" />
              <span className="text-sm font-bold uppercase tracking-widest text-[10px]">Principal Portal</span>
            </Link>
          )}
        </div>
 
        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
 
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#020804] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg text-white/70 hover:text-[#10b981]"
              >
                {link.name}
              </Link>
            ))}
            {isPrincipal && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="bg-[#10b981] text-black p-3 rounded-xl text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Principal Portal
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
