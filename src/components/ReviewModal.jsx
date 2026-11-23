import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  ThumbsUp, 
  Shirt, 
  UserCheck, 
  Send 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const RENTER_TAGS = [
  "True to size",
  "Freshly cleaned",
  "Easy handoff",
  "Steamed & ready",
  "Saved my formal",
  "Super friendly",
  "Great fabric",
  "Included hanger"
];

const LENDER_TAGS = [
  "Returned spotless",
  "On-time pickup",
  "On-time return",
  "Respectful of item",
  "Great communication",
  "5-star borrower",
  "Careful with garment"
];

export default function ReviewModal() {
  const { 
    activeReviewRental, 
    setActiveReviewRental, 
    currentUser, 
    submitReview 
  } = useApp();

  const [score1, setScore1] = useState(5);
  const [score2, setScore2] = useState(5);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeReviewRental) return null;

  const { rental, role } = activeReviewRental; // role: 'renter' | 'lender'
  const isRenter = role === 'renter';

  const targetName = isRenter ? rental.lenderName : rental.renterName;
  const targetAvatar = isRenter ? rental.lenderAvatar : rental.renterAvatar;
  const targetUserId = isRenter ? rental.lenderId : rental.renterId;

  const tagsList = isRenter ? RENTER_TAGS : LENDER_TAGS;

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    submitReview({
      rentalId: rental.id,
      role,
      itemId: rental.itemId,
      targetUserId,
      ratings: {
        score1,
        score2
      },
      tags: selectedTags,
      comment: comment.trim() || (isRenter ? 'Great outfit, exactly as described!' : 'Returned on time and in great condition!')
    });

    setIsSubmitting(false);
    setActiveReviewRental(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] sm:text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified UVCE Peer Review
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              {isRenter ? 'Review Garment & Lender' : 'Review Student Borrower'}
            </h2>
          </div>
          <button
            onClick={() => setActiveReviewRental(null)}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
            aria-label="Close review modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto">
          
          {/* Target Profile Snippet */}
          <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80">
            <img
              src={targetAvatar}
              alt={targetName}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {isRenter ? `Reviewing ${targetName} for:` : `Reviewing ${targetName} (Borrower)`}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate">
                {rental.itemTitle}
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                Rental Period: {rental.startDate} → {rental.endDate}
              </p>
            </div>
          </div>

          {/* Rating Criterion 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {isRenter ? '1. Garment Condition & Fit Accuracy' : '1. Garment Care & Cleanliness'}
              </label>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">★ {score1}.0</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setScore1(star)}
                  className="p-1 min-h-[36px] min-w-[36px] flex items-center justify-center focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= score1
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-zinc-200 dark:text-zinc-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {isRenter
                ? 'Did the item match the photos and arrive clean & ready to wear?'
                : 'Was the garment treated with care and returned spotless?'}
            </p>
          </div>

          {/* Rating Criterion 2 */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {isRenter ? '2. Lender Communication & Punctuality' : '2. Borrower Punctuality & Communication'}
              </label>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">★ {score2}.0</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setScore2(star)}
                  className="p-1 min-h-[36px] min-w-[36px] flex items-center justify-center focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= score2
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-zinc-200 dark:text-zinc-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {isRenter
                ? 'Was pickup and return smooth, on time, and friendly at UVCE?'
                : 'Did the student show up on time for handoff and return?'}
            </p>
          </div>

          {/* Quick-Select Tags */}
          <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Quick Highlights (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tagsList.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`min-h-[36px] px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300 dark:ring-blue-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline mr-1 stroke-[3]" />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Written Feedback Textarea */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Peer Comment (Visible on profile & item card)
            </label>
            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                isRenter
                  ? "Describe fit, fabric quality, and your experience with the lender..."
                  : "How was the borrower during the handoff and return?"
              }
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Sticky Bottom Submit Button */}
          <div className="pt-2 sticky bottom-0 bg-white dark:bg-zinc-900 py-2 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3.5 px-4 bg-zinc-950 dark:bg-lime-400 hover:bg-black dark:hover:bg-lime-300 text-white dark:text-zinc-950 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-zinc-950/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-lime-400 dark:text-zinc-950" />
              Submit Verified Review & Update Ratings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
