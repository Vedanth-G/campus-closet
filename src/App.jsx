import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import MarketplaceFeed from './components/MarketplaceFeed';
import DashboardView from './components/DashboardView';
import ItemDetailModal from './components/ItemDetailModal';
import ListItemModal from './components/ListItemModal';
import AuthModal from './components/AuthModal';
import ChatDrawer from './components/ChatDrawer';
import ReviewModal from './components/ReviewModal';
import UserProfileModal from './components/UserProfileModal';
import Toast from './components/Toast';
import { Shirt, Heart, ShieldCheck, Sparkles } from 'lucide-react';

function MainApp() {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-zinc-950 flex flex-col font-sans text-zinc-900 dark:text-zinc-100 selection:bg-lime-300 selection:text-zinc-950 overflow-x-hidden transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 overflow-x-hidden">
        {currentView === 'marketplace' ? (
          <MarketplaceFeed />
        ) : (
          <DashboardView />
        )}
      </main>

      {/* Modern Gen-Z Footer */}
      <footer className="mt-auto border-t border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-6 sm:py-8 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              <Shirt className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">UVCE CampusCloset (DormDrip)</span>
            <span className="text-zinc-400">•</span>
            <span>Sustainable Student Wardrobe Rentals at UVCE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-400 dark:text-zinc-500">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% UVCE Verified & Escrow Protected
            </span>
            <span>•</span>
            <span>Built for UVCE Placements, Fests & Ethnic Days</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <ItemDetailModal />
      <ListItemModal />
      <AuthModal />
      <ChatDrawer />
      <ReviewModal />
      <UserProfileModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
