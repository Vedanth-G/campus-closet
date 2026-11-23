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
    <div className="space-y-5 sm:space-y-8 pb-16">
      
      {/* Gen-Z Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-indigo-950 to-blue-950 dark:from-black dark:via-zinc-950 dark:to-indigo-950 text-white p-5 sm:p-10 shadow-2xl border border-white/5 dark:border-zinc-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md text-lime-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 border border-white/10">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
            <span>UVCE Wardrobe Exchange • Escrow Protected</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Rent the fit. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-lime-300">
              Own the moment.
            </span>
          </h1>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg">
            Why spend ₹4,000+ on an outfit for placement interviews, farewell, or Milagro fest? 
            Rent curated styles directly from your UVCE batchmates in Bengaluru.
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsListItemOpen(true)}
              className="min-h-[42px] px-4 sm:px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-lime-400/20 active:scale-95 transition-all flex items-center gap-2"
            >
              List From Your Closet
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-300 font-medium bg-white/10 dark:bg-white/5 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
              <span>Campus Escrow Holds Deposits Safely</span>
            </div>
          </div>
        </div>

        {/* Floating Perks Badges */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
          <div>
            <p className="text-white font-bold text-xs sm:text-sm">KR Circle & JB</p>
            <p className="text-zinc-400 text-[10px] sm:text-[11px]">Pick up at Heritage Porch & Library</p>
          </div>
          <div>
            <p className="text-white font-bold text-xs sm:text-sm">Verified UVCE Only</p>
            <p className="text-zinc-400 text-[10px] sm:text-[11px]">Classmates with @uvce.ac.in</p>
          </div>
          <div>
            <p className="text-white font-bold text-xs sm:text-sm">Automatic Escrow</p>
            <p className="text-zinc-400 text-[10px] sm:text-[11px]">Deposit returned on safe return</p>
          </div>
          <div>
            <p className="text-white font-bold text-xs sm:text-sm">Peer Reviews</p>
            <p className="text-zinc-400 text-[10px] sm:text-[11px]">2-way ratings & verified tags</p>
          </div>
        </div>
      </section>

      {/* Search & Filter Controls Panel */}
      <section className="space-y-3 sm:space-y-4">
        {/* Search Bar + Sort row */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-3 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by outfit name, brand, occasion, or hostel..."
              className="w-full pl-10 sm:pl-11 pr-14 sm:pr-16 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 font-bold px-1 py-0.5"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 sm:flex-initial flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 rounded-2xl shadow-sm text-xs font-medium text-zinc-700 dark:text-zinc-300 min-h-[44px]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="shrink-0 hidden xs:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer text-xs w-full sm:w-auto"
              >
                <option value="trending" className="dark:bg-zinc-900">🔥 Trending</option>
                <option value="price_asc" className="dark:bg-zinc-900">Price: Low to High</option>
                <option value="price_desc" className="dark:bg-zinc-900">Price: High to Low</option>
                <option value="rating" className="dark:bg-zinc-900">★ Top Rated</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="min-h-[44px] px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/70 rounded-2xl border border-rose-200 dark:border-rose-900 transition-colors flex items-center gap-1 shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills (Horizontal Scroll on Mobile with comfortable 44px tap targets) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-md'
                    : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 shadow-sm'
                }`}
              >
                {cat === 'All' ? '✨ All Occasions' : cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Size + Price Range Slider + Rating Filter */}
        <div className="bg-white dark:bg-zinc-900 p-3.5 sm:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Size Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider shrink-0">
              Size:
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {SIZES.map(sz => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[34px] h-8 px-2 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4 flex-wrap">
            {/* Price Range Slider */}
            <div className="flex items-center gap-2.5 flex-1 min-w-[180px]">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider shrink-0">
                Max:
              </span>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 accent-blue-600 cursor-pointer h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
              />
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg shrink-0">
                ₹{maxPrice}/d
              </span>
            </div>

            {/* Min Rating */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hidden xs:inline">
                Rating:
              </span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-2.5 py-1.5 text-zinc-800 dark:text-zinc-200 focus:outline-none"
              >
                <option value="0" className="dark:bg-zinc-900">All Ratings</option>
                <option value="4.8" className="dark:bg-zinc-900">★ 4.8+</option>
                <option value="4.9" className="dark:bg-zinc-900">★ 4.9+</option>
              </select>
            </div>
          </div>

        </div>
      </section>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
        <span>
          Showing <strong className="text-zinc-900 dark:text-zinc-100">{filteredItems.length}</strong> available UVCE wardrobe items
        </span>
        <span className="text-[10px] sm:text-[11px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded-full font-semibold shrink-0">
          ● UVCE Verified Students
        </span>
      </div>

      {/* Depop / Pinterest Responsive Grid (clean on 360px-430px viewports) */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400 dark:text-zinc-500">
            <Shirt className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200">No items match your criteria</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Try loosening your filters, adjusting the price slider, or searching for a different occasion like "formal", "dress", or "blazer".
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-white transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
