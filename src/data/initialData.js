// Mock Database & Initial Seed Data for CampusCloset / DormDrip @ UVCE
// Cost in Indian Rupees (INR - ₹)

export const INITIAL_USERS = [
  {
    id: "usr_maya",
    name: "Maya Sharma",
    handle: "@mayastyles",
    email: "maya.sharma@uvce.ac.in",
    campus: "UVCE Bengaluru",
    dorm: "UVCE Girls Hostel, JB Campus",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    verifiedEdu: true,
    rating: 4.95,
    totalReviews: 28,
    completedRentals: 34,
    major: "Computer Science & Engg '26",
    bio: "Obsessed with sustainable campus fashion & ethnic drops. All garments freshly dry-cleaned before handoff at KR Circle! 🌿✨",
    joinedDate: "Sept 2024"
  },
  {
    id: "usr_alex",
    name: "Alex Varma",
    handle: "@alex_v",
    email: "alex.varma@uvce.ac.in",
    campus: "UVCE Bengaluru",
    dorm: "UVCE Boys Hostel, KR Circle",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    verifiedEdu: true,
    rating: 4.88,
    totalReviews: 19,
    completedRentals: 21,
    major: "Information Science '25",
    bio: "Always got formal interview blazers and placement drive suits available for rent. Campus placement ready 👔💼",
    joinedDate: "Jan 2024"
  },
  {
    id: "usr_sofia",
    name: "Sofia Fernandes",
    handle: "@sofia_f",
    email: "s.fernandes@uvce.ac.in",
    campus: "UVCE Bengaluru",
    dorm: "Century Hostel, KR Circle",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    verifiedEdu: true,
    rating: 4.92,
    totalReviews: 15,
    completedRentals: 18,
    major: "Electronics & Communication '26",
    bio: "Renting out high-end cocktail dresses, college fest outfits, and formal interview sets. Treat items like your own! 💫",
    joinedDate: "Oct 2024"
  },
  {
    id: "usr_devon",
    name: "Devon D'Souza",
    handle: "@devon_vintage",
    email: "d.dsouza@uvce.ac.in",
    campus: "UVCE Bengaluru",
    dorm: "UVCE Mechanical Block",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    verifiedEdu: true,
    rating: 5.0,
    totalReviews: 12,
    completedRentals: 14,
    major: "Mechanical Engineering '27",
    bio: "Vintage jackets, warm winter wear, and college fest drip. Happy to meet up anywhere around UVCE Main Heritage Porch.",
    joinedDate: "Feb 2025"
  }
];

