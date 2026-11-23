import React, { useState } from 'react';
import { 
  Sparkles, 
  Shirt, 
  PlusCircle, 
  LayoutDashboard, 
  Search, 
  ShieldCheck, 
  ChevronDown, 
  Check, 
  RotateCcw,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { 
    currentUser, 
    users, 
    switchUser, 
    currentView, 
    setCurrentView,
    setDashboardTab,
    rentals,
    setIsListItemOpen,
    setIsAuthModalOpen,
    resetDemoData,
    setViewingProfileUser
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Calculate pending / active alerts for current user
  const myActiveRentalsCount = rentals.filter(
    r => r.renterId === currentUser.id && (r.status === 'pending' || r.status === 'approved' || r.status === 'active')
  ).length;

  const myLendingRequestsCount = rentals.filter(
    r => r.lenderId === currentUser.id && r.status === 'pending'
  ).length;

  const totalNotifications = myActiveRentalsCount + myLendingRequestsCount;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      {/* Mini Campus Banner */}
      <div className="bg-zinc-950 text-white text-[11px] py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400">UVCE CampusCloset (DormDrip)</span>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-zinc-300 hidden sm:inline">
            Exclusively for UVCE Students & Hostels (KR Circle & JB Campus)
          </span>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden md:inline">
            Zero Platform Fees • In-Person Campus Handoffs
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <button 
            onClick={resetDemoData}
            title="Reset demo data to initial state"
            className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCurrentView('marketplace')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-zinc-900">
                    Campus<span className="text-blue-600">Closet</span>
                  </span>
                  <span className="bg-lime-400 text-zinc-950 text-[10px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase">
                    DormDrip
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 font-medium -mt-1 hidden sm:block">
                  College Wardrobe Exchange
                </p>
              </div>
            </button>

            {/* View navigation buttons */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-100 p-1 rounded-2xl">
              <button
                onClick={() => setCurrentView('marketplace')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'marketplace'
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Marketplace Feed
              </button>
              
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                }}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                My Dashboard
                {totalNotifications > 0 && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {totalNotifications}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* List New Item Button */}
            <button
              onClick={() => setIsListItemOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">List an Item</span>
              <span className="sm:hidden">List</span>
            </button>

            {/* Mobile dashboard toggle */}
            <button
              onClick={() => setCurrentView(currentView === 'marketplace' ? 'dashboard' : 'marketplace')}
              className="md:hidden p-2 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
              title="Toggle Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            {/* User Profile & Demo Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all text-left"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-200"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center" title="Verified .edu student">
                    <Check className="w-2 h-2 text-white stroke-[3]" />
                  </div>
                </div>

                <div className="hidden lg:block text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-zinc-900 leading-none">
                      {currentUser.name}
                    </span>
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-[10px] text-zinc-500 leading-none">
                    ★ {currentUser.rating} ({currentUser.dorm.split(',')[0]})
                  </span>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-0.5" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-zinc-200 py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                    
                    {/* User profile card inside dropdown */}
                    <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/70">
                      <div className="flex items-center gap-3">
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-zinc-900 flex items-center gap-1">
                            {currentUser.name}
                            <span className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-semibold">.EDU</span>
                          </p>
                          <p className="text-[11px] text-zinc-500 truncate">{currentUser.email}</p>
                          <p className="text-[10px] font-medium text-emerald-600">
                            {currentUser.dorm}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setViewingProfileUser(currentUser);
                            setIsUserMenuOpen(false);
                          }}
                          className="flex-1 py-1 px-2 text-[11px] font-semibold text-center rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition-colors"
                        >
                          View Public Card
                        </button>
                        <button
                          onClick={() => {
                            setCurrentView('dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="flex-1 py-1 px-2 text-[11px] font-semibold text-center rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
                        >
                          Dashboard
                        </button>
                      </div>
                    </div>

                    {/* Quick Demo Switcher Section */}
                    <div className="px-4 pt-3 pb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Switch Student Profile (Demo)
                      </p>
                    </div>

                    <div className="px-2 py-1 space-y-0.5">
                      {users.map(u => {
                        const active = u.id === currentUser.id;
                        return (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchUser(u.id);
                              setIsUserMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors ${
                              active ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-zinc-100 text-zinc-700'
                            }`}
                          >
                            <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="truncate leading-tight">{u.name}</p>
                              <p className="text-[10px] text-zinc-400 truncate">{u.dorm.split(',')[0]} • ★ {u.rating}</p>
                            </div>
                            {active && <Check className="w-3.5 h-3.5 text-blue-600" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-zinc-100 mt-2 pt-2 px-2">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsAuthModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        Verify College ID / uvce.ac.in
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
