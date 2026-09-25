import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Flame, 
  ChefHat, 
  ClipboardList, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  X, 
  Sparkles,
  RefreshCw,
  LogOut,
  Sliders,
  Thermometer,
  CalendarCheck
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'smokers' | 'reservations' | 'orders' | 'inventory'>('smokers');

  // Smoke Pit Master Telemetry
  const [smokerStats, setSmokerStats] = useState([
    { id: 'PIT-01', name: 'Big Tex White Oak Pit', temp: '225°F', target: '225°F', wood: 'White Oak 100%', hoursRemaining: '4.5 hrs', meat: 'Prime Brisket (18 briskets)', status: 'Optimal Smoke' },
    { id: 'PIT-02', name: 'Hill Country Pecan Pit', temp: '250°F', target: '250°F', wood: 'Texas Pecan / Hickory', hoursRemaining: '2.0 hrs', meat: 'St. Louis Spare Ribs (32 racks)', status: 'Glazing Phase' },
    { id: 'PIT-03', name: 'Post Oak Hot Box', temp: '160°F', target: '160°F', wood: 'Post Oak Rest Box', hoursRemaining: 'Holding', meat: 'Pulled Pork & Turkey Breast', status: 'Resting & Tenderizing' }
  ]);

  const [reservations, setReservations] = useState([
    { id: 'RES-8901', guest: 'Wyatt Lancaster', time: '6:30 PM Tonight', party: 6, table: 'Patio Pit #4', deposit: '$150.00', status: 'Confirmed' },
    { id: 'RES-8902', guest: 'Dr. Evelyn Martinez', time: '7:15 PM Tonight', party: 4, table: 'Tasting Counter #2', deposit: '$100.00', status: 'VIP Seated' },
    { id: 'RES-8903', guest: 'Braxton Rhodes (Rhodes Capital)', time: '8:00 PM Tonight', party: 10, table: 'Private Smokehouse Hall', deposit: '$500.00', status: 'Confirmed' }
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-402', customer: 'Colt Dalton', items: '2lb Prime Brisket, 1 Rack Ribs, Burnt End Beans', total: '$98.50', time: '12m ago', state: 'Slicing Station' },
    { id: 'ORD-403', customer: 'Sloan Davenport', items: 'Half Pound Turkey, Jalapeño Cheddar Sausage (3)', total: '$44.00', time: '6m ago', state: 'Ticket Queued' },
    { id: 'ORD-404', customer: 'Amelia Vance', items: 'Pitmaster Tasting Platter (Feeds 4)', total: '$145.00', time: 'Just now', state: 'Carving Station' }
  ]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'bbq2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleOneClickFill = () => {
    setPasscode('bbq2026');
    setIsAuthenticated(true);
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn text-stone-100 font-sans">
      <div className="relative w-full max-w-4xl bg-stone-950 border border-amber-600/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center shadow-lg shadow-amber-900/40">
              <Flame className="w-5 h-5 text-amber-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg tracking-wide font-bold text-amber-100">BBQ PIT — PITMASTER COMMAND OS</h3>
                <span className="text-xs font-semibold tracking-wider uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Live Dispatch
                </span>
              </div>
              <p className="text-xs text-stone-400">Oak Pit Temperatures • Kitchen Dispatch • VIP Bookings</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate vs Authenticated Dashboard */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <h4 className="text-xl font-bold font-serif text-stone-100 mb-2">Pitmaster Terminal Authorization</h4>
            <p className="text-stone-400 text-sm max-w-md mb-8">
              Authorized smokehouse operators and pitmasters only. Enter the passkey below or use the 1-click bypass demo button.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passkey (bbq2026)"
                  className="w-full px-4 py-3 bg-stone-900/90 border border-stone-800 rounded-xl text-center text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono tracking-widest text-lg"
                />
                {error && (
                  <p className="text-red-400 text-xs mt-2 font-medium">Invalid passkey. Cheat code: bbq2026</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-900/30 transition-all text-base font-semibold min-h-[44px] tracking-widest uppercase"
                >
                  Verify Access
                </button>
                <button
                  type="button"
                  onClick={handleOneClickFill}
                  className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold rounded-xl transition-all text-base font-semibold min-h-[44px] tracking-wider flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Auto-Fill 1-Click Passkey (bbq2026)
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-stone-800 bg-stone-900/40">
              <div className="flex gap-2">
                {[
                  { id: 'smokers', label: 'Smoker Pits', icon: Flame },
                  { id: 'reservations', label: 'VIP Bookings', icon: CalendarCheck },
                  { id: 'orders', label: 'Kitchen Slicing', icon: ClipboardList }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive 
                          ? 'bg-amber-600 text-stone-950 shadow-md' 
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  PITS RUNNING: 3/3
                </span>
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="text-stone-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Lock
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Stat Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl">
                  <span className="text-xs font-semibold tracking-wider text-stone-400 uppercase tracking-widest block mb-1">Wood Inventory</span>
                  <span className="text-xl font-bold font-mono text-stone-100">8.4 Cords</span>
                  <span className="text-xs font-semibold tracking-wider text-amber-400/80 block mt-1">Post Oak & Pecan</span>
                </div>
                <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl">
                  <span className="text-xs font-semibold tracking-wider text-stone-400 uppercase tracking-widest block mb-1">Prime Brisket Smoked</span>
                  <span className="text-xl font-bold font-mono text-stone-100">420 lbs</span>
                  <span className="text-xs font-semibold tracking-wider text-emerald-400 block mt-1">Today's Batch</span>
                </div>
                <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl">
                  <span className="text-xs font-semibold tracking-wider text-stone-400 uppercase tracking-widest block mb-1">Evening Covers</span>
                  <span className="text-xl font-bold font-mono text-stone-100">142 Guests</span>
                  <span className="text-xs font-semibold tracking-wider text-amber-400 block mt-1">94% Capacity</span>
                </div>
                <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-xl">
                  <span className="text-xs font-semibold tracking-wider text-stone-400 uppercase tracking-widest block mb-1">Today's Gross Sales</span>
                  <span className="text-xl font-bold font-mono text-stone-100">$8,450.00</span>
                  <span className="text-xs font-semibold tracking-wider text-emerald-400 block mt-1">+18% vs Last Friday</span>
                </div>
              </div>

              {/* Tab 1: Smoker Pits */}
              {activeTab === 'smokers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-amber-500" />
                      Live Offset Smoker Telemetry
                    </h4>
                    <span className="text-xs text-stone-500 font-mono">Sensors: Real-Time</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {smokerStats.map((pit) => (
                      <div key={pit.id} className="p-4 bg-stone-900/70 border border-stone-800/90 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-amber-400">{pit.id}</span>
                          <span className="text-xs font-semibold tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {pit.status}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-stone-100">{pit.name}</div>
                          <div className="text-xs text-stone-400 mt-0.5">{pit.meat}</div>
                        </div>
                        <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold tracking-wider text-stone-500 block">Chamber Temp</span>
                            <span className="text-lg font-mono font-bold text-amber-300">{pit.temp}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold tracking-wider text-stone-500 block">Fuel Source</span>
                            <span className="text-xs font-mono text-stone-300">{pit.wood}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Reservations */}
              {activeTab === 'reservations' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-amber-500" />
                    Evening Dining Reservations
                  </h4>
                  <div className="border border-stone-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs text-stone-300">
                      <thead className="bg-stone-900/80 text-xs font-semibold tracking-wider uppercase font-bold text-stone-400 tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Ref</th>
                          <th className="py-3 px-4">Guest</th>
                          <th className="py-3 px-4">Time</th>
                          <th className="py-3 px-4">Party & Seating</th>
                          <th className="py-3 px-4">Deposit</th>
                          <th className="py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800/60 font-mono">
                        {reservations.map((res) => (
                          <tr key={res.id} className="hover:bg-stone-900/40">
                            <td className="py-3 px-4 text-amber-400 font-bold">{res.id}</td>
                            <td className="py-3 px-4 font-sans font-bold text-stone-200">{res.guest}</td>
                            <td className="py-3 px-4">{res.time}</td>
                            <td className="py-3 px-4 text-stone-400">{res.party} guests • {res.table}</td>
                            <td className="py-3 px-4 text-emerald-400">{res.deposit}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold tracking-wider">
                                {res.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-amber-500" />
                    Kitchen Dispatch & Slicing Queue
                  </h4>
                  <div className="space-y-2">
                    {orders.map((ord) => (
                      <div key={ord.id} className="p-3.5 bg-stone-900/60 border border-stone-800 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-mono font-bold text-xs text-amber-400">
                            {ord.id}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-stone-200">{ord.customer} <span className="text-xs font-semibold tracking-wider text-stone-500 font-mono">({ord.time})</span></div>
                            <div className="text-xs text-stone-400">{ord.items}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs font-bold text-stone-100">{ord.total}</span>
                          <span className="text-xs font-semibold tracking-wider font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {ord.state}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer */}
            <div className="px-6 py-3 border-t border-stone-800 bg-stone-900/60 flex items-center justify-between text-xs text-stone-500">
              <span className="font-mono">Turnkey Supabase Schema Ready • RLS Active</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-lg transition-colors text-base font-semibold min-h-[44px]"
              >
                Close Terminal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
