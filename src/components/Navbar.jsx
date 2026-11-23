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
  GraduationCap,
  Sun,
  Moon
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
    setViewingProfileUser,
    theme,
    toggleTheme
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      {/* Mini Campus Banner */}
      <div className="bg-zinc-950 dark:bg-black text-white text-[11px] py-1 px-3 sm:px-4 font-medium flex items-center justify-between border-b border-zinc-800/60 overflow-hidden">
        <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0 truncate">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400 shrink-0">UVCE CampusCloset</span>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-zinc-300 truncate hidden xs:inline">
            KR Circle & JB Campus
          </span>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden md:inline">
            In-Person Peer Escrow
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button 
            onClick={resetDemoData}
            title="Reset demo data to initial state"
            className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Demo
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-6 min-w-0">
            <button 
              onClick={() => setCurrentView('marketplace')}
              className="flex items-center gap-2 text-left group focus:outline-none shrink-0"
              aria-label="CampusCloset Home"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                <Shirt className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-black text-base sm:text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
                    Campus<span className="text-blue-600 dark:text-blue-400">Closet</span>
                  </span>
                  <span className="bg-lime-400 text-zinc-950 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase shrink-0">
                    UVCE
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium -mt-1 hidden sm:block truncate">
                  Peer-to-Peer Wardrobe
                </p>
              </div>
            </button>

            {/* View navigation buttons (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-2xl border border-transparent dark:border-zinc-800">
              <button
                onClick={() => setCurrentView('marketplace')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'marketplace'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                Marketplace Feed
              </button>
              
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
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
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Theme Toggle Button (Desktop & Mobile, 44px min tap target) */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="min-h-[40px] min-w-[40px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 shadow-sm"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* List New Item Button */}
            <button
              onClick={() => setIsListItemOpen(true)}
              className="min-h-[40px] sm:min-h-[38px] flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">List an Item</span>
              <span className="sm:hidden">List</span>
            </button>

            {/* Mobile dashboard toggle */}
            <button
              onClick={() => setCurrentView(currentView === 'marketplace' ? 'dashboard' : 'marketplace')}
              className={`md:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title="Toggle Dashboard View"
              aria-label="Toggle Dashboard View"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>

            {/* User Profile & Demo Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="min-h-[40px] flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 pr-2 sm:pr-2.5 py-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-left"
              >
                <div className="relative shrink-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center" title="Verified UVCE Student">
                    <Check className="w-2 h-2 text-white stroke-[3]" />
                  </div>
                </div>

                <div className="hidden lg:block text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                      {currentUser.name}
                    </span>
                    <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-none">
                    ★ {currentUser.rating} ({currentUser.dorm.split(',')[0]})
                  </span>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-0.5 shrink-0" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-[calc(100vw-24px)] max-w-xs sm:w-72 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                    
                    {/* User profile card inside dropdown */}
                    <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40">
                      <div className="flex items-center gap-3">
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                            {currentUser.name}
                            <span className="text-[9px] bg-blue-100 dark:bg-blue-950 dark:text-blue-300 text-blue-700 px-1 py-0.2 rounded font-semibold">UVCE</span>
                          </p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">{currentUser.email}</p>
                          <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 truncate">
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
                          className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
                        >
                          View Public Card
                        </button>
                        <button
                          onClick={() => {
                            setCurrentView('dashboard');
                            setIsUserMenuOpen(false);
                          }}
                          className="flex-1 py-1.5 px-2 text-[11px] font-semibold text-center rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-colors"
                        >
                          Dashboard
                        </button>
                      </div>
                    </div>

                    {/* Quick Demo Switcher Section */}
                    <div className="px-4 pt-3 pb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        Switch Student Profile (Demo)
                      </p>
                    </div>

                    <div className="px-2 py-1 space-y-0.5 max-h-48 overflow-y-auto">
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
                              active 
                                ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-200 font-bold' 
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="truncate leading-tight">{u.name}</p>
                              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{u.dorm.split(',')[0]} • ★ {u.rating}</p>
                            </div>
                            {active && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-zinc-100 dark:border-zinc-800 mt-2 pt-2 px-2">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsAuthModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