export const INITIAL_ITEMS = [
  {
    id: "item_1",
    title: "Hugo Boss Slim-Fit Tailored Navy Placement Blazer",
    description: "Flawless virgin wool blazer in deep navy. Crisp silhouette, sharp notch lapels, and interior pocket for resume copies. Perfect for UVCE placement drives, tech symposiums, mock interviews, or formal dinners.",
    category: "Formal",
    size: "M",
    dailyPrice: 349,
    securityDeposit: 700,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_alex",
    ownerName: "Alex Varma",
    ownerAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "UVCE Boys Hostel, KR Circle",
    ownerRating: 4.88,
    ownerReviewCount: 19,
    pickupLocation: "UVCE Main Heritage Porch / Quad",
    conditionNotes: "Like New • Professionally dry-cleaned after every wear • Includes hanger & suit cover",
    isAvailable: true,
    rentalsCount: 14,
    reviews: [
      {
        id: "rev_1_1",
        renterName: "Rohan Kulkarni",
        renterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "3 days ago",
        comment: "Fit like a charm for my placement interview! Alex even steamed it right before handing it off at the Main Porch. 10/10.",
        tags: ["True to size", "Freshly cleaned", "Easy handoff"]
      },
      {
        id: "rev_1_2",
        renterName: "Marcus Vance",
        renterAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Solid quality blazer. Looked sharp for Milagro fest coordination.",
        tags: ["Crisp fabric", "On-time pickup"]
      }
    ]
  },
  {
    id: "item_2",
    title: "Reformation Silk Emerald Backless Slip Dress",
    description: "Stunning 100% heavyweight silk charmeuse in jewel emerald. Features delicate criss-cross straps, low scoop back, and gentle bias cut. Ideal for college farewell, Milagro fest gala, award dinners, and branch parties.",
    category: "Party",
    size: "S",
    dailyPrice: 449,
    securityDeposit: 900,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_maya",
    ownerName: "Maya Sharma",
    ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "UVCE Girls Hostel, JB Campus",
    ownerRating: 4.95,
    ownerReviewCount: 28,
    pickupLocation: "Central Library Courtyard",
    conditionNotes: "Pristine condition • Only hand-washed with organic silk cleanser • Never pinned or altered",
    isAvailable: true,
    rentalsCount: 20,
    reviews: [
      {
        id: "rev_2_1",
        renterName: "Ananya Rao",
        renterAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "Last week",
        comment: "Received so many compliments at college farewell! Maya was super sweet and met me right outside Central Library.",
        tags: ["Saved my formal", "True to size", "Super friendly"]
      }
    ]
  },
  {
    id: "item_3",
    title: "Vintage 90s Distressed Heavyweight Leather Biker Jacket",
    description: "Authentic boxy moto jacket with silver YKK zippers, snapped lapels, and naturally aged patina. Thick genuine cowhide that feels invincible. Unmatched edge for weekend college bike trips, Nandi Hills rides, and concerts.",
    category: "Winterwear",
    size: "L",
    dailyPrice: 399,
    securityDeposit: 800,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_devon",
    ownerName: "Devon D'Souza",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "UVCE Mechanical Block",
    ownerRating: 5.0,
    ownerReviewCount: 12,
    pickupLocation: "UVCE Main Heritage Porch",
    conditionNotes: "Great vintage character • Conditioned with Lexol leather balm • All zippers glide smooth",
    isAvailable: true,
    rentalsCount: 11,
    reviews: [
      {
        id: "rev_3_1",
        renterName: "Varun Nair",
        renterAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "5 days ago",
        comment: "Best jacket on campus hands down. Wore it for early morning ride to Nandi Hills. Heavy and warm!",
        tags: ["True to size", "Easy handoff"]
      }
    ]
  },
  {
    id: "item_4",
    title: "Royal Midnight Blue Zari Embroidered Kurta & Dupatta Set",
    description: "Luxurious georgette silk straight kurta adorned with intricate antique gold zari and sequin embroidery along neckline and hem. Includes coordinating matching pants and airy chiffon dupatta. Ideal for Ethnic Day, Diwali Celebrations, or college cultural fests.",
    category: "Ethnic/Traditional",
    size: "M",
    dailyPrice: 499,
    securityDeposit: 800,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_maya",
    ownerName: "Maya Sharma",
    ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "UVCE Girls Hostel, JB Campus",
    ownerRating: 4.95,
    ownerReviewCount: 28,
    pickupLocation: "KR Circle Campus Gate",
    conditionNotes: "Flawless embroidery • Dry cleaned only • Breathable inner cotton lining",
    isAvailable: true,
    rentalsCount: 9,
    reviews: [
      {
        id: "rev_4_1",
        renterName: "Pooja Hegde",
        renterAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "Saved me from spending ₹4000+ on an outfit I’d only wear once for UVCE Ethnic Day. Maya is the best!",
        tags: ["Saved my formal", "True to size", "Freshly cleaned"]
      }
    ]
  },
  {
    id: "item_5",
    title: "The North Face 1996 Retro Nuptse 700-Fill Down Puffer",
    description: "The quintessential campus winter staple in matte black. Ultra-warm 700-fill certified goose down, stowable hood in collar, and durable water-repellent finish. Absolute lifesaver for winter trips to Coorg/Ooty or chilly Bengaluru morning commutes.",
    category: "Winterwear",
    size: "L",
    dailyPrice: 349,
    securityDeposit: 700,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_alex",
    ownerName: "Alex Varma",
    ownerAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "UVCE Boys Hostel, KR Circle",
    ownerRating: 4.88,
    ownerReviewCount: 19,
    pickupLocation: "Central Library Courtyard",
    conditionNotes: "Freshly laundered with Nikwax Down Wash • Super lofty and clean",
    isAvailable: true,
    rentalsCount: 16,
    reviews: [
      {
        id: "rev_5_1",
        renterName: "Aditya Murthy",
        renterAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Took it on a weekend trip to Chikmagalur. Insanely warm and returned in perfect condition.",
        tags: ["Freshly cleaned", "Easy handoff"]
      }
    ]
  },
  {
    id: "item_6",
    title: "Aritzia Babaton Tailored Wide-Leg Trouser & Vest Set",
    description: "Chic cream two-piece suiting set featuring tailored button-front vest and high-waisted pleated wide-leg trousers. Made with premium Japanese crepe that resists wrinkles. Elevated look for conference presentations, case study competitions, and college seminars.",
    category: "Formal",
    size: "S",
    dailyPrice: 399,
    securityDeposit: 750,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_sofia",
    ownerName: "Sofia Fernandes",
    ownerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "Century Hostel, KR Circle",
    ownerRating: 4.92,
    ownerReviewCount: 15,
    pickupLocation: "Civil/Mechanical Quadrangle",
    conditionNotes: "Like New • Crisp front creases intact • No snags or stains",
    isAvailable: true,
    rentalsCount: 8,
    reviews: [
      {
        id: "rev_6_1",
        renterName: "Kavya S.",
        renterAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "1 week ago",
        comment: "Looked so elegant for our national paper presentation! Sofia met me right at the quadrangle.",
        tags: ["True to size", "Steamed & ready", "Easy handoff"]
      }
    ]
  },
  {
    id: "item_7",
    title: "Jacquemus Le Bambino Structured Leather Shoulder Bag",
    description: "Iconic designer handbag in smooth butter calfskin with gold hardware logo and magnetic flap closure. Comes with removable shoulder strap. Adds instant high-fashion flair to farewell celebrations, brunch, and convocation day.",
    category: "Accessories",
    size: "XS",
    dailyPrice: 299,
    securityDeposit: 600,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_sofia",
    ownerName: "Sofia Fernandes",
    ownerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "Century Hostel, KR Circle",
    ownerRating: 4.92,
    ownerReviewCount: 15,
    pickupLocation: "KR Circle Campus Gate",
    conditionNotes: "Includes dust bag • Pristine corners • Please handle with care",
    isAvailable: true,
    rentalsCount: 12,
    reviews: [
      {
        id: "rev_7_1",
        renterName: "Divya N.",
        renterAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Felt so chic carrying this at the graduation afterparty! Exactly as shown.",
        tags: ["Super friendly", "Saved my formal"]
      }
    ]
  },
  {
    id: "item_8",
    title: "Stüssy 8-Ball Heavyweight Fleece Oversized Streetwear Hoodie",
    description: "Sold-out heavyweight cotton fleece hoodie in heather grey with iconic back 8-ball graphic and drawstring hood. Ultra-soft brushed interior with relaxed boxy drape. Supreme comfort for lab sessions or hostel chill vibes.",
    category: "Party",
    size: "XL",
    dailyPrice: 249,
    securityDeposit: 500,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_devon",
    ownerName: "Devon D'Souza",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "UVCE Mechanical Block",
    ownerRating: 5.0,
    ownerReviewCount: 12,
    pickupLocation: "UVCE Student Activity Centre",
    conditionNotes: "Clean and freshly washed • Zero pilling • Smoke-free hostel room",
    isAvailable: true,
    rentalsCount: 15,
    reviews: [
      {
        id: "rev_8_1",
        renterName: "Karthik Gowda",
        renterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "4 days ago",
        comment: "Super cozy fit! Devon dropped it off right between our DSP lab sessions.",
        tags: ["Freshly cleaned", "On-time pickup"]
      }
    ]
  },
  {
    id: "item_9",
    title: "House of CB Corset Draped Satin Evening Gown",
    description: "Sculpted boned bodice with romantic cowl neckline and dramatic side slit in rich champagne oyster satin. Perfect structure that holds you securely all evening. Ideal for UVCE Prom Night, Graduation Gala, and farewell party.",
    category: "Formal",
    size: "XS",
    dailyPrice: 549,
    securityDeposit: 1000,
    images: [
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
    ],
    ownerId: "usr_maya",
    ownerName: "Maya Sharma",
    ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    ownerCampus: "UVCE Bengaluru",
    ownerDorm: "UVCE Girls Hostel, JB Campus",
    ownerRating: 4.95,
    ownerReviewCount: 28,
    pickupLocation: "Central Library Courtyard",
    conditionNotes: "Worn once to Senior Farewell • Pristine hemline • Dry cleaned",
    isAvailable: true,
    rentalsCount: 7,
    reviews: [
      {
        id: "rev_9_1",
        renterName: "Deepa Bhat",
        renterAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "Fit like royalty! The boning is super flattering. Maya gave me fashion tape just in case.",
        tags: ["Saved my formal", "True to size", "Steamed & ready"]
      }
    ]
  }
];

