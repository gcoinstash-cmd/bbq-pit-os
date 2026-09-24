-- BBQ PIT OS — Seed Data
INSERT INTO menu_items (category, name, price, description, smoke_time) VALUES
('Smoked Meats', 'Brisket — Full Pound', 28, 'Prime USDA beef brisket smoked 14 hours over post oak. Bark crust with rendered fat ring.', '14 hours'),
('Smoked Meats', 'St. Louis Ribs — Full Rack', 38, 'Competition-style ribs with house dry rub, smoked 6 hours over cherry wood.', '6 hours'),
('Smoked Meats', 'Pulled Pork — Half Pound', 16, 'Heritage pork shoulder smoked 12 hours, hand-pulled with apple cider finishing spritz.', '12 hours'),
('Smoked Meats', 'Jalapeño Cheddar Sausage — Link', 9, 'House-ground beef and pork sausage with sharp cheddar and jalapeños.', '3 hours'),
('Sides', 'Smoked Jalapeño Mac', 8, 'Smoked gouda and sharp cheddar mac with charred jalapeño breadcrumb crust.', NULL),
('Sides', 'Collard Greens', 6, 'Long-simmered greens with smoked ham hock and pepper vinegar.', NULL),
('Sides', 'Smoked Potato Salad', 6, 'Yukon gold potatoes, house mustard, celery seed, and smoked paprika.', NULL)
ON CONFLICT DO NOTHING;

INSERT INTO pit_schedule (pit_name, wood_type, temp_f, current_load, pitmaster, status) VALUES
('Pit #1 — The Leviathan', 'Post Oak', 225, '4x Full Brisket', 'Marcus D.', 'active'),
('Pit #2 — Hickory Beast', 'Hickory', 250, '8x Rack St. Louis Ribs', 'Tyrone B.', 'active'),
('Pit #3 — Cherry Smoke', 'Cherry', 225, '6x Pork Shoulder', 'DeShawn R.', 'active')
ON CONFLICT DO NOTHING;
