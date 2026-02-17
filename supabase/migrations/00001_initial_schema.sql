-- Velora E-Commerce Schema
-- All prices stored in cents (matches Stripe)

-- ============================================
-- Extensions
-- ============================================
create extension if not exists "uuid-ossp";

-- ============================================
-- Profiles (extends auth.users)
-- ============================================
create type user_role as enum ('customer', 'admin');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================
-- Categories (hierarchical)
-- ============================================
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  parent_id uuid references categories(id) on delete set null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_categories_slug on categories(slug);
create index idx_categories_parent on categories(parent_id);

-- ============================================
-- Products
-- ============================================
create type product_status as enum ('draft', 'active', 'archived');

create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  base_price int not null, -- cents
  compare_at_price int, -- cents, for showing "was $X"
  status product_status not null default 'draft',
  featured boolean not null default false,
  fts tsvector generated always as (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_products_slug on products(slug);
create index idx_products_status on products(status);
create index idx_products_featured on products(featured) where featured = true;
create index idx_products_fts on products using gin(fts);

-- ============================================
-- Product Images
-- ============================================
create table product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order int not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_product_images_product on product_images(product_id);

-- ============================================
-- Product Variants
-- ============================================
create table product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null, -- e.g. "Small / Black"
  sku text unique,
  price_offset int not null default 0, -- cents added to base_price
  stock_quantity int not null default 0,
  options jsonb not null default '{}', -- e.g. {"size": "S", "color": "Black"}
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_product_variants_product on product_variants(product_id);

-- ============================================
-- Product Categories (many-to-many)
-- ============================================
create table product_categories (
  product_id uuid not null references products(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  primary key (product_id, category_id)
);

create index idx_product_categories_category on product_categories(category_id);

-- ============================================
-- Carts (supports guest + authenticated)
-- ============================================
create table carts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  anonymous_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint carts_owner_check check (user_id is not null or anonymous_id is not null)
);

create index idx_carts_user on carts(user_id);
create index idx_carts_anonymous on carts(anonymous_id);

-- ============================================
-- Cart Items
-- ============================================
create table cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid not null references carts(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  variant_id uuid references product_variants(id) on delete set null,
  quantity int not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_cart_items_cart on cart_items(cart_id);

-- ============================================
-- Orders
-- ============================================
create type order_status as enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

create table orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  status order_status not null default 'pending',
  subtotal int not null, -- cents
  shipping_cost int not null default 0,
  tax int not null default 0,
  total int not null, -- cents
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  shipping_name text,
  shipping_address_line1 text,
  shipping_address_line2 text,
  shipping_city text,
  shipping_state text,
  shipping_postal_code text,
  shipping_country text,
  billing_name text,
  billing_address_line1 text,
  billing_address_line2 text,
  billing_city text,
  billing_state text,
  billing_postal_code text,
  billing_country text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_orders_user on orders(user_id);
create index idx_orders_number on orders(order_number);
create index idx_orders_status on orders(status);

-- ============================================
-- Order Items (snapshot at purchase time)
-- ============================================
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  variant_id uuid references product_variants(id) on delete set null,
  product_name text not null,
  variant_name text,
  unit_price int not null, -- cents
  quantity int not null,
  image_url text,
  created_at timestamptz not null default now()
);

create index idx_order_items_order on order_items(order_id);

-- ============================================
-- Addresses
-- ============================================
create table addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text, -- "Home", "Work", etc.
  full_name text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'US',
  phone text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_addresses_user on addresses(user_id);

-- ============================================
-- Wishlist Items
-- ============================================
create table wishlist_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index idx_wishlist_user on wishlist_items(user_id);

-- ============================================
-- Updated_at trigger function
-- ============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables with updated_at
create trigger set_updated_at before update on profiles for each row execute function update_updated_at();
create trigger set_updated_at before update on categories for each row execute function update_updated_at();
create trigger set_updated_at before update on products for each row execute function update_updated_at();
create trigger set_updated_at before update on product_variants for each row execute function update_updated_at();
create trigger set_updated_at before update on carts for each row execute function update_updated_at();
create trigger set_updated_at before update on cart_items for each row execute function update_updated_at();
create trigger set_updated_at before update on orders for each row execute function update_updated_at();
create trigger set_updated_at before update on addresses for each row execute function update_updated_at();

-- ============================================
-- Row Level Security
-- ============================================

-- Admin check function (security definer bypasses RLS to avoid infinite recursion)
create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer stable;

-- Profiles
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles for select using (is_admin());

-- Categories (public read)
alter table categories enable row level security;
create policy "Anyone can view categories" on categories for select using (true);
create policy "Admins can manage categories" on categories for all using (is_admin());

-- Products (public read for active)
alter table products enable row level security;
create policy "Anyone can view active products" on products for select using (status = 'active');
create policy "Admins can manage products" on products for all using (is_admin());

-- Product Images (public read)
alter table product_images enable row level security;
create policy "Anyone can view product images" on product_images for select using (true);
create policy "Admins can manage product images" on product_images for all using (is_admin());

-- Product Variants (public read)
alter table product_variants enable row level security;
create policy "Anyone can view product variants" on product_variants for select using (true);
create policy "Admins can manage product variants" on product_variants for all using (is_admin());

-- Product Categories (public read)
alter table product_categories enable row level security;
create policy "Anyone can view product categories" on product_categories for select using (true);
create policy "Admins can manage product categories" on product_categories for all using (is_admin());

-- Carts
alter table carts enable row level security;
create policy "Users can manage own carts" on carts for all using (auth.uid() = user_id);

-- Cart Items
alter table cart_items enable row level security;
create policy "Users can manage own cart items" on cart_items for all using (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);

-- Orders
alter table orders enable row level security;
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Admins can manage all orders" on orders for all using (is_admin());

-- Order Items
alter table order_items enable row level security;
create policy "Users can view own order items" on order_items for select using (
  exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Admins can view all order items" on order_items for select using (is_admin());

-- Addresses
alter table addresses enable row level security;
create policy "Users can manage own addresses" on addresses for all using (auth.uid() = user_id);

-- Wishlist
alter table wishlist_items enable row level security;
create policy "Users can manage own wishlist" on wishlist_items for all using (auth.uid() = user_id);

-- ============================================
-- Order number sequence
-- ============================================
create sequence order_number_seq start 1000;

create or replace function generate_order_number()
returns trigger as $$
begin
  new.order_number = 'VLR-' || lpad(nextval('order_number_seq')::text, 6, '0');
  return new;
end;
$$ language plpgsql;

create trigger set_order_number
  before insert on orders
  for each row execute function generate_order_number();
