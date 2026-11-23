import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_USERS, INITIAL_ITEMS, INITIAL_RENTALS } from '../data/initialData';

const AppContext = createContext();

export const STORAGE_KEYS = {
  USERS: 'uvce_campus_closet_users_v2',
  ITEMS: 'uvce_campus_closet_items_v2',
  RENTALS: 'uvce_campus_closet_rentals_v2',
  CURRENT_USER_ID: 'uvce_campus_closet_current_user_id_v2'
};

export function AppProvider({ children }) {
  // 1. Initialize Users
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // 2. Current User
  const [currentUserId, setCurrentUserId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      return saved || INITIAL_USERS[0].id; // Defaults to Maya Sharma
    } catch {
      return INITIAL_USERS[0].id;
    }
  });

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // 3. Initialize Items
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ITEMS);
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  // 4. Initialize Rentals
  const [rentals, setRentals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RENTALS);
      return saved ? JSON.parse(saved) : INITIAL_RENTALS;
    } catch {
      return INITIAL_RENTALS;
    }
  });

  // UI state
  const [currentView, setCurrentView] = useState('marketplace'); // 'marketplace' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('rentals'); // 'closet' | 'rentals' | 'lending'
  
  // Search and Filter states (INR)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000); // INR max price
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('trending'); // 'trending', 'price_asc', 'price_desc', 'rating'

  // Active Modals
  const [detailItem, setDetailItem] = useState(null);
  const [isListItemOpen, setIsListItemOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeChatRentalId, setActiveChatRentalId] = useState(null);
  const [activeReviewRental, setActiveReviewRental] = useState(null); // { rental, role: 'renter' | 'lender' }
  const [viewingProfileUser, setViewingProfileUser] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RENTALS, JSON.stringify(rentals));
  }, [rentals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  // Actions
  const switchUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUserId(userId);
      showToast(`Switched profile to ${user.name} (${user.dorm.split(',')[0]})`, 'success');
    }
  };

  const loginWithEdu = (eduEmail, name, major, campus, dorm) => {
    const existing = users.find(u => u.email.toLowerCase() === eduEmail.toLowerCase());
    if (existing) {
      setCurrentUserId(existing.id);
      showToast(`Welcome back, ${existing.name}! Verified UVCE student login active.`, 'success');
      return existing;
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name || eduEmail.split('@')[0],
      handle: `@${eduEmail.split('@')[0]}`,
      email: eduEmail,
      campus: campus || 'UVCE Bengaluru',
      dorm: dorm || 'UVCE Hostels, KR Circle',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80`,
      verifiedEdu: true,
      rating: 5.0,
      totalReviews: 1,
      completedRentals: 0,
      major: major || 'Engineering Student',
      bio: 'New verified student at UVCE on CampusCloset. Excited to share and rent wardrobe fits for fests and placement drives!',
      joinedDate: 'Nov 2026'
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    showToast(`Account verified with college email! Welcome to UVCE CampusCloset, ${newUser.name}!`, 'success');
    return newUser;
  };

  // Create new listing
  const createItem = (itemData) => {
    const newItem = {
      id: `item_${Date.now()}`,
      title: itemData.title,
      description: itemData.description,
      category: itemData.category,
      size: itemData.size,
      dailyPrice: Number(itemData.dailyPrice),
      securityDeposit: Number(itemData.securityDeposit),
      images: itemData.images && itemData.images.length > 0 ? itemData.images : [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
      ],
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerAvatar: currentUser.avatar,
      ownerCampus: currentUser.campus,
      ownerDorm: currentUser.dorm,
      ownerRating: currentUser.rating,
      ownerReviewCount: currentUser.totalReviews,
      pickupLocation: itemData.pickupLocation || `${currentUser.dorm} Gate`,
      conditionNotes: itemData.conditionNotes || 'Clean and ready to wear',
      isAvailable: true,
      rentalsCount: 0,
      reviews: []
    };

    setItems(prev => [newItem, ...prev]);
    showToast(`"${newItem.title}" is now live in your UVCE campus closet!`, 'success');
    return newItem;
  };

  // Delete listing
  const deleteItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    showToast('Listing removed from your wardrobe.', 'info');
  };

  // Request to rent item (in INR)
  const bookRental = ({ itemId, startDate, endDate, totalDays, pickupLocation, note }) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const totalDailyCost = item.dailyPrice * totalDays;
    const totalCost = totalDailyCost + item.securityDeposit;

    const newRental = {
      id: `rent_${Date.now()}`,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.images[0],
      itemSize: item.size,
      dailyPrice: item.dailyPrice,
      securityDeposit: item.securityDeposit,
      renterId: currentUser.id,
      renterName: currentUser.name,
      renterAvatar: currentUser.avatar,
      lenderId: item.ownerId,
      lenderName: item.ownerName,
      lenderAvatar: item.ownerAvatar,
      startDate,
      endDate,
      totalDays,
      totalDailyCost,
      totalCost,
      status: 'pending', // Pending Approval
      escrowStatus: 'held',
      pickupLocation: pickupLocation || item.pickupLocation,
      handoffTime: 'To be coordinated in chat',
      renterReviewed: false,
      lenderReviewed: false,
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_${Date.now()}_1`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: note || `Hi ${item.ownerName}! I'd love to rent your ${item.title} for ${totalDays} days (${startDate} to ${endDate}). Safe campus pickup at ${pickupLocation || item.pickupLocation}!`,
          timestamp: 'Just now'
        },
        {
          id: `msg_${Date.now()}_2`,
          senderId: 'system',
          senderName: 'Campus Escrow Bot',
          text: `Booking request created. Security deposit (₹${item.securityDeposit}) and rental fee (₹${totalDailyCost}) locked in student escrow protection.`,
          timestamp: 'Just now',
          isSystem: true
        }
      ]
    };

    setRentals(prev => [newRental, ...prev]);
    showToast('Rental request submitted! Security deposit secured in escrow.', 'success');
    return newRental;
  };

  // Progress rental status
  const updateRentalStatus = (rentalId, nextStatus) => {
    setRentals(prev => prev.map(rental => {
      if (rental.id !== rentalId) return rental;

      let escrowStatus = rental.escrowStatus;
      let systemNote = '';

      if (nextStatus === 'approved') {
        systemNote = `Rental approved by lender! Please coordinate pickup time and exact spot in chat.`;
      } else if (nextStatus === 'active') {
        systemNote = `Garment handoff confirmed on UVCE campus. Active rental period started!`;
      } else if (nextStatus === 'returned') {
        escrowStatus = 'refunded';
        systemNote = `Garment returned safely! ₹${rental.securityDeposit} security deposit released back to ${rental.renterName}. Two-way reviews unlocked!`;
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }

      const updatedMessages = [
        ...rental.messages,
        {
          id: `msg_${Date.now()}`,
          senderId: 'system',
          senderName: 'Campus Escrow',
          text: systemNote,
          timestamp: 'Just now',
          isSystem: true
        }
      ];

      return {
        ...rental,
        status: nextStatus,
        escrowStatus,
        messages: updatedMessages
      };
    }));

    showToast(`Rental status updated to "${nextStatus.replace('_', ' ').toUpperCase()}".`, 'success');
  };

  // Send message in rental chat
  const sendChatMessage = (rentalId, text) => {
    if (!text.trim()) return;

    setRentals(prev => prev.map(rental => {
      if (rental.id !== rentalId) return rental;

      const newMsg = {
        id: `msg_${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: text.trim(),
        timestamp: 'Just now'
      };

      return {
        ...rental,
        messages: [...rental.messages, newMsg]
      };
    }));
  };

  // Submit two-way review and recalculate ratings
  const submitReview = ({ rentalId, role, itemId, targetUserId, ratings, tags, comment }) => {
    // 1. Mark rental as reviewed
    setRentals(prevRentals => prevRentals.map(r => {
      if (r.id !== rentalId) return r;
      return {
        ...r,
        renterReviewed: role === 'renter' ? true : r.renterReviewed,
        lenderReviewed: role === 'lender' ? true : r.lenderReviewed
      };
    }));

    const overallRating = Number(
      ((ratings.score1 + ratings.score2) / 2).toFixed(1)
    );

    // 2. If Renter reviewed item/lender, add to item's reviews array
    if (role === 'renter') {
      setItems(prevItems => prevItems.map(item => {
        if (item.id !== itemId) return item;

        const newReview = {
          id: `rev_${Date.now()}`,
          renterName: currentUser.name,
          renterAvatar: currentUser.avatar,
          rating: overallRating,
          date: 'Just now',
          comment,
          tags
        };

        const updatedReviews = [newReview, ...item.reviews];
        const newAvg = Number(
          (updatedReviews.reduce((sum, rev) => sum + rev.rating, 0) / updatedReviews.length).toFixed(2)
        );

        return {
          ...item,
          reviews: updatedReviews,
          ownerRating: newAvg,
          ownerReviewCount: (item.ownerReviewCount || 0) + 1
        };
      }));
    }

    // 3. Recalculate target user's profile rating and reviews
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id !== targetUserId) return user;

      const newTotalReviews = (user.totalReviews || 0) + 1;
      const currentRating = user.rating || 5.0;
      // Weighted average calculation
      const recalculatedRating = Number(
        (((currentRating * (user.totalReviews || 1)) + overallRating) / newTotalReviews).toFixed(2)
      );

      return {
        ...user,
        rating: Math.min(5.0, recalculatedRating),
        totalReviews: newTotalReviews,
        completedRentals: (user.completedRentals || 0) + 1
      };
    }));

    showToast('Review and verified peer badge submitted successfully!', 'success');
  };

  // Reset demo data
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.ITEMS);
    localStorage.removeItem(STORAGE_KEYS.RENTALS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    setUsers(INITIAL_USERS);
    setItems(INITIAL_ITEMS);
    setRentals(INITIAL_RENTALS);
    setCurrentUserId(INITIAL_USERS[0].id);
    setMaxPrice(1000);
    showToast('Application reset to UVCE campus demo data.', 'info');
  };

  // Computed lists
  const activeChatRental = rentals.find(r => r.id === activeChatRentalId);

  // Filtered Items for Marketplace
  const filteredItems = items.filter(item => {
    // Category match
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    // Size match
    if (selectedSize !== 'All' && item.size !== selectedSize) {
      return false;
    }
    // Price match (INR)
    if (item.dailyPrice > maxPrice) {
      return false;
    }
    // Rating match
    if (minRating > 0 && item.ownerRating < minRating) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchOwner = item.ownerName.toLowerCase().includes(q);
      const matchDorm = (item.ownerDorm || '').toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchOwner && !matchDorm && !matchCategory) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.dailyPrice - b.dailyPrice;
    if (sortBy === 'price_desc') return b.dailyPrice - a.dailyPrice;
    if (sortBy === 'rating') return b.ownerRating - a.ownerRating;
    return (b.rentalsCount || 0) - (a.rentalsCount || 0); // trending
  });

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        currentUserId,
        switchUser,
        loginWithEdu,
        items,
        filteredItems,
        createItem,
        deleteItem,
        rentals,
        bookRental,
        updateRentalStatus,
        sendChatMessage,
        submitReview,
        resetDemoData,

        // UI navigation
        currentView,
        setCurrentView,
        dashboardTab,
        setDashboardTab,

        // Filters
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSize,
        setSelectedSize,
        maxPrice,
        setMaxPrice,
        minRating,
        setMinRating,
        sortBy,
        setSortBy,

        // Modals
        detailItem,
        setDetailItem,
        isListItemOpen,
        setIsListItemOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        activeChatRentalId,
        setActiveChatRentalId,
        activeChatRental,
        activeReviewRental,
        setActiveReviewRental,
        viewingProfileUser,
        setViewingProfileUser,

        // Toasts
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