export const INITIAL_RENTALS = [
  {
    id: "rent_101",
    itemId: "item_1",
    itemTitle: "Hugo Boss Slim-Fit Tailored Navy Placement Blazer",
    itemImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    itemSize: "M",
    dailyPrice: 349,
    securityDeposit: 700,
    renterId: "usr_maya", // Maya is renting from Alex
    renterName: "Maya Sharma",
    renterAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    lenderId: "usr_alex",
    lenderName: "Alex Varma",
    lenderAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    startDate: "2026-11-20",
    endDate: "2026-11-22",
    totalDays: 2,
    totalDailyCost: 698,
    totalCost: 1398,
    status: "returned", // Ready to be reviewed!
    escrowStatus: "refunded",
    pickupLocation: "UVCE Main Heritage Porch",
    handoffTime: "5:30 PM",
    renterReviewed: false,
    lenderReviewed: false,
    createdAt: "2026-11-19T14:20:00Z",
    messages: [
      {
        id: "msg_1",
        senderId: "usr_maya",
        senderName: "Maya Sharma",
        text: "Hey Alex! Need this blazer for my campus placement round on Friday. Can we meet at the Main Heritage Porch?",
        timestamp: "Nov 19, 2:25 PM"
      },
      {
        id: "msg_2",
        senderId: "usr_alex",
        senderName: "Alex Varma",
        text: "Hey Maya! Sure thing, I have it freshly steamed in a suit cover. See you by the porch steps at 5:30 PM!",
        timestamp: "Nov 19, 2:31 PM"
      },
      {
        id: "msg_3",
        senderId: "system",
        senderName: "Campus Escrow",
        text: "Security deposit of ₹700 held in campus escrow. Handoff confirmed at UVCE.",
        timestamp: "Nov 20, 5:35 PM",
        isSystem: true
      },
      {
        id: "msg_4",
        senderId: "system",
        senderName: "Campus Escrow",
        text: "Rental marked returned! ₹700 deposit refunded to Maya Sharma.",
        timestamp: "Nov 22, 6:00 PM",
        isSystem: true
      }
    ]
  },
  {
    id: "rent_102",
    itemId: "item_2",
    itemTitle: "Reformation Silk Emerald Backless Slip Dress",
    itemImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    itemSize: "S",
    dailyPrice: 449,
    securityDeposit: 900,
    renterId: "usr_sofia", // Sofia is renting from Maya
    renterName: "Sofia Fernandes",
    renterAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    lenderId: "usr_maya",
    lenderName: "Maya Sharma",
    lenderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    startDate: "2026-11-24",
    endDate: "2026-11-26",
    totalDays: 2,
    totalDailyCost: 898,
    totalCost: 1798,
    status: "approved", // Approved, meet for pickup!
    escrowStatus: "held",
    pickupLocation: "Central Library Courtyard",
    handoffTime: "4:00 PM Tomorrow",
    renterReviewed: false,
    lenderReviewed: false,
    createdAt: "2026-11-23T10:15:00Z",
    messages: [
      {
        id: "msg_201",
        senderId: "usr_sofia",
        senderName: "Sofia Fernandes",
        text: "Hi Maya! Renting this for the ECE branch farewell party! Can we meet at the Central Library Courtyard?",
        timestamp: "Today, 10:16 AM"
      },
      {
        id: "msg_202",
        senderId: "usr_maya",
        senderName: "Maya Sharma",
        text: "Approved! Yes 4:00 PM tomorrow works perfect. It's ready in the garment bag for you! ✨",
        timestamp: "Today, 10:22 AM"
      }
    ]
  },
  {
    id: "rent_103",
    itemId: "item_5",
    itemTitle: "The North Face 1996 Retro Nuptse 700-Fill Down Puffer",
    itemImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    itemSize: "L",
    dailyPrice: 349,
    securityDeposit: 700,
    renterId: "usr_alex", // Alex renting from Devon
    renterName: "Alex Varma",
    renterAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    lenderId: "usr_devon",
    lenderName: "Devon D'Souza",
    lenderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    startDate: "2026-11-23",
    endDate: "2026-11-25",
    totalDays: 2,
    totalDailyCost: 698,
    totalCost: 1398,
    status: "active", // Currently active rental
    escrowStatus: "held",
    pickupLocation: "Central Library Courtyard",
    handoffTime: "Picked up at 1:00 PM",
    renterReviewed: false,
    lenderReviewed: false,
    createdAt: "2026-11-22T18:00:00Z",
    messages: [
      {
        id: "msg_301",
        senderId: "usr_alex",
        senderName: "Alex Varma",
        text: "Thanks for the handoff Devon! Jacket is super warm for the Coorg trip.",
        timestamp: "Today, 1:05 PM"
      },
      {
        id: "msg_302",
        senderId: "usr_devon",
        senderName: "Devon D'Souza",
        text: "Have a blast bro! Just message me when you are back at KR Circle on Wednesday.",
        timestamp: "Today, 1:12 PM"
      }
    ]
  }
];

export const PRESET_IMAGE_OPTIONS = [
  {
    name: "Classic Charcoal Placement Blazer",
    url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    category: "Formal"
  },
  {
    name: "Satin Red Farewell Midi Dress",
    url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    category: "Party"
  },
  {
    name: "Traditional Floral Anarkali / Kurta Set",
    url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    category: "Ethnic/Traditional"
  },
  {
    name: "Oversized Vintage Leather Biker",
    url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80",
    category: "Winterwear"
  },
  {
    name: "Streetwear Boxy Graphic Hoodie",
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    category: "Party"
  },
  {
    name: "Gold Accent Quilted Chain Bag",
    url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    category: "Accessories"
  }
];

export const CAMPUS_LOCATIONS = [
  "UVCE Main Heritage Porch",
  "KR Circle Campus Main Gate",
  "Central Library Courtyard",
  "Civil/Mechanical Quadrangle",
  "UVCE Student Activity Centre (SAC)",
  "Sports Ground / Pavilion",
  "ECE & Telecom Quad",
  "UVCE Boys Hostel Gate (KR Circle)"
];
