import React from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  Shirt, 
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function UserProfileModal() {
  const { 
    viewingProfileUser, 
    setViewingProfileUser, 
    items, 
    setDetailItem 
  } = useApp();

  if (!viewingProfileUser) return null;

  const userItems = items.filter(item => item.ownerId === viewingProfileUser.id);

  // Aggregate all peer reviews received across items owned by this user
  const allReviews = userItems.reduce((acc, item) => {
    if (item.reviews) {
      item.reviews.forEach(rev => {
        acc.push({ ...rev, itemTitle: item.title, itemImage: item.images[0] });
      });
    }
    return acc;
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Card */}
        <div className="relative bg-gradient-to-r from-zinc-900 via-indigo-950 to-blue-900 p-6 text-white">
          <button
            onClick={() => setViewingProfileUser(null)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={viewingProfileUser.avatar}
                alt={viewingProfileUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-zinc-900" title="Verified Campus Student">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-black tracking-tight">{viewingProfileUser.name}</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified UVCE Student
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5 font-medium">
                {viewingProfileUser.major} • {viewingProfileUser.campus}
              </p>
              <p className="text-xs text-zinc-300 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                {viewingProfileUser.dorm}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-md">
              <div className="text-base font-black text-amber-300 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {viewingProfileUser.rating}
              </div>
              <p className="text-[10px] text-zinc-300 font-semibold uppercase">Overall Rating</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-md">
              <div className="text-base font-black text-white">
                {viewingProfileUser.completedRentals}
              </div>
              <p className="text-[10px] text-zinc-300 font-semibold uppercase">Rentals Done</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-2.5 backdrop-blur-md">
              <div className="text-base font-black text-lime-400">
                100%
              </div>
              <p className="text-[10px] text-zinc-300 font-semibold uppercase">Escrow Release</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
              About Student & Closet Style
            </h4>
            <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/80">
              {viewingProfileUser.bio || "Active campus closet member renting pieces for events, formals, and presentations."}
            </p>
          </div>

          {/* Wardrobe Items listed by this user */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                <Shirt className="w-3.5 h-3.5 text-blue-600" />
                Active Closet Pieces ({userItems.length})
              </h4>
            </div>

            {userItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {userItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setViewingProfileUser(null);
                      setDetailItem(item);
                    }}
                    className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="aspect-[4/5] bg-zinc-100 overflow-hidden relative">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                        {item.size}
                      </span>
                      <span className="absolute bottom-2 left-2 bg-zinc-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        ₹{item.dailyPrice}/d
                      </span>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-bold text-zinc-900 truncate">{item.title}</p>
                      <p className="text-[10px] text-zinc-500">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">No pieces currently listed by this student.</p>
            )}
          </div>

          {/* Peer Reviews on this User */}
          <div className="space-y-3 pt-2 border-t border-zinc-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center justify-between">
              <span>Peer Reviews & Ratings ({allReviews.length})</span>
              <span className="text-amber-600 font-bold text-xs">★ {viewingProfileUser.rating} avg</span>
            </h4>

            {allReviews.length > 0 ? (
              <div className="space-y-3">
                {allReviews.map((rev, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {rev.renterAvatar && (
                          <img src={rev.renterAvatar} alt={rev.renterName} className="w-5 h-5 rounded-full object-cover" />
                        )}
                        <span className="font-bold text-zinc-900">{rev.renterName}</span>
                        <span className="text-[10px] text-blue-600 font-medium">for {rev.itemTitle}</span>
                      </div>
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500 mr-1" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-zinc-600">{rev.comment}</p>
                    {rev.tags && (
                      <div className="flex flex-wrap gap-1">
                        {rev.tags.map((t, tidx) => (
                          <span key={tidx} className="text-[10px] font-medium bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">No reviews recorded yet for this student.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
