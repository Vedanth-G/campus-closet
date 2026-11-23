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
    <div className="space-y-8 pb-16">
      
      {/* Student Profile Header Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-zinc-100 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow" title="Verified Campus Student">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified UVCE Member
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">
                {currentUser.major} • {currentUser.dorm}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {currentUser.rating} ({currentUser.totalReviews} peer reviews)
                </span>
                <span className="text-zinc-500">
                  {currentUser.completedRentals} completed exchanges
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-initial bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-center min-w-[110px]">
              <span className="text-lg font-black text-emerald-600">₹{totalEarned}</span>
              <p className="text-[10px] uppercase font-bold text-zinc-400">Total Earned</p>
            </div>

            <div className="flex-1 md:flex-initial bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-center min-w-[110px]">
              <span className="text-lg font-black text-zinc-900">{myClosetItems.length}</span>
              <p className="text-[10px] uppercase font-bold text-zinc-400">Listed Pieces</p>
            </div>

            <button
              onClick={() => setIsListItemOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              List Item
            </button>
          </div>

        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <button
          onClick={() => setDashboardTab('rentals')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            dashboardTab === 'rentals'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Active Rentals (I'm Borrowing)
          {activeRentalsCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-500 text-white text-[10px]">
              {activeRentalsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setDashboardTab('lending')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            dashboardTab === 'lending'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          Lending Requests (My Pieces)
          {pendingRequestsCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px]">
              {pendingRequestsCount} new
            </span>
          )}
        </button>

        <button
          onClick={() => setDashboardTab('closet')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            dashboardTab === 'closet'
              ? 'bg-zinc-950 text-white shadow-md'
              : 'bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
          }`}
        >
          <Shirt className="w-4 h-4" />
          My Closet ({myClosetItems.length})
        </button>
      </div>

      {/* TAB 1: ACTIVE RENTALS (Items I'm renting) */}
      {dashboardTab === 'rentals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <p>Garments you have booked or are currently wearing for campus events.</p>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              Deposit held safely in campus escrow
            </span>
          </div>

          {myBorrowings.length > 0 ? (
            <div className="space-y-4">
              {myBorrowings.map((rental) => {
                const isReturned = rental.status === 'returned';
                const isApproved = rental.status === 'approved';
                const isActive = rental.status === 'active';
                const isPending = rental.status === 'pending';

                return (
                  <div
                    key={rental.id}
                    className="bg-white rounded-3xl border border-zinc-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    {/* Item info */}
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={rental.itemImage}
                        alt={rental.itemTitle}
                        className="w-16 h-20 rounded-2xl object-cover border border-zinc-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm text-zinc-900 truncate">
                            {rental.itemTitle}
                          </h3>
                          <span className="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md">
                            Size {rental.itemSize}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                          <span>Lender: <strong>{rental.lenderName}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-zinc-400" />
                            {rental.pickupLocation}
                          </span>
                        </p>

                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="text-zinc-600 font-medium">
                            {rental.startDate} → {rental.endDate} ({rental.totalDays} days)
                          </span>
                          <span className="text-zinc-900 font-bold">
                            Paid: ₹{rental.totalDailyCost} (+₹{rental.securityDeposit} deposit)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Simulated Flow Actions */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
                      
                      {/* Status pill */}
                      <div className="mr-2">
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                            ⏳ Pending Approval
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                            🤝 Approved (Meet for Pickup)
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                            ✨ Active Rental
                          </span>
                        )}
                        {isReturned && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200">
                            ✅ Returned & Escrow Released
                          </span>
                        )}
                      </div>

                      {/* Chat action button */}
                      <button
                        onClick={() => setActiveChatRentalId(rental.id)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        Chat & Coordinate
                      </button>

                      {/* State transition triggers */}
                      {isApproved && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'active')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Check className="w-4 h-4" />
                          Confirm Picked Up
                        </button>
                      )}

                      {isActive && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'returned')}
                          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Return & Release Deposit
                        </button>
                      )}

                      {/* Two-Way Review button unlocked once returned */}
                      {isReturned && (
                        rental.renterReviewed ? (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1 border border-emerald-200">
                            <Check className="w-3.5 h-3.5" /> Reviewed
                          </span>
                        ) : (
                          <button
                            onClick={() => setActiveReviewRental({ rental, role: 'renter' })}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all animate-pulse"
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
            <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 p-8 space-y-3">
              <ShoppingBag className="w-10 h-10 text-zinc-300 mx-auto" />
              <h3 className="font-bold text-zinc-800 text-sm">No Active Rentals</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Looking for an outfit for career fairs, formals, or weekend plans? Browse the campus feed!
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LENDING REQUESTS (Items others want to rent from me) */}
      {dashboardTab === 'lending' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <p>Rental requests from classmates wanting to borrow pieces from your wardrobe.</p>
            <span className="text-blue-600 font-semibold">100% In-Person Campus Handoff</span>
          </div>

          {myLendingRequests.length > 0 ? (
            <div className="space-y-4">
              {myLendingRequests.map((rental) => {
                const isPending = rental.status === 'pending';
                const isApproved = rental.status === 'approved';
                const isActive = rental.status === 'active';
                const isReturned = rental.status === 'returned';

                return (
                  <div
                    key={rental.id}
                    className="bg-white rounded-3xl border border-zinc-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                  >
                    {/* Item and Renter details */}
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={rental.itemImage}
                        alt={rental.itemTitle}
                        className="w-16 h-20 rounded-2xl object-cover border border-zinc-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-zinc-900 truncate">
                          {rental.itemTitle}
                        </h3>
                        
                        <div className="flex items-center gap-2 mt-1">
                          <img
                            src={rental.renterAvatar}
                            alt={rental.renterName}
                            className="w-5 h-5 rounded-full object-cover border border-zinc-200"
                          />
                          <span className="text-xs text-zinc-700 font-bold">{rental.renterName}</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-semibold">
                            UVCE Verified
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="text-zinc-600 font-medium">
                            {rental.startDate} → {rental.endDate} ({rental.totalDays} days)
                          </span>
                          <span className="text-emerald-600 font-bold">
                            Earnings: +₹{rental.totalDailyCost}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & simulated flow actions */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
                      
                      {/* Status indicator */}
                      <div>
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                            Action Required: Pending Approval
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                            Approved (Awaiting Pickup)
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                            Garment Out on Rental
                          </span>
                        )}
                        {isReturned && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200">
                            Garment Returned & Escrow Settled
                          </span>
                        )}
                      </div>

                      {/* Chat action button */}
                      <button
                        onClick={() => setActiveChatRentalId(rental.id)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        Chat with {rental.renterName.split(' ')[0]}
                      </button>

                      {/* Lender simulated actions */}
                      {isPending && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'approved')}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all"
                        >
                          Approve Request
                        </button>
                      )}

                      {isApproved && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'active')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                        >
                          Handed to Student
                        </button>
                      )}

                      {isActive && (
                        <button
                          onClick={() => updateRentalStatus(rental.id, 'returned')}
                          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all"
                        >
                          Confirm Return & Release Deposit
                        </button>
                      )}

                      {/* Lender reviews borrower */}
                      {isReturned && (
                        rental.lenderReviewed ? (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1 border border-emerald-200">
                            <Check className="w-3.5 h-3.5" /> Reviewed Borrower
                          </span>
                        ) : (
                          <button
                            onClick={() => setActiveReviewRental({ rental, role: 'lender' })}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all animate-pulse"
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
            <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 p-8 space-y-3">
              <Clock className="w-10 h-10 text-zinc-300 mx-auto" />
              <h3 className="font-bold text-zinc-800 text-sm">No Lending Requests Yet</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                When classmates request to borrow your listed clothes, their requests will appear here for you to approve and coordinate handoff.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MY CLOSET (Items I have listed) */}
      {dashboardTab === 'closet' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <p>Garments you have made available for classmates to rent.</p>
            <button
              onClick={() => setIsListItemOpen(true)}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              List New Garment
            </button>
          </div>

          {myClosetItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myClosetItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-zinc-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      Size {item.size}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-xl">
                      ₹{item.dailyPrice}/day
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                        {item.category} • {item.pickupLocation}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-600 pt-2 border-t border-zinc-100">
                      <span>Rentals completed: <strong>{item.rentalsCount || 0}</strong></span>
                      <span className="text-amber-600 font-bold">★ {item.ownerRating}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setDetailItem(item)}
                        className="flex-1 py-2 text-xs font-bold text-center rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors"
                      >
                        Preview Card
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        title="Delete listing"
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 p-8 space-y-3">
              <Shirt className="w-10 h-10 text-zinc-300 mx-auto" />
              <h3 className="font-bold text-zinc-800 text-sm">Your Closet is Empty</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Got dresses, blazers, winter jackets, or traditional outfits sitting unworn in your dorm closet? List them to earn rental cash!
              </p>
              <button
                onClick={() => setIsListItemOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
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
