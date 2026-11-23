import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Clock, 
  MessageSquare, 
  ArrowRight, 
  AlertCircle,
  Tag,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ItemDetailModal() {
  const { 
    detailItem, 
    setDetailItem, 
    currentUser, 
    bookRental, 
    setViewingProfileUser,
    users,
    setCurrentView,
    setDashboardTab,
    setActiveChatRentalId
  } = useApp();

  // Date calculation states
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(tomorrowStr);
  const [note, setNote] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!detailItem) return null;

  const owner = users.find(u => u.id === detailItem.ownerId) || {
    id: detailItem.ownerId,
    name: detailItem.ownerName,
    avatar: detailItem.ownerAvatar,
    campus: detailItem.ownerCampus,
    dorm: detailItem.ownerDorm,
    rating: detailItem.ownerRating,
    totalReviews: detailItem.ownerReviewCount,
    verifiedEdu: true
  };

  const isOwner = currentUser.id === detailItem.ownerId;

  // Calculate rental days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const rawDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const rentalDays = Math.max(1, isNaN(rawDays) ? 1 : rawDays);

  const dailyRate = detailItem.dailyPrice;
  const totalDailyCost = dailyRate * rentalDays;
  const deposit = detailItem.securityDeposit;
  const totalDue = totalDailyCost + deposit;

  const handleBook = () => {
    setIsSubmitting(true);
    const newRental = bookRental({
      itemId: detailItem.id,
      startDate,
      endDate,
      totalDays: rentalDays,
      pickupLocation: detailItem.pickupLocation,
      note
    });

    setIsSubmitting(false);
    setDetailItem(null);
    setCurrentView('dashboard');
    setDashboardTab('rentals');
    if (newRental) {
      setActiveChatRentalId(newRental.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Touch Friendly) */}
        <button
          onClick={() => setDetailItem(null)}
          className="absolute top-3.5 right-3.5 z-20 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-zinc-900/70 hover:bg-zinc-900 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Gallery */}
        <div className="md:w-1/2 bg-zinc-950 flex flex-col shrink-0">
          <div className="relative aspect-[4/3] sm:aspect-[4/5] md:h-full w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
            <img
              src={detailItem.images[selectedPhotoIndex] || detailItem.images[0]}
              alt={detailItem.title}
              className="w-full h-full object-cover"
            />

            {/* Size & Category Overlay */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 sm:gap-2">
              <span className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-zinc-100 text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-1 rounded-full shadow-md">
                Size {detailItem.size}
              </span>
              <span className="bg-black/70 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
                {detailItem.category}
              </span>
            </div>

            {/* Price Chip */}
            <div className="absolute bottom-3.5 left-3.5 bg-zinc-950/80 backdrop-blur-md text-white px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl border border-white/20 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-lime-400">₹{detailItem.dailyPrice}</span>
              <span className="text-[11px] sm:text-xs text-zinc-300 font-semibold">/ day</span>
            </div>
          </div>

          {/* Multiple Image Selector thumbnails */}
          {detailItem.images.length > 1 && (
            <div className="p-2 sm:p-3 bg-zinc-950 flex gap-2 overflow-x-auto border-t border-zinc-800">
              {detailItem.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedPhotoIndex === idx ? 'border-lime-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details, Escrow Calculator & Actions */}
        <div className="md:w-1/2 flex flex-col p-4 sm:p-6 overflow-y-auto max-h-[60vh] md:max-h-[88vh] space-y-4 sm:space-y-6">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <span>{detailItem.category}</span>
              <span>•</span>
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">{detailItem.rentalsCount || 0} campus rentals completed</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
              {detailItem.title}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {detailItem.description}
            </p>
          </div>

          {/* Condition & Pickup Badges */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/90 dark:border-zinc-700/80 rounded-2xl p-3 sm:p-3.5 space-y-2">
            <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">Garment Condition:</strong> {detailItem.conditionNotes}
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-900 dark:text-zinc-100">Campus Pickup Spot:</strong> {detailItem.pickupLocation}
              </div>
            </div>
          </div>

          {/* Owner Student Profile Card */}
          <div className="bg-white dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-3.5 sm:p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-600/30 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{owner.name}</h4>
                  <span className="inline-flex items-center gap-0.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                    UVCE Verified
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 truncate">{owner.dorm}</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-amber-700 dark:text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{owner.rating}</span>
                  <span className="text-zinc-400 dark:text-zinc-500 font-normal">
                    ({owner.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewingProfileUser(owner)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-700 flex items-center gap-0.5 shrink-0 transition-colors min-h-[40px]"
            >
              Profile
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Booking & Price Calculator Section */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 sm:pt-5 space-y-3.5 sm:space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Select Rental Dates
              </h3>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
              </span>
            </div>

            {/* Date Picker Inputs (Stacked cleanly on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={todayStr}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || todayStr}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
                />
              </div>
            </div>

            {/* Note input */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                Note for {owner.name} (Event / Fit question)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Need this for placement interview! Can we meet at 4pm?"
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
              />
            </div>

            {/* Escrow Price Breakdown Card */}
            <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl p-3.5 sm:p-4 border border-zinc-200/80 dark:border-zinc-700/80 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Rental Fee (₹{dailyRate} × {rentalDays} {rentalDays === 1 ? 'day' : 'days'})</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">₹{totalDailyCost}</span>
              </div>

              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                  <Lock className="w-3.5 h-3.5" />
                  Refundable Security Deposit
                </span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">₹{deposit}</span>
              </div>

              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>UVCE Platform Fee</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹0 (Free for UVCE)</span>
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">Total Upfront</span>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    (₹{deposit} deposit refunded on safe return)
                  </p>
                </div>
                <span className="text-xl font-black text-zinc-900 dark:text-zinc-100">₹{totalDue}</span>
              </div>
            </div>

            {/* Security Escrow Notice */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 text-[11px] text-blue-900 dark:text-blue-200">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>
                <strong>UVCE Escrow:</strong> Deposit locked until return is confirmed by both.
              </span>
            </div>

            {/* Booking CTA Button (Large 48px tap target) */}
            {isOwner ? (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-center text-xs text-amber-800 dark:text-amber-300 font-medium">
                You listed this item in your closet. You can manage it from your dashboard.
              </div>
            ) : (
              <button
                onClick={handleBook}
                disabled={isSubmitting}
                className="w-full min-h-[48px] py-3 px-4 bg-zinc-950 dark:bg-lime-400 hover:bg-black dark:hover:bg-lime-300 text-white dark:text-zinc-950 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl shadow-zinc-950/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-lime-400 dark:text-zinc-950" />
                Request to Rent (₹{totalDue})
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Past Peer Reviews Section */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 sm:pt-5 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
              <span>Verified Peer Reviews ({detailItem.reviews ? detailItem.reviews.length : 0})</span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                ★ {detailItem.ownerRating}
              </span>
            </h3>

            {detailItem.reviews && detailItem.reviews.length > 0 ? (
              <div className="space-y-2.5">
                {detailItem.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {rev.renterAvatar && (
                          <img src={rev.renterAvatar} alt={rev.renterName} className="w-5 h-5 rounded-full object-cover shrink-0" />
                        )}
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{rev.renterName}</span>
                      </div>
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500 mr-1" />
                        <span>{rev.rating}.0</span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal ml-2">{rev.date}</span>
                      </div>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{rev.comment}</p>

                    {rev.tags && rev.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {rev.tags.map((t, idx) => (
                          <span key={idx} className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
                No past reviews yet. Be the first student on campus to rent this piece!
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
