-- Velora Seed Data — Streetwear / Fashion Focus
-- Categories: Tops, Bottoms, Footwear, Accessories, Headwear

-- ============================================
-- Clear existing data
-- ============================================
delete from product_categories;
delete from product_variants;
delete from product_images;
delete from products;
delete from categories;

-- ============================================
-- Categories
-- ============================================
insert into categories (id, name, slug, description, image_url, sort_order) values
  ('c1000000-0000-0000-0000-000000000001', 'Tops', 'tops', 'Tees, hoodies, jackets and layering essentials', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', 1),
  ('c1000000-0000-0000-0000-000000000002', 'Bottoms', 'bottoms', 'Cargo pants, joggers, shorts and denim', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', 2),
  ('c1000000-0000-0000-0000-000000000003', 'Footwear', 'footwear', 'Sneakers, boots and slides', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80', 3),
  ('c1000000-0000-0000-0000-000000000004', 'Accessories', 'accessories', 'Bags, jewelry, sunglasses and essentials', 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=800&q=80', 4),
  ('c1000000-0000-0000-0000-000000000005', 'Headwear', 'headwear', 'Caps, beanies and bucket hats', 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800&q=80', 5);

-- ============================================
-- Products — Tops (7)
-- ============================================
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000001', 'Oversized Graphic Tee', 'oversized-graphic-tee', 'Heavyweight 280gsm cotton tee with an oversized drop-shoulder fit. Features a washed-out vintage graphic print on the back. Pre-shrunk and garment-dyed for that lived-in feel from day one.', 4800, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000002', 'Essential Hoodie', 'essential-hoodie', 'Your new go-to heavyweight hoodie. 400gsm French terry with a relaxed boxy fit, kangaroo pocket, and ribbed cuffs. Double-layered hood keeps its shape wash after wash.', 8900, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000003', 'Washed Crewneck Sweatshirt', 'washed-crewneck', 'Enzyme-washed fleece crewneck with a vintage sun-faded finish. Dropped shoulders and a slightly cropped length for a modern silhouette.', 6900, 8500, 'active', false),
  ('e1000000-0000-0000-0000-000000000004', 'Puffer Vest', 'puffer-vest', 'Lightweight ripstop puffer vest with synthetic down fill. Stands up to cold weather while keeping your layering game clean. Packable into its own pocket.', 12900, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000005', 'Mesh Jersey', 'mesh-jersey', 'Breathable mesh basketball jersey with contrast piping and an embroidered logo. Oversized fit sits perfectly over a tee or long sleeve.', 5500, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000006', 'Corduroy Overshirt', 'corduroy-overshirt', 'Wide-wale corduroy overshirt with snap button closure. Works as a shirt or a light jacket. Chest pockets and a straight hem.', 9800, 12000, 'active', true),
  ('e1000000-0000-0000-0000-000000000007', 'Cropped Varsity Jacket', 'cropped-varsity-jacket', 'Wool-blend varsity jacket with faux leather sleeves and chenille patch detailing. Cropped length with ribbed collar, cuffs, and hem.', 16900, null, 'active', true);

-- ============================================
-- Products — Bottoms (5)
-- ============================================
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000008', 'Relaxed Cargo Pants', 'relaxed-cargo-pants', 'Washed cotton twill cargo pants with a relaxed tapered fit. Six-pocket design with adjustable ankle snaps. Heavy garment wash for instant broken-in comfort.', 8900, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000009', 'Baggy Skate Denim', 'baggy-skate-denim', '14oz raw selvedge denim in a wide-leg baggy cut. Built for skating but styled for the streets. Chain-stitched hems and copper hardware throughout.', 11900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000010', 'Tech Joggers', 'tech-joggers', 'Four-way stretch nylon joggers with a tapered fit. Zippered side pockets and reflective detailing. Moisture-wicking and quick-dry — built to move.', 7900, 9500, 'active', false),
  ('e1000000-0000-0000-0000-000000000011', 'Corduroy Pants', 'corduroy-pants', 'Wide-leg corduroy trousers in a heavy 14-wale cord. Sits high on the waist with a double-pleat front. Retro vibes, modern fit.', 8500, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000012', 'Mesh Basketball Shorts', 'mesh-basketball-shorts', 'Lightweight mesh shorts with an elastic waistband and side pockets. Embroidered logo at the left leg. Above-the-knee length for that clean look.', 4500, null, 'active', false);

-- ============================================
-- Products — Footwear (5)
-- ============================================
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000013', 'Retro Runner Sneakers', 'retro-runner-sneakers', 'Suede and mesh retro running shoes with a chunky midsole. Inspired by 90s track silhouettes. EVA foam cushioning for all-day comfort.', 13900, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000014', 'Canvas High Tops', 'canvas-high-tops', 'Classic canvas high-top sneakers with vulcanized rubber soles. Old-school construction with modern comfort insoles. Gets better with every scuff.', 7900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000015', 'Leather Platform Sneakers', 'leather-platform-sneakers', 'Clean white leather sneakers on an exaggerated platform sole. Premium full-grain leather upper with padded collar. Makes a statement without trying.', 16900, 19900, 'active', true),
  ('e1000000-0000-0000-0000-000000000016', 'Suede Chelsea Boots', 'suede-chelsea-boots', 'Sleek suede Chelsea boots with elastic side panels and a chunky lug sole. Goodyear welted for durability. Dress them up or down.', 18900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000017', 'Slide Sandals', 'slide-sandals', 'Molded EVA slide sandals with an embossed logo on the strap. Contoured footbed for support. Your new go-to for post-gym and lazy weekends.', 3900, null, 'active', false);

-- ============================================
-- Products — Accessories (5)
-- ============================================
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000018', 'Crossbody Bag', 'crossbody-bag', 'Compact nylon crossbody with an adjustable strap and front zip pocket. Fits your phone, wallet, and keys — everything you need, nothing you don''t.', 4900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000019', 'Chunky Chain Necklace', 'chunky-chain-necklace', '18k gold-plated stainless steel chain necklace. 8mm curb link design. Tarnish-resistant and waterproof — shower with it on.', 5900, 7500, 'active', true),
  ('e1000000-0000-0000-0000-000000000020', 'Retro Sunglasses', 'retro-sunglasses', 'Thick acetate frames with UV400 polarized lenses. Inspired by 90s wraparound styles. Comes with a hard case and microfiber cloth.', 6900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000021', 'Canvas Backpack', 'canvas-backpack', 'Heavyweight waxed canvas backpack with leather trim. Padded laptop sleeve, multiple interior pockets, and adjustable straps. Built for daily carry.', 11900, null, 'active', false),
  ('e1000000-0000-0000-0000-000000000022', 'Crew Socks 3-Pack', 'crew-socks-3pack', 'Ribbed cotton-blend crew socks in three colorways. Cushioned sole and reinforced heel and toe. The details matter.', 2400, null, 'active', false);

-- ============================================
-- Products — Headwear (3)
-- ============================================
insert into products (id, name, slug, description, base_price, compare_at_price, status, featured) values
  ('e1000000-0000-0000-0000-000000000023', 'Embroidered Dad Cap', 'embroidered-dad-cap', 'Washed cotton twill six-panel cap with a pre-curved brim and embroidered logo. Adjustable brass buckle closure. Broken-in feel out of the box.', 3200, null, 'active', true),
  ('e1000000-0000-0000-0000-000000000024', 'Knit Beanie', 'knit-beanie', 'Ribbed merino wool beanie with a fold-over cuff. Keeps your head warm without the itch. One size fits all.', 2800, 3500, 'active', false),
  ('e1000000-0000-0000-0000-000000000025', 'Corduroy Bucket Hat', 'corduroy-bucket-hat', 'Wide-brim corduroy bucket hat with an embroidered logo. Crushable and packable — throw it in your bag and go.', 3800, null, 'active', false);

-- ============================================
-- Product Images
-- ============================================
insert into product_images (product_id, url, alt_text, sort_order, is_primary) values
  -- Tops
  ('e1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'Oversized Graphic Tee', 0, true),
  ('e1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=800&q=80', 'Oversized Graphic Tee - Back', 1, false),
  ('e1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', 'Essential Hoodie', 0, true),
  ('e1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1578768079470-4cf531ea4c06?w=800&q=80', 'Essential Hoodie - Side', 1, false),
  ('e1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1572495532056-8583af1cbae0?w=800&q=80', 'Washed Crewneck Sweatshirt', 0, true),
  ('e1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80', 'Puffer Vest', 0, true),
  ('e1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', 'Mesh Jersey', 0, true),
  ('e1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1608236415053-3691fae151f0?w=800&q=80', 'Corduroy Overshirt', 0, true),
  ('e1000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 'Cropped Varsity Jacket', 0, true),
  -- Bottoms
  ('e1000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', 'Relaxed Cargo Pants', 0, true),
  ('e1000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', 'Baggy Skate Denim', 0, true),
  ('e1000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80', 'Tech Joggers', 0, true),
  ('e1000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', 'Corduroy Pants', 0, true),
  ('e1000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80', 'Mesh Basketball Shorts', 0, true),
  -- Footwear
  ('e1000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80', 'Retro Runner Sneakers', 0, true),
  ('e1000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80', 'Retro Runner Sneakers - Side', 1, false),
  ('e1000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', 'Canvas High Tops', 0, true),
  ('e1000000-0000-0000-0000-000000000015', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80', 'Leather Platform Sneakers', 0, true),
  ('e1000000-0000-0000-0000-000000000016', 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80', 'Suede Chelsea Boots', 0, true),
  ('e1000000-0000-0000-0000-000000000017', 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80', 'Slide Sandals', 0, true),
  -- Accessories
  ('e1000000-0000-0000-0000-000000000018', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80', 'Crossbody Bag', 0, true),
  ('e1000000-0000-0000-0000-000000000019', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80', 'Chunky Chain Necklace', 0, true),
  ('e1000000-0000-0000-0000-000000000020', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', 'Retro Sunglasses', 0, true),
  ('e1000000-0000-0000-0000-000000000021', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', 'Canvas Backpack', 0, true),
  ('e1000000-0000-0000-0000-000000000022', 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80', 'Crew Socks 3-Pack', 0, true),
  -- Headwear
  ('e1000000-0000-0000-0000-000000000023', 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800&q=80', 'Embroidered Dad Cap', 0, true),
  ('e1000000-0000-0000-0000-000000000024', 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80', 'Knit Beanie', 0, true),
  ('e1000000-0000-0000-0000-000000000025', 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80', 'Corduroy Bucket Hat', 0, true);

-- ============================================
-- Product Variants
-- ============================================

-- Oversized Graphic Tee
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000001', 'S / Washed Black', 'GFX-S-BLK', 0, 15, '{"size": "S", "color": "Washed Black"}'),
  ('e1000000-0000-0000-0000-000000000001', 'M / Washed Black', 'GFX-M-BLK', 0, 25, '{"size": "M", "color": "Washed Black"}'),
  ('e1000000-0000-0000-0000-000000000001', 'L / Washed Black', 'GFX-L-BLK', 0, 20, '{"size": "L", "color": "Washed Black"}'),
  ('e1000000-0000-0000-0000-000000000001', 'XL / Washed Black', 'GFX-XL-BLK', 0, 12, '{"size": "XL", "color": "Washed Black"}'),
  ('e1000000-0000-0000-0000-000000000001', 'M / Off White', 'GFX-M-OFW', 0, 18, '{"size": "M", "color": "Off White"}'),
  ('e1000000-0000-0000-0000-000000000001', 'L / Off White', 'GFX-L-OFW', 0, 14, '{"size": "L", "color": "Off White"}');

-- Essential Hoodie
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000002', 'S / Black', 'HOOD-S-BLK', 0, 10, '{"size": "S", "color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000002', 'M / Black', 'HOOD-M-BLK', 0, 20, '{"size": "M", "color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000002', 'L / Black', 'HOOD-L-BLK', 0, 16, '{"size": "L", "color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000002', 'XL / Black', 'HOOD-XL-BLK', 0, 8, '{"size": "XL", "color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000002', 'M / Sage', 'HOOD-M-SAG', 0, 12, '{"size": "M", "color": "Sage"}'),
  ('e1000000-0000-0000-0000-000000000002', 'L / Sage', 'HOOD-L-SAG', 0, 10, '{"size": "L", "color": "Sage"}'),
  ('e1000000-0000-0000-0000-000000000002', 'M / Cream', 'HOOD-M-CRM', 0, 14, '{"size": "M", "color": "Cream"}');

-- Cargo Pants
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000008', 'S / Olive', 'CRG-S-OLV', 0, 12, '{"size": "S", "color": "Olive"}'),
  ('e1000000-0000-0000-0000-000000000008', 'M / Olive', 'CRG-M-OLV', 0, 18, '{"size": "M", "color": "Olive"}'),
  ('e1000000-0000-0000-0000-000000000008', 'L / Olive', 'CRG-L-OLV', 0, 14, '{"size": "L", "color": "Olive"}'),
  ('e1000000-0000-0000-0000-000000000008', 'M / Black', 'CRG-M-BLK', 0, 16, '{"size": "M", "color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000008', 'L / Black', 'CRG-L-BLK', 0, 10, '{"size": "L", "color": "Black"}');

-- Retro Runners
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000013', 'US 8', 'RUN-8', 0, 8, '{"size": "US 8"}'),
  ('e1000000-0000-0000-0000-000000000013', 'US 9', 'RUN-9', 0, 14, '{"size": "US 9"}'),
  ('e1000000-0000-0000-0000-000000000013', 'US 10', 'RUN-10', 0, 18, '{"size": "US 10"}'),
  ('e1000000-0000-0000-0000-000000000013', 'US 11', 'RUN-11', 0, 12, '{"size": "US 11"}'),
  ('e1000000-0000-0000-0000-000000000013', 'US 12', 'RUN-12', 0, 6, '{"size": "US 12"}');

-- Platform Sneakers
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000015', 'US 7', 'PLT-7', 0, 6, '{"size": "US 7"}'),
  ('e1000000-0000-0000-0000-000000000015', 'US 8', 'PLT-8', 0, 10, '{"size": "US 8"}'),
  ('e1000000-0000-0000-0000-000000000015', 'US 9', 'PLT-9', 0, 12, '{"size": "US 9"}'),
  ('e1000000-0000-0000-0000-000000000015', 'US 10', 'PLT-10', 0, 8, '{"size": "US 10"}');

-- Dad Cap
insert into product_variants (product_id, name, sku, price_offset, stock_quantity, options) values
  ('e1000000-0000-0000-0000-000000000023', 'Black', 'CAP-BLK', 0, 30, '{"color": "Black"}'),
  ('e1000000-0000-0000-0000-000000000023', 'Stone', 'CAP-STN', 0, 25, '{"color": "Stone"}'),
  ('e1000000-0000-0000-0000-000000000023', 'Navy', 'CAP-NAV', 0, 20, '{"color": "Navy"}'),
  ('e1000000-0000-0000-0000-000000000023', 'Forest', 'CAP-FOR', 0, 15, '{"color": "Forest"}');

-- ============================================
-- Product Categories
-- ============================================
insert into product_categories (product_id, category_id) values
  -- Tops
  ('e1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000001'),
  ('e1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000001'),
  -- Bottoms
  ('e1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000002'),
  ('e1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000002'),
  ('e1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000002'),
  ('e1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000002'),
  ('e1000000-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000002'),
  -- Footwear
  ('e1000000-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000003'),
  ('e1000000-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000003'),
  ('e1000000-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000003'),
  ('e1000000-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000003'),
  ('e1000000-0000-0000-0000-000000000017', 'c1000000-0000-0000-0000-000000000003'),
  -- Accessories
  ('e1000000-0000-0000-0000-000000000018', 'c1000000-0000-0000-0000-000000000004'),
  ('e1000000-0000-0000-0000-000000000019', 'c1000000-0000-0000-0000-000000000004'),
  ('e1000000-0000-0000-0000-000000000020', 'c1000000-0000-0000-0000-000000000004'),
  ('e1000000-0000-0000-0000-000000000021', 'c1000000-0000-0000-0000-000000000004'),
  ('e1000000-0000-0000-0000-000000000022', 'c1000000-0000-0000-0000-000000000004'),
  -- Headwear
  ('e1000000-0000-0000-0000-000000000023', 'c1000000-0000-0000-0000-000000000005'),
  ('e1000000-0000-0000-0000-000000000024', 'c1000000-0000-0000-0000-000000000005'),
  ('e1000000-0000-0000-0000-000000000025', 'c1000000-0000-0000-0000-000000000005');
