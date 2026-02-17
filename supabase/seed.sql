-- Velora Seed Data
-- Categories, Products, Images, Variants

-- ============================================
-- Categories
-- ============================================
insert into categories (id, name, slug, description, image_url, sort_order) values
  ('c1000000-0000-0000-0000-000000000001', 'Clothing', 'clothing', 'Premium apparel for every occasion', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', 1),
  ('c1000000-0000-0000-0000-000000000002', 'Accessories', 'accessories', 'Complete your look with curated accessories', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80', 2),
  ('c1000000-0000-0000-0000-000000000003', 'Footwear', 'footwear', 'Step out in style with our footwear collection', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 3),
  ('c1000000-0000-0000-0000-000000000004', 'Home & Living', 'home-living', 'Elevate your living space', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 4),
  ('c1000000-0000-0000-0000-000000000005', 'Electronics', 'electronics', 'Cutting-edge tech and gadgets', 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80', 5);

-- ============================================
-- Products (25 products, all active, prices in cents)
-- ============================================

-- Clothing (6 products)
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000001', 'Classic Oxford Shirt', 'classic-oxford-shirt', 'A timeless oxford cloth button-down shirt crafted from premium cotton. Features a relaxed fit, button-down collar, and a clean finish perfect for both casual and semi-formal occasions.', 8900, 12000, 'active', true),
  ('e1000000-0000-0000-0000-000000000002', 'Merino Wool Sweater', 'merino-wool-sweater', 'Luxuriously soft merino wool crew neck sweater. Naturally temperature-regulating and breathable, this versatile piece transitions seamlessly from office to weekend.', 12900, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000003', 'Slim Fit Chinos', 'slim-fit-chinos', 'Modern slim-fit chinos in a stretch cotton blend. Comfortable enough for all-day wear with a tailored silhouette that pairs perfectly with anything in your wardrobe.', 7900, 9500, 'active', false),
  ('e1000000-0000-0000-0000-000000000004', 'Linen Blazer', 'linen-blazer', 'A lightweight linen blazer ideal for warm-weather occasions. Unlined construction with patch pockets gives it an effortlessly refined appearance.', 19900, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000005', 'Organic Cotton T-Shirt', 'organic-cotton-tshirt', 'An essential crew neck tee made from 100% organic cotton. Garment-dyed for a lived-in softness with a slightly relaxed fit.', 3500, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000006', 'Denim Jacket', 'denim-jacket', 'A classic trucker-style denim jacket in medium wash. Made from heavyweight selvedge denim that develops beautiful character over time.', 14900, 18000, 'active', true);

-- Accessories (5 products)
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000007', 'Leather Weekender Bag', 'leather-weekender-bag', 'Full-grain leather weekender with brass hardware. Spacious main compartment, interior zip pocket, and detachable shoulder strap. Ages beautifully with use.', 29900, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000008', 'Minimalist Watch', 'minimalist-watch', 'Clean dial design with Swiss quartz movement. Sapphire crystal glass and Italian leather strap. Water-resistant to 50 meters.', 24900, 29900, 'active', true),
  ('e1000000-0000-0000-0000-000000000009', 'Silk Pocket Square', 'silk-pocket-square', 'Hand-rolled edges on pure silk. Each pocket square features unique patterns inspired by architectural motifs. The perfect finishing touch.', 4500, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000010', 'Canvas Tote Bag', 'canvas-tote-bag', 'Heavy-duty organic canvas tote with reinforced handles and an interior laptop sleeve. Perfect for daily commutes and weekend markets.', 5900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000011', 'Leather Belt', 'leather-belt', 'Full-grain Italian leather belt with a brushed nickel buckle. Hand-stitched edges and a tapered tip for a refined look.', 6900, 8500, 'active', false);

-- Footwear (5 products)
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000012', 'White Leather Sneakers', 'white-leather-sneakers', 'Clean, minimalist sneakers in premium Italian leather. Margom rubber sole provides excellent grip and durability. A wardrobe essential.', 18900, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000013', 'Chelsea Boots', 'chelsea-boots', 'Sleek suede Chelsea boots with elastic side panels and a pull tab. Goodyear welted construction ensures longevity and resolability.', 22900, 27900, 'active', false),
  ('e1000000-0000-0000-0000-000000000014', 'Running Shoes', 'running-shoes', 'Engineered mesh upper for breathability with responsive cushioning. Ideal for daily runs or active lifestyles.', 13900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000015', 'Suede Loafers', 'suede-loafers', 'Unlined suede loafers with a Blake-stitched leather sole. Flexible and lightweight, perfect for warm-weather dressing.', 16900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000016', 'Hiking Boots', 'hiking-boots', 'Waterproof full-grain leather hiking boots with Vibram soles. Built for trails but stylish enough for the city.', 21900, 25900, 'active', false);

-- Home & Living (5 products)
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000017', 'Ceramic Pour-Over Set', 'ceramic-pour-over-set', 'Handcrafted ceramic dripper and carafe set. The ribbed interior channels optimize water flow for a clean, balanced extraction every time.', 6900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000018', 'Wool Throw Blanket', 'wool-throw-blanket', 'A cozy lambswool throw in a timeless herringbone pattern. Generously sized at 60x80 inches. Made in Scotland.', 15900, 19900, 'active', true),
  ('e1000000-0000-0000-0000-000000000019', 'Scented Candle Trio', 'scented-candle-trio', 'Three hand-poured soy wax candles in ceramic vessels. Notes of cedar & moss, bergamot & sage, and sandalwood & vanilla. 45-hour burn time each.', 5400, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000020', 'Linen Bedding Set', 'linen-bedding-set', 'Stonewashed French linen duvet cover and two pillowcases. Gets softer with every wash. Available in queen and king sizes.', 24900, 32000, 'active', false),
  ('e1000000-0000-0000-0000-000000000021', 'Desk Organizer', 'desk-organizer', 'Walnut wood desk organizer with brass accents. Three compartments for pens, cards, and small items. A beautiful workspace companion.', 7900, null, 'active', false);

-- Electronics (4 products)
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000022', 'Wireless Earbuds', 'wireless-earbuds', 'Active noise cancellation with transparency mode. 30-hour battery life with the charging case. IPX5 water-resistant for workouts.', 17900, 22900, 'active', false),
  ('e1000000-0000-0000-0000-000000000023', 'Portable Speaker', 'portable-speaker', '360-degree sound with deep bass. 20-hour battery, IP67 waterproof rating. Compact design clips onto bags and bikes.', 9900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000024', 'Mechanical Keyboard', 'mechanical-keyboard', 'Hot-swappable switches, PBT double-shot keycaps, and RGB backlighting. USB-C and Bluetooth 5.0 dual connectivity.', 14900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000025', 'Smart Desk Lamp', 'smart-desk-lamp', 'Adjustable color temperature from 2700K to 6500K. Built-in wireless charging pad. App-controlled with scheduling features.', 8900, 11900, 'active', false);

-- ============================================
-- Product Images
-- ============================================
insert into product_images (product_id, url, alt_text, sort_order, is_primary) values
  -- Clothing
  ('e1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', 'Classic Oxford Shirt - Front', 0, true),
  ('e1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=800&q=80', 'Classic Oxford Shirt - Detail', 1, false),
  ('e1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a0d?w=800&q=80', 'Merino Wool Sweater', 0, true),
  ('e1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', 'Slim Fit Chinos', 0, true),
  ('e1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', 'Linen Blazer', 0, true),
  ('e1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', 'Organic Cotton T-Shirt', 0, true),
  ('e1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80', 'Denim Jacket', 0, true),
  -- Accessories
  ('e1000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', 'Leather Weekender Bag', 0, true),
  ('e1000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', 'Minimalist Watch', 0, true),
  ('e1000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=800&q=80', 'Silk Pocket Square', 0, true),
  ('e1000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80', 'Canvas Tote Bag', 0, true),
  ('e1000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1553704571-c32d20e6c74d?w=800&q=80', 'Leather Belt', 0, true),
  -- Footwear
  ('e1000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', 'White Leather Sneakers', 0, true),
  ('e1000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80', 'Chelsea Boots', 0, true),
  ('e1000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 'Running Shoes', 0, true),
  ('e1000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80', 'Suede Loafers', 0, true),
  ('e1000000-0000-0000-0000-000000000016', 'https://images.unsplash.com/photo-1520219306100-ec4afeeefe58?w=800&q=80', 'Hiking Boots', 0, true),
  -- Home & Living
  ('e1000000-0000-0000-0000-000000000017', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', 'Ceramic Pour-Over Set', 0, true),
  ('e1000000-0000-0000-0000-000000000018', 'https://images.unsplash.com/photo-1580301762395-21ce6d5d9e72?w=800&q=80', 'Wool Throw Blanket', 0, true),
  ('e1000000-0000-0000-0000-000000000019', 'https://images.unsplash.com/photo-1602607514066-85d1672eda64?w=800&q=80', 'Scented Candle Trio', 0, true),
  ('e1000000-0000-0000-0000-000000000020', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', 'Linen Bedding Set', 0, true),
  ('e1000000-0000-0000-0000-000000000021', 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&q=80', 'Desk Organizer', 0, true),
  -- Electronics
  ('e1000000-0000-0000-0000-000000000022', 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=800&q=80', 'Wireless Earbuds', 0, true),
  ('e1000000-0000-0000-0000-000000000023', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80', 'Portable Speaker', 0, true),
  ('e1000000-0000-0000-0000-000000000024', 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80', 'Mechanical Keyboard', 0, true),
  ('e1000000-0000-0000-0000-000000000025', 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&q=80', 'Smart Desk Lamp', 0, true);

-- ============================================
-- Product Variants
-- ============================================

-- Oxford Shirt variants
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000001', 'Small / White', 'OXF-S-WHT', 0, 15, '{"size": "S", "color": "White"}'),
  ('e1000000-0000-0000-0000-000000000001', 'Medium / White', 'OXF-M-WHT', 0, 20, '{"size": "M", "color": "White"}'),
  ('e1000000-0000-0000-0000-000000000001', 'Large / White', 'OXF-L-WHT', 0, 18, '{"size": "L", "color": "White"}'),
  ('e1000000-0000-0000-0000-000000000001', 'Small / Blue', 'OXF-S-BLU', 0, 12, '{"size": "S", "color": "Blue"}'),
  ('e1000000-0000-0000-0000-000000000001', 'Medium / Blue', 'OXF-M-BLU', 0, 22, '{"size": "M", "color": "Blue"}'),
  ('e1000000-0000-0000-0000-000000000001', 'Large / Blue', 'OXF-L-BLU', 0, 16, '{"size": "L", "color": "Blue"}');

-- Merino Sweater variants
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000002', 'Small / Navy', 'MRN-S-NAV', 0, 10, '{"size": "S", "color": "Navy"}'),
  ('e1000000-0000-0000-0000-000000000002', 'Medium / Navy', 'MRN-M-NAV', 0, 14, '{"size": "M", "color": "Navy"}'),
  ('e1000000-0000-0000-0000-000000000002', 'Large / Navy', 'MRN-L-NAV', 0, 12, '{"size": "L", "color": "Navy"}'),
  ('e1000000-0000-0000-0000-000000000002', 'Medium / Grey', 'MRN-M-GRY', 0, 8, '{"size": "M", "color": "Grey"}');

-- Chinos variants
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000003', '30x30 / Khaki', 'CHN-30-KHK', 0, 10, '{"size": "30x30", "color": "Khaki"}'),
  ('e1000000-0000-0000-0000-000000000003', '32x32 / Khaki', 'CHN-32-KHK', 0, 15, '{"size": "32x32", "color": "Khaki"}'),
  ('e1000000-0000-0000-0000-000000000003', '34x32 / Khaki', 'CHN-34-KHK', 0, 12, '{"size": "34x32", "color": "Khaki"}'),
  ('e1000000-0000-0000-0000-000000000003', '32x32 / Navy', 'CHN-32-NAV', 0, 8, '{"size": "32x32", "color": "Navy"}');

-- Organic T-Shirt variants
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000005', 'Small / Black', 'TEE-S-BLK', 0, 25, '{"size": "S", "color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000005', 'Medium / Black', 'TEE-M-BLK', 0, 30, '{"size": "M", "color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000005', 'Large / Black', 'TEE-L-BLK', 0, 20, '{"size": "L", "color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000005', 'Medium / White', 'TEE-M-WHT', 0, 28, '{"size": "M", "color": "White"}');

-- Sneakers variants
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000012', 'US 8', 'SNK-8', 0, 8, '{"size": "US 8"}'),
  ('e1000000-0000-0000-0000-000000000012', 'US 9', 'SNK-9', 0, 12, '{"size": "US 9"}'),
  ('e1000000-0000-0000-0000-000000000012', 'US 10', 'SNK-10', 0, 15, '{"size": "US 10"}'),
  ('e1000000-0000-0000-0000-000000000012', 'US 11', 'SNK-11', 0, 10, '{"size": "US 11"}'),
  ('e1000000-0000-0000-0000-000000000012', 'US 12', 'SNK-12', 0, 6, '{"size": "US 12"}');

-- Linen Bedding variants
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000020', 'Queen / Natural', 'BED-Q-NAT', 0, 8, '{"size": "Queen", "color": "Natural"}'),
  ('e1000000-0000-0000-0000-000000000020', 'King / Natural', 'BED-K-NAT', 3000, 5, '{"size": "King", "color": "Natural"}'),
  ('e1000000-0000-0000-0000-000000000020', 'Queen / Charcoal', 'BED-Q-CHR', 0, 6, '{"size": "Queen", "color": "Charcoal"}'),
  ('e1000000-0000-0000-0000-000000000020', 'King / Charcoal', 'BED-K-CHR', 3000, 4, '{"size": "King", "color": "Charcoal"}');

-- ============================================
-- Product Categories (many-to-many)
-- ============================================
insert into product_categories (product_id, category_id) values
  -- Clothing
  ('e1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000001'),
  -- Accessories
  ('e1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000002'),
  ('e1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000002'),
  ('e1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000002'),
  ('e1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000002'),
  ('e1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000002'),
  -- Footwear
  ('e1000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000003'),
  ('e1000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000003'),
  ('e1000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000003'),
  ('e1000000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000003'),
  ('e1000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000003'),
  -- Home & Living
  ('e1000000-0000-0000-0000-000000000017', 'c1000000-0000-0000-0000-000000000004'),
  ('e1000000-0000-0000-0000-000000000018', 'c1000000-0000-0000-0000-000000000004'),
  ('e1000000-0000-0000-0000-000000000019', 'c1000000-0000-0000-0000-000000000004'),
  ('e1000000-0000-0000-0000-000000000020', 'c1000000-0000-0000-0000-000000000004'),
  ('e1000000-0000-0000-0000-000000000021', 'c1000000-0000-0000-0000-000000000004'),
  -- Electronics
  ('e1000000-0000-0000-0000-000000000022', 'c1000000-0000-0000-0000-000000000005'),
  ('e1000000-0000-0000-0000-000000000023', 'c1000000-0000-0000-0000-000000000005'),
  ('e1000000-0000-0000-0000-000000000024', 'c1000000-0000-0000-0000-000000000005'),
  ('e1000000-0000-0000-0000-000000000025', 'c1000000-0000-0000-0000-000000000005');
