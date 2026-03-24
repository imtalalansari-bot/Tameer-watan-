import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreeBackground from './components/ThreeBackground';
import AdmissionForm from './components/AdmissionForm';
import FeeStructure from './components/FeeStructure';
import AdminDashboard from './components/AdminDashboard';
import Auth from './components/Auth';
import Stats from './components/Stats';
import Programs from './components/Programs';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import AdmissionProcess from './components/AdmissionProcess';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Stats />
      <About />
      <AdmissionProcess />
      <Programs />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <Footer />
    </motion.div>
  );
}

function AdmissionsPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-black text-white tracking-tighter mb-4">JOIN THE FUTURE</h1>
        <p className="text-white/40 uppercase tracking-widest text-xs">Start your journey with Tameer-E-Watan</p>
      </div>
      <FeeStructure />
      <AdmissionForm />
      <Footer />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isPrincipal = user?.email === 'imtalalansari@gmail.com';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020804]">
        <div className="w-12 h-12 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#020804] text-white selection:bg-[#10b981] selection:text-black">
        <ScrollToHash />
        <ThreeBackground />
        <Navbar />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/login" element={isPrincipal ? <Navigate to="/admin" /> : <Auth />} />
            <Route path="/admin" element={isPrincipal ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
