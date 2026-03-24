import { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { GraduationCap, LogIn, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if this is the super principal email
      if (user.email === 'imtalalansari@gmail.com') {
        // Super principal always has access
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'principal',
          createdAt: new Date().toISOString()
        }, { merge: true });
      } else {
        // Check if user has an active invite or existing principal role
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        const invitesRef = collection(db, 'invites');
        const q = query(invitesRef, where('email', '==', user.email));
        const inviteSnap = await getDocs(q);

        const isAuthorized = (userSnap.exists() && userSnap.data().role === 'principal') || !inviteSnap.empty;

        if (!isAuthorized) {
          setError("Unauthorized access. This portal is for authorized personnel only.");
          await auth.signOut();
          return;
        }

        // If they have an invite but no user doc, create it
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: 'principal',
            createdAt: new Date().toISOString()
          });
          
          // Optionally delete the invite once used
          if (!inviteSnap.empty) {
            await deleteDoc(doc(db, 'invites', inviteSnap.docs[0].id));
          }
        }
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020804] px-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10b981]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#064e3b]/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#064e3b] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="text-white w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">PRINCIPAL <span className="text-[#10b981]">LOGIN</span></h1>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Authorized Personnel Only</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-400 leading-relaxed font-medium">{error}</p>
            </motion.div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full group relative flex items-center justify-center gap-4 bg-white text-black font-black py-5 rounded-2xl transition-all hover:bg-[#10b981] disabled:opacity-50 overflow-hidden"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <span className="uppercase tracking-widest text-xs">Sign in with Google</span>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Protected by Tameer-E-Watan Security Protocols.<br />
              Unauthorized access attempts are logged.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
