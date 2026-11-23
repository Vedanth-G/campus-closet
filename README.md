# UVCE CampusCloset (DormDrip) 👔👗

> **Peer-to-Peer Clothing Rental Marketplace Exclusively for UVCE College Students**  
> *Rent placement suits, fests outfits, traditional attire, and daily drip directly from campus hostel batchmates in Indian Rupees (INR - ₹).*

---

## 🌟 Key Features

- **🎓 UVCE Student Verification & Trust Badges**:
  - College email verification supporting `@uvce.ac.in`.
  - Hostel & campus assignment (*UVCE Boys Hostel KR Circle, UVCE Girls Hostel JB Campus, Century Hostel, Mechanical Block*).
  - 1-click Demo Student Switcher to test as both **Renter** and **Lender** (*Maya Sharma, Alex Varma, Sofia Fernandes, Devon D'Souza*).
- **🛍️ Depop/Pinterest-Style Marketplace Feed**:
  - Curated items with category pills (*Formal, Party, Ethnic/Traditional, Winterwear, Accessories*).
  - Size pills (*XS to XXL*), INR max price slider, and minimum star rating filters.
  - Search bar across outfits, occasions, brands, and hostels.
- **🔒 Campus Escrow Protection**:
  - Transparent pricing: `(Daily Rate × Days) + Refundable Security Deposit`.
  - Zero platform fees for UVCE students (`₹0`).
  - Safe simulated progression: `Pending Approval` → `Approved (Meet for Pickup)` → `Active Rental` → `Returned & Deposit Released`.
  - Celebratory confetti on safe return and deposit unlock.
- **💬 In-App Campus Chat / Handoff Coordinator**:
  - Slide-over chat drawer for active bookings.
  - 1-click college handoff chips (*"I'm outside UVCE Main Porch..."*, *"Can we meet at Central Library Courtyard?"*).
  - Automated Escrow Bot system messages.
- **⭐ Two-Way Verified Peer Review & Rating System**:
  - Renter rates Item Condition/Accuracy + Lender Communication.
  - Lender rates Item Care + Borrower Punctuality.
  - Quick highlight tags (*"True to size"*, *"Freshly cleaned"*, *"Easy handoff"*, *"Saved my formal"*).
  - Real-time recalculation of item ratings and student trust scores in localStorage.
- **📸 Wardrobe Listing Flow**:
  - Instant curated presets, direct image URL input, or local file preview.
  - Daily rate (₹), security deposit (₹), condition notes, and UVCE pickup spots.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React icons
- **State & Storage**: React Context API with LocalStorage persistence (schema ready for Supabase/Firebase)
- **Visuals**: Canvas Confetti, Google Fonts (*Plus Jakarta Sans*)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Running Locally

```bash
# 1. Clone repository
git clone https://github.com/Vedanth-G/campus-closet.git
cd campus-closet

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at: `http://127.0.0.1:5173/`

---

## 📜 License
MIT
