import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  DollarSign, 
  Sparkles, 
  MapPin, 
  Check, 
  ArrowRight,
  Shirt,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRESET_IMAGE_OPTIONS, CAMPUS_LOCATIONS } from '../data/initialData';

export default function ListItemModal() {
  const { isListItemOpen, setIsListItemOpen, createItem, currentUser, setCurrentView, setDashboardTab } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Formal');
  const [size, setSize] = useState('M');
  const [dailyPrice, setDailyPrice] = useState('349');
  const [securityDeposit, setSecurityDeposit] = useState('700');
  const [pickupLocation, setPickupLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [conditionNotes, setConditionNotes] = useState('Flawless condition • Freshly dry-cleaned');
  
  // Photo states: Custom URL or File upload or Preset
  const [imageUrl, setImageUrl] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(PRESET_IMAGE_OPTIONS[0].url);
  const [photoPreview, setPhotoPreview] = useState(PRESET_IMAGE_OPTIONS[0].url);
  const [error, setError] = useState('');

  if (!isListItemOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setImageUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.url);
    setPhotoPreview(preset.url);
    setImageUrl('');
    if (!title) {
      setTitle(preset.name);
      setCategory(preset.category);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an item title.');
      return;
    }

    const finalPhoto = imageUrl.trim() || photoPreview || selectedPreset;

    createItem({
      title: title.trim(),
      description: description.trim() || `${title.trim()} available for UVCE campus wardrobe rental. Perfect for events, formals, or placement drives.`,
      category,
      size,
      dailyPrice: Number(dailyPrice) || 300,
      securityDeposit: Number(securityDeposit) || 600,
      pickupLocation,
      conditionNotes,
      images: [finalPhoto]
    });

    setIsListItemOpen(false);
    setCurrentView('dashboard');
    setDashboardTab('closet');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-800/60 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Shirt className="w-3.5 h-3.5" />
              Lend From Your Closet
            </div>
            <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              List Wardrobe Piece
            </h2>
          </div>
          <button
            onClick={() => setIsListItemOpen(false)}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          
          {/* Photo Selection Section */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              1. Item Photo (Preset, URL, or Upload)
            </label>

            {/* Quick Presets */}
            <div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-2">
                Click a realistic preset or enter your custom photo:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_IMAGE_OPTIONS.map((opt, i) => {
                  const isSelected = photoPreview === opt.url;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handlePresetSelect(opt)}
                      className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                        isSelected ? 'border-blue-600 dark:border-blue-400 ring-2 ring-blue-300 dark:ring-blue-900 scale-95' : 'border-zinc-200 dark:border-zinc-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={opt.url} alt={opt.name} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom URL or File Upload option */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Or Paste Image URL:
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (e.target.value.trim()) setPhotoPreview(e.target.value.trim());
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Or Upload From Device:
                </label>
                <label className="min-h-[42px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Choose local file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-3.5 sm:space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              2. Wardrobe Details
            </label>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Outfit / Garment Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Zara Placement Blazer or Silk Farewell Dress"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Category Occasion
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
                >
                  <option value="Formal" className="dark:bg-zinc-800">Formal & Placement</option>
                  <option value="Party" className="dark:bg-zinc-800">Party & Fests</option>
                  <option value="Ethnic/Traditional" className="dark:bg-zinc-800">Ethnic / Traditional Day</option>
                  <option value="Winterwear" className="dark:bg-zinc-800">Winterwear & Jackets</option>
                  <option value="Accessories" className="dark:bg-zinc-800">Accessories & Bags</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Size
                </label>
                <div className="flex gap-1 overflow-x-auto pb-0.5">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setSize(sz)}
                      className={`flex-1 min-w-[32px] py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        size === sz
                          ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Description & Styling Tips
              </label>
              <textarea
                rows="2"
                placeholder="Describe fit, fabric, occasions it works great for, and styling tips..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Pricing & Campus Handoff Section */}
          <div className="space-y-3.5 sm:space-y-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              3. Pricing & Campus Handoff
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Daily Rental Rate (₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    step="50"
                    value={dailyPrice}
                    onChange={(e) => setDailyPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 text-xs font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-zinc-400">/ day</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Refundable Security Deposit (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-zinc-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="100"
                    max="10000"
                    step="50"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 text-xs font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">escrow locked</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Convenient Campus Pickup Spot
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
              >
                {CAMPUS_LOCATIONS.map((loc, idx) => (
                  <option key={idx} value={loc} className="dark:bg-zinc-800">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Garment Condition Notes
              </label>
              <input
                type="text"
                value={conditionNotes}
                onChange={(e) => setConditionNotes(e.target.value)}
                placeholder="e.g. Dry cleaned, unworn since formal, comes with hanger"
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[42px]"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Submit Button (Accessible 48px tap target) */}
          <div className="pt-2 sticky bottom-0 bg-white dark:bg-zinc-900 py-2 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="submit"
              className="w-full min-h-[48px] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Shirt className="w-4 h-4" />
              Publish Listing to UVCE Wardrobe
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
