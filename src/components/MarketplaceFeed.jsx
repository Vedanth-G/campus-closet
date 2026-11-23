import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Filter, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Shirt,
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ItemCard from './ItemCard';

const CATEGORIES = [
  'All',
  'Formal',
  'Party',
  'Ethnic/Traditional',
  'Winterwear',
  'Accessories'
];

const SIZES = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function MarketplaceFeed() {
  const {
    filteredItems,
    items,
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
    setIsListItemOpen,
    currentUser
  } = useApp();

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSize('All');
    setMaxPrice(1000);
    setMinRating(0);
    setSortBy('trending');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedSize !== 'All' || maxPrice < 1000 || minRating > 0;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Gen-Z Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-lime-300 text-xs font-bold uppercase tracking-wider mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Zero Fast-Fashion Waste • College Escrow Protected
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Rent the fit. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-lime-300">
              Own the moment.
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg">
            Why spend ₹4,000+ on an outfit for college farewell, placement drives, Milagro fest, or traditional day? 
            Rent curated styles directly from your UVCE batchmates and hostelites.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsListItemOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-lime-400/20 active:scale-95 transition-all flex items-center gap-2"
            >
              List From Your Closet
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Campus Escrow Holds Deposits Safely</span>
            </div>
          </div>
        </div>

        {/* Floating Perks Badges */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-white font-bold">100% In-Person</p>
            <p className="text-zinc-400 text-[11px]">Pick up at campus quad & dining</p>
          </div>
          <div>
            <p className="text-white font-bold">Verified .EDU Only</p>
            <p className="text-zinc-400 text-[11px]">No strangers, just classmates</p>
          </div>
          <div>
            <p className="text-white font-bold">Automatic Escrow</p>
            <p className="text-zinc-400 text-[11px]">Deposit returned on handoff</p>
          </div>
          <div>
            <p className="text-white font-bold">Peer Reviews</p>
            <p className="text-zinc-400 text-[11px]">2-way ratings & fit feedback</p>
          </div>
        </div>
      </section>

      {/* Search & Filter Controls Panel */}
      <section className="space-y-4">
        {/* Search Bar + Sort row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-3 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by outfit name, brand, occasion, or dorm (e.g. 'Hugo Boss', 'formal', 'Roble')..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-zinc-200 rounded-2xl text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs text-zinc-400 hover:text-zinc-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-2 rounded-2xl shadow-sm text-xs font-medium text-zinc-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none font-bold text-zinc-900 focus:outline-none cursor-pointer"
              >
                <option value="trending">🔥 Most Rented / Trending</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">★ Highest Lender Rating</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-2xl border border-rose-200 transition-colors flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 shadow-sm'
                }`}
              >
                {cat === 'All' ? '✨ All Occasions' : cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Size + Price Range Slider + Rating Filter */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          {/* Size Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Size:
            </span>
            <div className="flex items-center gap-1">
              {SIZES.map(sz => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[32px] h-7 px-2 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Max Rate:
            </span>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1 accent-blue-600 cursor-pointer"
            />
            <span className="text-xs font-bold text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded-lg">
              ₹{maxPrice}/day
            </span>
          </div>

          {/* Min Rating */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Min Rating:
            </span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="text-xs font-bold bg-zinc-100 border-none rounded-lg px-2.5 py-1 text-zinc-800 focus:outline-none"
            >
              <option value="0">All Ratings</option>
              <option value="4.8">★ 4.8 & Above</option>
              <option value="4.9">★ 4.9 & Above</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
        <span>
          Showing <strong className="text-zinc-900">{filteredItems.length}</strong> available wardrobe items on campus
        </span>
        <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
          ● All Verified Students
        </span>
      </div>

      {/* Depop / Pinterest Responsive Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 p-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
            <Shirt className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-800">No items match your criteria</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try loosening your filters, adjusting the price slider, or searching for a different occasion like "formal", "dress", or "blazer".
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
