import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, where, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  ChevronRight,
  Loader2,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface Admission {
  id: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  phone: string;
  email: string;
  address: string;
  classApplyingFor: string;
  previousSchool?: string;
  marks: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'principal' | 'user';
  createdAt: string;
}

interface Invite {
  id: string;
  email: string;
  role: 'principal';
  invitedBy: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'admissions' | 'team'>('admissions');
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Admissions listener
    const qAdmissions = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'));
    const unsubscribeAdmissions = onSnapshot(qAdmissions, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Admission[];
      setAdmissions(data);
      if (activeTab === 'admissions') setLoading(false);
    }, (error) => {
      console.error("Error fetching admissions:", error);
    });

    // Users listener (Only Principals)
    const qUsers = query(collection(db, 'users'), where('role', '==', 'principal'), orderBy('createdAt', 'desc'));
    const unsubscribeUsers = onSnapshot(qUsers, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as UserProfile[];
      setUsers(data);
      if (activeTab === 'team') setLoading(false);
    }, (error) => {
      console.error("Error fetching users:", error);
    });

    // Invites listener
    const qInvites = query(collection(db, 'invites'), orderBy('createdAt', 'desc'));
    const unsubscribeInvites = onSnapshot(qInvites, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Invite[];
      setInvites(data);
    }, (error) => {
      console.error("Error fetching invites:", error);
    });

    return () => {
      unsubscribeAdmissions();
      unsubscribeUsers();
      unsubscribeInvites();
    };
  }, [activeTab]);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'admissions', id), { status });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    setIsInviting(true);
    try {
      await addDoc(collection(db, 'invites'), {
        email: inviteEmail.toLowerCase().trim(),
        role: 'principal',
        invitedBy: auth.currentUser?.email,
        createdAt: new Date().toISOString()
      });
      setInviteEmail('');
      alert("Invite sent successfully!");
    } catch (error) {
      console.error("Error sending invite:", error);
      alert("Failed to send invite.");
    } finally {
      setIsInviting(false);
    }
  };

  const cancelInvite = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'invites', id));
    } catch (error) {
      console.error("Error cancelling invite:", error);
    }
  };

  const updateUserRole = async (uid: string, role: 'principal' | 'user') => {
    const user = users.find(u => u.uid === uid);
    if (user?.email === 'imtalalansari@gmail.com') {
      alert("The Super Principal's role cannot be changed.");
      return;
    }

    try {
      await updateDoc(doc(db, 'users', uid), { role });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const deleteAdmission = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteDoc(doc(db, 'admissions', id));
        if (selectedAdmission?.id === id) setSelectedAdmission(null);
      } catch (error) {
        console.error("Error deleting admission:", error);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const filteredAdmissions = admissions.filter(adm => {
    const matchesSearch = adm.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         adm.cnic.includes(searchTerm) || 
                         adm.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || adm.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvites = invites.filter(inv => 
    inv.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: admissions.length,
    pending: admissions.filter(a => a.status === 'pending').length,
    approved: admissions.filter(a => a.status === 'approved').length,
    rejected: admissions.filter(a => a.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020804]">
        <Loader2 className="w-12 h-12 text-[#10b981] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020804] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
              Principal <span className="text-[#10b981]">Portal</span>
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-white/40 text-sm uppercase tracking-widest font-bold">
                {activeTab === 'admissions' ? 'Manage Admissions & Student Data' : 'Manage Authorized Personnel'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('admissions')}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'admissions' ? 'bg-[#10b981] text-black' : 'text-white/40 hover:text-white'
                }`}
              >
                Admissions
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'team' ? 'bg-[#10b981] text-black' : 'text-white/40 hover:text-white'
                }`}
              >
                Team
              </button>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-sm font-bold uppercase tracking-widest"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {activeTab === 'admissions' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { label: 'Total Applications', value: stats.total, icon: Users, color: 'text-white' },
                { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-yellow-500' },
                { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-[#10b981]' },
                { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Live</span>
                  </div>
                  <div className="text-3xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                  <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text"
                  placeholder="Search by name, email, or CNIC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 outline-none focus:border-[#10b981] transition-all"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border ${
                      filterStatus === status 
                        ? 'bg-[#10b981] text-black border-[#10b981]' 
                        : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* List */}
              <div className="lg:col-span-2 space-y-4">
                {filteredAdmissions.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                    <p className="text-white/40 uppercase tracking-widest text-sm font-bold">No applications found</p>
                  </div>
                ) : (
                  filteredAdmissions.map((adm) => (
                    <motion.div
                      layout
                      key={adm.id}
                      onClick={() => setSelectedAdmission(adm)}
                      className={`group relative bg-white/5 border transition-all cursor-pointer p-6 rounded-3xl ${
                        selectedAdmission?.id === adm.id ? 'border-[#10b981] bg-white/10' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${
                            adm.status === 'approved' ? 'bg-[#10b981]/20 text-[#10b981]' :
                            adm.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {adm.fullName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-white font-bold tracking-tight">{adm.fullName}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{adm.classApplyingFor}</span>
                              <span className="w-1 h-1 bg-white/10 rounded-full" />
                              <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{new Date(adm.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            adm.status === 'approved' ? 'bg-[#10b981]/10 text-[#10b981]' :
                            adm.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                            'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {adm.status}
                          </span>
                          <ChevronRight className={`w-4 h-4 text-white/20 transition-transform ${selectedAdmission?.id === adm.id ? 'rotate-90 text-[#10b981]' : ''}`} />
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Details Panel */}
              <div className="lg:col-span-1">
                <AnimatePresence mode="wait">
                  {selectedAdmission ? (
                    <motion.div
                      key={selectedAdmission.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="sticky top-32 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center font-black text-3xl ${
                            selectedAdmission.status === 'approved' ? 'bg-[#10b981]/20 text-[#10b981]' :
                            selectedAdmission.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {selectedAdmission.fullName.charAt(0)}
                          </div>
                          <button 
                            onClick={() => deleteAdmission(selectedAdmission.id)}
                            className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">{selectedAdmission.fullName}</h2>
                        <p className="text-[#10b981] text-xs font-bold uppercase tracking-widest mb-8">Applying for {selectedAdmission.classApplyingFor}</p>

                        <div className="space-y-6 mb-10">
                          <div className="flex items-start gap-4">
                            <Users className="w-5 h-5 text-white/20 shrink-0 mt-1" />
                            <div>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-1">Father's Name</p>
                              <p className="text-white font-medium">{selectedAdmission.fatherName}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <Mail className="w-5 h-5 text-white/20 shrink-0 mt-1" />
                            <div>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-1">Email Address</p>
                              <p className="text-white font-medium">{selectedAdmission.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <Phone className="w-5 h-5 text-white/20 shrink-0 mt-1" />
                            <div>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-1">Phone Number</p>
                              <p className="text-white font-medium">{selectedAdmission.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <MapPin className="w-5 h-5 text-white/20 shrink-0 mt-1" />
                            <div>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-1">Address</p>
                              <p className="text-white font-medium text-sm leading-relaxed">{selectedAdmission.address}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <Calendar className="w-5 h-5 text-white/20 shrink-0 mt-1" />
                            <div>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mb-1">Obtained Marks (SSC)</p>
                              <p className="text-white font-medium">{selectedAdmission.marks}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => updateStatus(selectedAdmission.id, 'approved')}
                            disabled={selectedAdmission.status === 'approved'}
                            className="flex items-center justify-center gap-2 py-4 bg-[#10b981] hover:bg-[#059669] disabled:opacity-50 disabled:hover:bg-[#10b981] text-black font-black rounded-2xl transition-all text-xs uppercase tracking-widest"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(selectedAdmission.id, 'rejected')}
                            disabled={selectedAdmission.status === 'rejected'}
                            className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 disabled:opacity-50 text-white font-black rounded-2xl transition-all text-xs uppercase tracking-widest"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </div>

                      {/* Background Decoration */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                    </motion.div>
                  ) : (
                    <div className="sticky top-32 bg-white/5 border border-white/10 border-dashed rounded-[2.5rem] p-12 text-center">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-8 h-8 text-white/20" />
                      </div>
                      <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Select an application to view details</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Invite Section */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-tighter">Authorize New Principal</h2>
              <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="email"
                    required
                    placeholder="Enter email address to authorize..."
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 outline-none focus:border-[#10b981] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isInviting}
                  className="bg-[#10b981] hover:bg-[#059669] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isInviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                  Authorize Access
                </button>
              </form>
              <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mt-4">
                Authorized users will be able to log in and manage all school data.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Active Principals */}
              <div className="space-y-6">
                <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] px-2">Active Principals</h2>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <motion.div
                      layout
                      key={user.uid}
                      className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-xl object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-10 h-10 bg-[#10b981]/20 text-[#10b981] rounded-xl flex items-center justify-center font-black text-lg">
                              {user.displayName?.charAt(0) || user.email.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h3 className="text-white font-bold tracking-tight text-sm">{user.displayName || 'Principal'}</h3>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">{user.email}</p>
                          </div>
                        </div>
                        
                        {user.email !== 'imtalalansari@gmail.com' && (
                          <button
                            onClick={() => updateUserRole(user.uid, 'user')}
                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                            title="Revoke Access"
                          >
                            <LogOut className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pending Invites */}
              <div className="space-y-6">
                <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] px-2">Pending Authorizations</h2>
                <div className="space-y-4">
                  {filteredInvites.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-8 text-center">
                      <p className="text-white/20 uppercase tracking-widest text-[10px] font-bold">No pending authorizations</p>
                    </div>
                  ) : (
                    filteredInvites.map((invite) => (
                      <motion.div
                        layout
                        key={invite.id}
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 text-white/20 rounded-xl flex items-center justify-center">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-white/60 font-bold tracking-tight text-sm">{invite.email}</h3>
                              <p className="text-white/20 text-[10px] uppercase tracking-widest font-black">Waiting for first login</p>
                            </div>
                          </div>
                          <button
                            onClick={() => cancelInvite(invite.id)}
                            className="p-2 text-white/20 hover:text-red-500 transition-all"
                            title="Cancel Authorization"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
