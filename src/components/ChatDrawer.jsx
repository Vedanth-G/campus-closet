import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Sparkles, 
  Lock, 
  MessageCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const QUICK_PROMPTS = [
  "I'm outside UVCE Main Porch wearing a navy jacket!",
  "Can we meet at Central Library Courtyard at 5:00 PM?",
  "Item is freshly steamed in garment bag with hanger ready!",
  "Just arrived at the KR Circle campus gate!",
  "Thanks so much! Returning it clean at agreed time."
];

export default function ChatDrawer() {
  const { 
    activeChatRental, 
    setActiveChatRentalId, 
    currentUser, 
    sendChatMessage,
    updateRentalStatus,
    setActiveReviewRental
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChatRental?.messages]);

  if (!activeChatRental) return null;

  const isRenter = currentUser.id === activeChatRental.renterId;
  const isLender = currentUser.id === activeChatRental.lenderId;
  const otherPartyName = isRenter ? activeChatRental.lenderName : activeChatRental.renterName;
  const otherPartyAvatar = isRenter ? activeChatRental.lenderAvatar : activeChatRental.renterAvatar;

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    sendChatMessage(activeChatRental.id, messageText);
    setMessageText('');
  };

  const handleQuickPrompt = (prompt) => {
    sendChatMessage(activeChatRental.id, prompt);
  };

  const getStatusBadge = () => {
    switch (activeChatRental.status) {
      case 'pending':
        return (
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            ⏳ Pending Approval
          </span>
        );
      case 'approved':
        return (
          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            🤝 Approved (Meet for Pickup)
          </span>
        );
      case 'active':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            ✨ Active Rental
          </span>
        );
      case 'returned':
        return (
          <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            ✅ Returned & Deposit Released
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-zinc-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <img
                src={otherPartyAvatar}
                alt={otherPartyName}
                className="w-10 h-10 rounded-full object-cover border border-zinc-200"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-zinc-900 truncate">{otherPartyName}</h3>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-semibold">
                  {isRenter ? 'Lender' : 'Renter'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                {activeChatRental.pickupLocation}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveChatRentalId(null)}
            className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rental Context Card in Chat Header */}
        <div className="px-4 py-2.5 bg-blue-50/60 border-b border-blue-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={activeChatRental.itemImage}
              alt={activeChatRental.itemTitle}
              className="w-8 h-8 rounded-lg object-cover border border-blue-200 shrink-0"
            />
            <div className="min-w-0">
              <p className="font-bold text-zinc-900 truncate text-[11px]">
                {activeChatRental.itemTitle}
              </p>
              <p className="text-[10px] text-zinc-500">
                {activeChatRental.startDate} → {activeChatRental.endDate} ({activeChatRental.totalDays}d)
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            {getStatusBadge()}
          </div>
        </div>

        {/* Escrow banner */}
        <div className="px-4 py-1.5 bg-zinc-900 text-white text-[10px] flex items-center justify-between">
          <span className="flex items-center gap-1 text-zinc-300">
            <Lock className="w-3 h-3 text-lime-400" />
            Escrow Status: <strong className="text-white uppercase">{activeChatRental.escrowStatus}</strong>
          </span>
          <span className="text-lime-300 font-bold">
            ₹{activeChatRental.securityDeposit} Deposit Protected
          </span>
        </div>

        {/* Messages History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fcfbfa]">
          {activeChatRental.messages && activeChatRental.messages.length > 0 ? (
            activeChatRental.messages.map((msg) => {
              if (msg.isSystem) {
                return (
                  <div key={msg.id} className="my-2 p-2.5 rounded-xl bg-zinc-100 border border-zinc-200/80 text-center text-[11px] text-zinc-600 font-medium">
                    <span className="text-blue-600 font-bold">🛡️ {msg.senderName}: </span>
                    {msg.text}
                    <span className="block text-[9px] text-zinc-400 mt-0.5">{msg.timestamp}</span>
                  </div>
                );
              }

              const isMe = msg.senderId === currentUser.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white text-zinc-900 border border-zinc-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-zinc-400 mt-1 px-1">
                    {msg.senderName} • {msg.timestamp}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-xs text-zinc-400">
              No messages yet. Send a quick hello to coordinate pickup spot and time!
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Handoff Suggestion Chips */}
        <div className="px-3 py-2 bg-white border-t border-zinc-100">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Campus Handoff Quick-Replies
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-zinc-200 flex items-center gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Message ${otherPartyName}...`}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
