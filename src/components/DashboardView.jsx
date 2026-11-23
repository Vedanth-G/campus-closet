import React from 'react';
import { 
  Shirt, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  PlusCircle, 
  Trash2, 
  Lock, 
  ArrowRight, 
  Check, 
  AlertCircle,
  Sparkles,
  MapPin,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DashboardView() {
  const { 
    currentUser, 
    dashboardTab, 
    setDashboardTab, 
    items, 
    rentals, 
    deleteItem, 
    setIsListItemOpen,
    setActiveChatRentalId,
    setActiveReviewRental,
    updateRentalStatus,
    setDetailItem,
    setViewingProfileUser
  } = useApp();

  // 1. My Closet Items
  const myClosetItems = items.filter(i => i.ownerId === currentUser.id);

  // 2. Active Rentals (Items I am renting)
  const myBorrowings = rentals.filter(r => r.renterId === currentUser.id);

  // 3. Lending Requests (Items others want to rent from me)
  const myLendingRequests = rentals.filter(r => r.lenderId === currentUser.id);

  // Stats calculation
  const totalEarned = myLendingRequests
    .filter(r => r.status === 'active' || r.status === 'returned')
    .reduce((sum, r) => sum + r.totalDailyCost, 0);

  const activeRentalsCount = myBorrowings.filter(r => r.status !== 'returned').length;
  const pendingRequestsCount = myLendingRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      
      {/* Student Profile Header Card (Responsive on 360px-430px) */}
      <section className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          
          <div className="flex items-center gap-3.5 sm:gap-4 w-full md:w-auto">
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-zinc-100 dark:border-zinc-800 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-zinc-900 shadow" title="Verified UVCE Student">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                  {currentUser.name}
                </h1>
                <span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900 flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                  Verified UVCE
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 truncate">
                {currentUser.major} • {currentUser.dorm.split(',')[0]}
              </p>
              <div className="flex items-center gap-2 sm:gap-3 mt-1.5 text-xs font-semibold flex-wrap">
                <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-900/60 text-[11px] sm:text-xs">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-500" />
                  {currentUser.rating} ({currentUser.totalReviews})
                </span>
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-xs">
                  {currentUser.completedRentals} exchanges
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics (2-column grid on mobile, row on desktop) */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:gap-3 w-full md:w-auto">
            <div className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl p-2.5 sm:p-3 text-center sm:min-w-[110px]">
              <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">₹{totalEarned}</span>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500">Total Earned</p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl p-2.5 sm:p-3 text-center sm:min-w-[110px]">
              <span className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100">{myClosetItems.length}</span>
              <p className="text-[9px] sm:text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500">Listed Pieces</p>
            </div>

            <button
              onClick={() => setIsListItemOpen(true)}
              className="col-span-2 sm:col-span-1 min-h-[42px] flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              List Garment
            </button>
          </div>

        </div>
      </section>

      {/* Tabs Navigation (Horizontally scrollable on mobile) */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 overflow-x-auto scrollbar-none -mx-1 px-1">
        <button
          onClick={() => setDashboardTab('rentals')}
          className={`min-h-[42px] flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            dashboardTab === 'rentals'
              ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-md'
              : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <ShoppingBag className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          Active Rentals (Borrowing)
          {activeRentalsCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-500 text-white text-[10px]">
              {activeRentalsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setDashboardTab('lending')}
          className={`min-h-[42px] flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            dashboardTab === 'lending'
              ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-md'
              : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          Lending Requests (My Pieces)
          {pendingRequestsCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">
              {pendingRequestsCount} new
            </span>
          )}
        </button>

        <button
          onClick={() => setDashboardTab('closet')}
          className={`min-h-[42px] flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
            dashboardTab === 'closet'
              ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-md'
              : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <Shirt className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          My Closet ({myClosetItems.length})
        </button>
      </div>

      {/* TAB 1: ACTIVE RENTALS (Items I'm renting) */}
      {dashboardTab === 'rentals' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-1">
            <p>Garments you have booked or are wearing for UVCE events.</p>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              Deposit held safely in campus escrow
            </span>
          </div>

          {myBorrowings.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {myBorrowings.map((rental) => {
                const isReturned = rental.status === 'returned';
                const isApproved = rental.status === 'approved';
                const isActive = rental.status === 'active';
                const isPending = rental.status === 'pending';

                return (
                  <div
                    key={rental.id}
                    className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5"
                  >
                    {/* Item info */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 w-full md:w-auto">
                      <img
                        src={rental.itemImage}
                        alt={rental.itemTitle}
                        className="w-16 h-20 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">
                            {rental.itemTitle}
                          </h3>
                          <span className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-md">
                            Size {rental.itemSize}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5 truncate">
                          <span>Lender: <strong className="text-zinc-700 dark:text-zinc-300">{rental.lenderName}</strong></span>
                          <span>•</span>
                          <span className="truncate">{rental.pickupLocation.split('/')[0]}</span>
                        </p>

                        <div className="flex items-center gap-2 sm:gap-3 mt-1.5 text-xs flex-wrap">
                          <span className="text-zinc-600 dark:text-zinc-400 font-medium text-[11px] sm:text-xs">
                            {rental.startDate} → {rental.endDate}
                          </span>
                          <span className="text-zinc-900 dark:text-zinc-100 font-bold text-[11px] sm:text-xs">
                            Paid: ₹{rental.totalDailyCost} (+₹{rental.securityDeposit} dep)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Simulated Flow Actions (Stacked/Wrapped for mobile) */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800">
                      
                      {/* Status pill */}
                      <div className="mr-auto sm:mr-1">
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold border border-amber-200 dark:border-amber-900">
                            ⏳ Pending Approval
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-900">
                            🤝 Approved (Meet)
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-900">
                            ✨ Active Rental
                          </span>
                        )}
                        {isReturned && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-[11px] font-bold border border-purple-200 dark:border-purple-900">
                            ✅ Returned & Released
                          </span>
                        )}
                      </div>

                      {/* Chat action button (Touch friendly) */}
                      <button
                        onClick={() => setActiveChatRentalId(rental.id)}
                        className="min-h-[38px] px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        Chat
                      </button>

                      {/* State transition triggers */}
                      {isApproved && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'active')}
                          className="min-h-[38px] px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Picked Up
                        </button>
                      )}

                      {isActive && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'returned')}
                          className="min-h-[38px] px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Return & Unlock Deposit
                        </button>
                      )}

                      {/* Two-Way Review button */}
                      {isReturned && (
                        rental.renterReviewed ? (
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                            <Check className="w-3 h-3" /> Reviewed
                          </span>
                        ) : (
                          <button
                            onClick={() => setActiveReviewRental({ rental, role: 'renter' })}
                            className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all animate-pulse"
                          >
                            <Star className="w-3.5 h-3.5 fill-white" />
                            Leave Review
                          </button>
                        )
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-3">
              <ShoppingBag className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto" />
              <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">No Active Rentals</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                Looking for an outfit for placement drives, farewell, or Milagro fest? Browse the UVCE feed!
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LENDING REQUESTS (Items others want to rent from me) */}
      {dashboardTab === 'lending' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-1">
            <p>Rental requests from UVCE classmates wanting to borrow pieces from your closet.</p>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">In-Person Campus Handoff</span>
          </div>

          {myLendingRequests.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {myLendingRequests.map((rental) => {
                const isPending = rental.status === 'pending';
                const isApproved = rental.status === 'approved';
                const isActive = rental.status === 'active';
                const isReturned = rental.status === 'returned';

                return (
                  <div
                    key={rental.id}
                    className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5"
                  >
                    {/* Item and Renter details */}
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 w-full md:w-auto">
                      <img
                        src={rental.itemImage}
                        alt={rental.itemTitle}
                        className="w-16 h-20 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">
                          {rental.itemTitle}
                        </h3>
                        
                        <div className="flex items-center gap-2 mt-1 truncate">
                          <img
                            src={rental.renterAvatar}
                            alt={rental.renterName}
                            className="w-5 h-5 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
                          />
                          <span className="text-xs text-zinc-700 dark:text-zinc-300 font-bold truncate">{rental.renterName}</span>
                          <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-semibold shrink-0">
                            UVCE Verified
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 mt-1.5 text-xs flex-wrap">
                          <span className="text-zinc-600 dark:text-zinc-400 font-medium text-[11px] sm:text-xs">
                            {rental.startDate} → {rental.endDate}
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] sm:text-xs">
                            Earnings: +₹{rental.totalDailyCost}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & simulated flow actions */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800">
                      
                      {/* Status indicator */}
                      <div className="mr-auto sm:mr-1">
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold border border-amber-200 dark:border-amber-900">
                            Pending Approval
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-900">
                            Approved (Awaiting Pickup)
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-900">
                            Garment Out
                          </span>
                        )}
                        {isReturned && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-[11px] font-bold border border-purple-200 dark:border-purple-900">
                            Returned & Settled
                          </span>
                        )}
                      </div>

                      {/* Chat action button */}
                      <button
                        onClick={() => setActiveChatRentalId(rental.id)}
                        className="min-h-[38px] px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        Chat
                      </button>

                      {/* Lender simulated actions */}
                      {isPending && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'approved')}
                          className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all"
                        >
                          Approve Request
                        </button>
                      )}

                      {isApproved && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'active')}
                          className="min-h-[38px] px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                        >
                          Handed to Student
                        </button>
                      )}

                      {isActive && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'returned')}
                          className="min-h-[38px] px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all"
                        >
                          Confirm Return & Release Deposit
                        </button>
                      )}

                      {/* Lender reviews borrower */}
                      {isReturned && (
                        rental.lenderReviewed ? (
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                            <Check className="w-3 h-3" /> Reviewed Borrower
                          </span>
                        ) : (
                          <button
                            onClick={() => setActiveReviewRental({ rental, role: 'lender' })}
                            className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all animate-pulse"
                          >
                            <Star className="w-3.5 h-3.5 fill-white" />
                            Review {rental.renterName.split(' ')[0]}
                          </button>
                        )
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-3">
              <Clock className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto" />
              <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">No Lending Requests Yet</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                When UVCE classmates request to borrow your clothes, requests will appear here for you to approve and coordinate handoff.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MY CLOSET (Items I have listed) */}
      {dashboardTab === 'closet' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <p>Garments you have made available for UVCE classmates to rent.</p>
            <button
              onClick={() => setIsListItemOpen(true)}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 min-h-[36px]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              List New Garment
            </button>
          </div>

          {myClosetItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {myClosetItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-900 dark:text-zinc-100 text-xs font-bold px-2 py-0.5 rounded-full">
                      Size {item.size}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-xl">
                      ₹{item.dailyPrice}/day
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 space-y-3">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                        {item.category} • {item.pickupLocation}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <span>Rentals done: <strong className="text-zinc-900 dark:text-zinc-100">{item.rentalsCount || 0}</strong></span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">★ {item.ownerRating}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setDetailItem(item)}
                        className="flex-1 min-h-[40px] py-2 text-xs font-bold text-center rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                      >
                        Preview Card
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        title="Delete listing"
                        className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors border border-rose-200 dark:border-rose-900"
                        aria-label="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-3">
              <Shirt className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto" />
              <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">Your Closet is Empty</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                Got suits, ethnic sets, winter coats, or fest wear sitting unworn in your hostel room? List them to earn cash!
              </p>
              <button
                onClick={() => setIsListItemOpen(true)}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                List Your First Item
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
