import React from 'react';
import { Star, ShieldCheck, MapPin, Tag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ItemCard({ item }) {
  const { setDetailItem, setViewingProfileUser, users } = useApp();

  const owner = users.find(u => u.id === item.ownerId) || {
    id: item.ownerId,
    name: item.ownerName,
    avatar: item.ownerAvatar,
    campus: item.ownerCampus,
    dorm: item.ownerDorm,
    rating: item.ownerRating,
    totalReviews: item.ownerReviewCount,
    verifiedEdu: true
  };

  return (
    <div 
      onClick={() => setDetailItem(item)}
      className="group relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden shadow-sm hover:shadow-xl dark:hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={item.images[0]}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-zinc-100 text-[10px] sm:text-[11px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm border border-black/5 dark:border-white/10">
            Size {item.size}
          </span>
          <span className="bg-black/60 dark:bg-black/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
            {item.category}
          </span>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 text-white">
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white drop-shadow-sm">
              ₹{item.dailyPrice}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-zinc-200">
              /day
            </span>
            <span className="ml-auto text-[9px] sm:text-[10px] font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-400/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
              +₹{item.securityDeposit} deposit
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Location & Pickup info */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
          <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <span className="truncate">{item.pickupLocation.split('/')[0]}</span>
        </div>

        {/* Owner Bar */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setViewingProfileUser(owner);
          }}
          className="pt-2 sm:pt-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 -mx-1 px-1 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={item.ownerAvatar}
              alt={item.ownerName}
              className="w-6 h-6 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate flex items-center gap-1">
                <span className="truncate">{item.ownerName.split(' ')[0]}</span>
                <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                {item.ownerDorm ? item.ownerDorm.split(',')[0] : 'UVCE Hostel'}
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 px-1.5 sm:px-2 py-0.5 rounded-lg text-amber-900 dark:text-amber-300 text-[11px] sm:text-xs font-bold shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500 shrink-0" />
            <span>{item.ownerRating}</span>
            <span className="text-[9px] sm:text-[10px] text-amber-700/80 dark:text-amber-400/70 font-normal">
              ({item.reviews ? item.reviews.length : item.ownerReviewCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
