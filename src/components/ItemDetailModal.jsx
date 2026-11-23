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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setDetailItem(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/60 hover:bg-zinc-900 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Gallery */}
        <div className="md:w-1/2 bg-zinc-900 flex flex-col">
          <div className="relative aspect-[4/5] md:h-full w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
            <img
              src={detailItem.images[selectedPhotoIndex] || detailItem.images[0]}
              alt={detailItem.title}
              className="w-full h-full object-cover"
            />

            {/* Size & Category Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-white/95 backdrop-blur-md text-zinc-900 text-xs font-black px-3 py-1 rounded-full shadow-md">
                Size {detailItem.size}
              </span>
              <span className="bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
                {detailItem.category}
              </span>
            </div>

            {/* Price Chip */}
            <div className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-2xl border border-white/20 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-lime-400">₹{detailItem.dailyPrice}</span>
              <span className="text-xs text-zinc-300 font-semibold">/ day</span>
            </div>
          </div>

          {/* Multiple Image Selector thumbnails if available */}
          {detailItem.images.length > 1 && (
            <div className="p-3 bg-zinc-950/90 flex gap-2 overflow-x-auto border-t border-zinc-800">
              {detailItem.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
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
        <div className="md:w-1/2 flex flex-col p-6 overflow-y-auto max-h-[85vh] md:max-h-[92vh] space-y-6">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <span>{detailItem.category}</span>
              <span>•</span>
              <span className="text-zinc-500 font-medium">{detailItem.rentalsCount || 0} campus rentals completed</span>
            </div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight leading-snug">
              {detailItem.title}
            </h2>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
              {detailItem.description}
            </p>
          </div>

          {/* Condition & Pickup Badges */}
          <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-start gap-2 text-xs text-zinc-700">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-900">Garment Condition:</strong> {detailItem.conditionNotes}
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-zinc-700">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-900">Campus Pickup Spot:</strong> {detailItem.pickupLocation}
              </div>
            </div>
          </div>

          {/* Owner Student Profile Card */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-600/30"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-zinc-900">{owner.name}</h4>
                  <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                    <ShieldCheck className="w-3 h-3" />
                    Verified UVCE .AC.IN
                  </span>
                </div>
                <p className="text-xs text-zinc-500">{owner.dorm}</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-amber-700 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{owner.rating}</span>
                  <span className="text-zinc-400 font-normal">
                    ({owner.totalReviews} peer reviews)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setViewingProfileUser(owner)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 p-2 rounded-xl hover:bg-blue-50 flex items-center gap-1 transition-colors"
            >
              Profile
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Booking & Price Calculator Section */}
          <div className="border-t border-zinc-200 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                Select Rental Dates
              </h3>
              <span className="text-xs font-semibold text-zinc-500">
                {rentalDays} {rentalDays === 1 ? 'day' : 'days'} selected
              </span>
            </div>

            {/* Date Picker Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={todayStr}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-zinc-50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || todayStr}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-zinc-50"
                />
              </div>
            </div>

            {/* Optional message to lender */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-500 mb-1">
                Note for {owner.name} (Event / Fit question)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Need this for Friday senior formal! Can we meet at 4pm?"
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Escrow Price Breakdown Card */}
            <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Rental Fee (₹{dailyRate} × {rentalDays} {rentalDays === 1 ? 'day' : 'days'})</span>
                <span className="font-semibold text-zinc-900">₹{totalDailyCost}</span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Refundable Security Deposit
                </span>
                <span className="font-semibold text-emerald-700">₹{deposit}</span>
              </div>

              <div className="flex justify-between text-zinc-600">
                <span>UVCE Student Platform Fee</span>
                <span className="font-bold text-emerald-600">₹0 (Free for UVCE students)</span>
              </div>

              <div className="pt-2 border-t border-zinc-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-black text-zinc-900">Total Upfront</span>
                  <p className="text-[10px] text-zinc-500">
                    (₹{deposit} deposit refunded automatically when item is returned)
                  </p>
                </div>
                <span className="text-xl font-black text-zinc-900">₹{totalDue}</span>
              </div>
            </div>

            {/* Security Escrow Notice */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>UVCE Escrow Protection:</strong> Funds are locked safely until both you and {owner.name} confirm the return.
              </span>
            </div>

            {/* Booking CTA Button */}
            {isOwner ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center text-xs text-amber-800 font-medium">
                You listed this item in your closet. You can manage or delete it in your dashboard.
              </div>
            ) : (
              <button
                onClick={handleBook}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-zinc-950 hover:bg-black text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-zinc-950/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-lime-400" />
                Request to Rent (₹{totalDue})
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Past Peer Reviews Section */}
          <div className="border-t border-zinc-200 pt-5 space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center justify-between">
              <span>Verified Peer Reviews ({detailItem.reviews ? detailItem.reviews.length : 0})</span>
              <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
                ★ {detailItem.ownerRating} overall
              </span>
            </h3>

            {detailItem.reviews && detailItem.reviews.length > 0 ? (
              <div className="space-y-3">
                {detailItem.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {rev.renterAvatar && (
                          <img src={rev.renterAvatar} alt={rev.renterName} className="w-5 h-5 rounded-full object-cover" />
                        )}
                        <span className="font-bold text-zinc-900">{rev.renterName}</span>
                      </div>
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500 mr-1" />
                        <span>{rev.rating}.0</span>
                        <span className="text-[10px] text-zinc-400 font-normal ml-2">{rev.date}</span>
                      </div>
                    </div>

                    <p className="text-zinc-600 leading-relaxed">{rev.comment}</p>

                    {rev.tags && rev.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {rev.tags.map((t, idx) => (
                          <span key={idx} className="bg-white border border-zinc-200 text-zinc-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">
                No past reviews yet. Be the first student on campus to rent this piece!
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
