import React, { useState } from 'react';
import { X, ShieldCheck, GraduationCap, Sparkles, Building2, User, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, users, currentUser, switchUser, loginWithEdu } = useApp();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [dorm, setDorm] = useState('UVCE Boys Hostel, KR Circle');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide your college email address.');
      return;
    }

    const lower = email.toLowerCase();
    if (!lower.includes('uvce') && !lower.includes('.ac.in') && !lower.includes('.edu')) {
      setError('CampusCloset is exclusively for UVCE students. Please use your @uvce.ac.in or college email.');
      return;
    }

    setError('');
    loginWithEdu(email.trim(), name.trim(), major.trim(), 'UVCE Bengaluru', dorm);
    setIsAuthModalOpen(false);
  };

  const handleSelectDemoUser = (userId) => {
    switchUser(userId);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2 text-white">
            <GraduationCap className="w-4 h-4" />
            UVCE Verified Student Network
          </div>
          <h2 className="text-2xl font-bold tracking-tight">UVCE Student ID Verification</h2>
          <p className="text-blue-100 text-xs mt-1">
            Access your UVCE wardrobe marketplace. Exclusive to active UVCE students & hostelites.
          </p>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* 1-Click Fast Demo Switcher */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Instant Demo Student Logins (UVCE)
              </span>
              <span className="text-[11px] text-amber-800 font-medium">Click to switch & test</span>
            </div>
            <p className="text-xs text-amber-800/90 mb-3">
              Switch immediately between UVCE students to test booking requests, KR Circle handoff chat, and two-way reviews:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {users.slice(0, 4).map(user => {
                const isCurrent = user.id === currentUser.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => handleSelectDemoUser(user.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                        : 'bg-white hover:bg-amber-100/60 text-zinc-800 border-amber-200/90 shadow-sm'
                    }`}
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-9 h-9 rounded-full object-cover border border-white/40 shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold truncate">{user.name}</p>
                        {isCurrent && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                      <p className={`text-[10px] truncate ${isCurrent ? 'text-blue-100' : 'text-zinc-500'}`}>
                        {user.dorm.split(',')[0]}
                      </p>
                      <p className={`text-[9px] font-medium ${isCurrent ? 'text-blue-200' : 'text-amber-700'}`}>
                        ★ {user.rating} ({user.completedRentals} rentals)
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-zinc-200"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Or Verify UVCE Student Email
            </span>
            <div className="flex-grow border-t border-zinc-200"></div>
          </div>

          {/* College Email Verification Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                UVCE Student Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@uvce.ac.in"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <span className="absolute right-3 top-2.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  UVCE check
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Enter your <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-700 font-mono">@uvce.ac.in</code> college ID to activate campus escrow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Varun Kumar"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Branch / Year</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g. CSE 3rd Year"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                UVCE Hostel / Residence
              </label>
              <select
                value={dorm}
                onChange={(e) => setDorm(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="UVCE Boys Hostel, KR Circle">UVCE Boys Hostel (KR Circle)</option>
                <option value="UVCE Girls Hostel, JB Campus">UVCE Girls Hostel (Jnana Bharathi Campus)</option>
                <option value="Century Hostel, KR Circle">Century Hostel (KR Circle)</option>
                <option value="UVCE Mechanical Block">UVCE Mechanical Block</option>
                <option value="Off-Campus PG (Majestic / KR Circle)">Off-Campus PG (Majestic / KR Circle)</option>
                <option value="Day Scholar (Bengaluru)">Day Scholar (Bengaluru)</option>
              </select>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-zinc-900 hover:bg-black text-white rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verify & Enter UVCE Marketplace
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Student Trust Guarantee */}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-center gap-2 text-zinc-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>UVCE Student Verification + Refundable Escrow Protection on every rental.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
