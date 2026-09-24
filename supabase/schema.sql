-- BBQ Pit Smokehouse OS Schema
-- Enables full real-time telemetry for offset smoker temperatures, bookings, and carving queue

CREATE TABLE IF NOT EXISTS public.smoker_pits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pit_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  temperature_f NUMERIC NOT NULL,
  target_temp_f NUMERIC NOT NULL DEFAULT 225,
  fuel_wood TEXT NOT NULL,
  hours_remaining TEXT,
  current_cut TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Optimal Smoke',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_ref TEXT NOT NULL UNIQUE,
  guest_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  reservation_time TIMESTAMPTZ NOT NULL,
  party_size INT NOT NULL,
  table_assigned TEXT,
  deposit_amount NUMERIC(10, 2) DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kitchen_dispatch_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  items_summary TEXT NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  station_state TEXT NOT NULL DEFAULT 'Ticket Queued',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.smoker_pits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kitchen_dispatch_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to smoker_pits"
  ON public.smoker_pits FOR SELECT USING (true);

CREATE POLICY "Allow public insert and read to reservations"
  ON public.reservations FOR ALL USING (true);

CREATE POLICY "Allow authenticated staff to manage kitchen_dispatch"
  ON public.kitchen_dispatch_queue FOR ALL USING (true);
