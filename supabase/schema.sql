-- BBQ PIT OS — Supabase Schema | Ghost Factory™
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  order_type TEXT CHECK (order_type IN ('dine-in','takeout','catering','delivery')),
  items JSONB,
  subtotal NUMERIC(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','smoking','ready','completed','cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT,
  name TEXT NOT NULL,
  price NUMERIC(10,2),
  description TEXT,
  smoke_time TEXT,
  is_available BOOLEAN DEFAULT true
);
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read menu" ON menu_items FOR SELECT USING (is_available = true);

CREATE TABLE IF NOT EXISTS pit_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pit_name TEXT NOT NULL,
  wood_type TEXT,
  temp_f INTEGER,
  current_load TEXT,
  pitmaster TEXT,
  status TEXT DEFAULT 'active',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE pit_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read pit" ON pit_schedule FOR SELECT USING (true);
