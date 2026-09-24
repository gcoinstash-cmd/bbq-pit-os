-- BBQ Pit Smokehouse Mock Data
INSERT INTO public.smoker_pits (pit_code, name, temperature_f, target_temp_f, fuel_wood, hours_remaining, current_cut, status)
VALUES 
  ('PIT-01', 'Big Tex White Oak Pit', 225, 225, 'White Oak 100%', '4.5 hrs', 'Prime Brisket (18 briskets)', 'Optimal Smoke'),
  ('PIT-02', 'Hill Country Pecan Pit', 250, 250, 'Texas Pecan / Hickory', '2.0 hrs', 'St. Louis Spare Ribs (32 racks)', 'Glazing Phase'),
  ('PIT-03', 'Post Oak Hot Box', 160, 160, 'Post Oak Rest Box', 'Holding', 'Pulled Pork & Turkey Breast', 'Resting & Tenderizing');

INSERT INTO public.reservations (reservation_ref, guest_name, email, phone, reservation_time, party_size, table_assigned, deposit_amount, status)
VALUES 
  ('RES-8901', 'Wyatt Lancaster', 'w.lancaster@austincap.com', '(512) 555-0192', NOW() + INTERVAL '3 hours', 6, 'Patio Pit #4', 150.00, 'Confirmed'),
  ('RES-8902', 'Dr. Evelyn Martinez', 'evelyn.martinez@med.utexas.edu', '(512) 555-0284', NOW() + INTERVAL '4 hours', 4, 'Tasting Counter #2', 100.00, 'VIP Seated'),
  ('RES-8903', 'Braxton Rhodes', 'braxton@rhodesholding.com', '(512) 555-0922', NOW() + INTERVAL '5 hours', 10, 'Private Smokehouse Hall', 500.00, 'Confirmed');

INSERT INTO public.kitchen_dispatch_queue (ticket_number, customer_name, items_summary, total_price, station_state)
VALUES 
  ('ORD-402', 'Colt Dalton', '2lb Prime Brisket, 1 Rack Ribs, Burnt End Beans', 98.50, 'Slicing Station'),
  ('ORD-403', 'Sloan Davenport', 'Half Pound Turkey, Jalapeño Cheddar Sausage (3)', 44.00, 'Ticket Queued'),
  ('ORD-404', 'Amelia Vance', 'Pitmaster Tasting Platter (Feeds 4)', 145.00, 'Carving Station');
