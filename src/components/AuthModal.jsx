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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 sm:px-6 py-4 sm:py-5 text-white relative shrink-0">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-3.5 right-3.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close verification modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold mb-1.5 text-white">
            <GraduationCap className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            UVCE Verified Student Network
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">UVCE Student ID Verification</h2>
          <p className="text-blue-100 text-xs mt-0.5">
            Access your UVCE wardrobe marketplace. Exclusive to active students & hostelites.
          </p>
        </div>

        {/* Scrollable Form */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          {/* 1-Click Fast Demo Switcher */}
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 rounded-2xl p-3.5 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Instant Demo Student Logins (UVCE)
              </span>
              <span className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">Click to test</span>
            </div>
            <p className="text-xs text-amber-800/90 dark:text-amber-300/80 mb-3">
              Switch immediately between UVCE students to test booking requests, KR Circle handoff chat, and two-way reviews:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {users.slice(0, 4).map(user => {
                const isCurrent = user.id === currentUser.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => handleSelectDemoUser(user.id)}
                    className={`flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border text-left transition-all min-h-[44px] ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300 dark:ring-blue-900'
                        : 'bg-white dark:bg-zinc-800 hover:bg-amber-100/60 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border-amber-200/90 dark:border-amber-900/60 shadow-sm'
                    }`}
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/40 shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold truncate">{user.name}</p>
                        {isCurrent && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                      <p className={`text-[10px] truncate ${isCurrent ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        {user.dorm.split(',')[0]}
                      </p>
                      <p className={`text-[9px] font-medium ${isCurrent ? 'text-blue-200' : 'text-amber-700 dark:text-amber-400'}`}>
                        ★ {user.rating} ({user.completedRentals} rentals)
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Or Verify UVCE Student Email
            </span>
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
          </div>

          {/* College Email Verification Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                UVCE Student Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@uvce.ac.in"
                  className="w-full pl-3.5 pr-24 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[44px]"
                />
                <span className="absolute right-2.5 top-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  UVCE check
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                Enter your <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-zinc-700 dark:text-zinc-300 font-mono">@uvce.ac.in</code> college ID to activate campus escrow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Varun Kumar"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Branch / Year</label>
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g. CSE 3rd Year"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                UVCE Hostel / Residence
              </label>
              <select
                value={dorm}
                onChange={(e) => setDorm(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
              >
                <option value="UVCE Boys Hostel, KR Circle" className="dark:bg-zinc-800">UVCE Boys Hostel (KR Circle)</option>
                <option value="UVCE Girls Hostel, JB Campus" className="dark:bg-zinc-800">UVCE Girls Hostel (Jnana Bharathi Campus)</option>
                <option value="Century Hostel, KR Circle" className="dark:bg-zinc-800">Century Hostel (KR Circle)</option>
                <option value="UVCE Mechanical Block" className="dark:bg-zinc-800">UVCE Mechanical Block</option>
                <option value="Off-Campus PG (Majestic / KR Circle)" className="dark:bg-zinc-800">Off-Campus PG (Majestic / KR Circle)</option>
                <option value="Day Scholar (Bengaluru)" className="dark:bg-zinc-800">Day Scholar (Bengaluru)</option>
              </select>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full min-h-[48px] py-3 px-4 bg-zinc-950 dark:bg-lime-400 hover:bg-black dark:hover:bg-lime-300 text-white dark:text-zinc-950 rounded-xl text-xs sm:text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-zinc-950" />
              Verify & Enter UVCE Marketplace
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Student Trust Guarantee */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 text-[11px] text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>UVCE Student Verification + Refundable Escrow Protection on every rental.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
