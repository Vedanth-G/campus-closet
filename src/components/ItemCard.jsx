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
      className="group relative bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
        <img
          src={item.images[0]}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-white/90 backdrop-blur-md text-zinc-900 text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
            Size {item.size}
          </span>
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
            {item.category}
          </span>
        </div>

        {/* Bottom Image Overlay Details */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black tracking-tight text-white drop-shadow-sm">
              ₹{item.dailyPrice}
            </span>
            <span className="text-xs font-semibold text-zinc-200">
              /day
            </span>
            <span className="ml-auto text-[10px] font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-400/40 px-2 py-0.5 rounded-full">
              +₹{item.securityDeposit} deposit
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-sm text-zinc-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-zinc-500 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Location & Pickup info */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="truncate">{item.pickupLocation.split('/')[0]}</span>
        </div>

        {/* Owner Bar */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setViewingProfileUser(owner);
          }}
          className="pt-2.5 border-t border-zinc-100 flex items-center justify-between hover:bg-zinc-50 -mx-1 px-1 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={item.ownerAvatar}
              alt={item.ownerName}
              className="w-6 h-6 rounded-full object-cover border border-zinc-200 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-800 truncate flex items-center gap-1">
                {item.ownerName}
                <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
              </p>
              <p className="text-[10px] text-zinc-400 truncate">
                {item.ownerDorm ? item.ownerDorm.split(',')[0] : 'Campus Hall'}
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg text-amber-900 text-xs font-bold shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
            <span>{item.ownerRating}</span>
            <span className="text-[10px] text-amber-700/80 font-normal">
              ({item.reviews ? item.reviews.length : item.ownerReviewCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
