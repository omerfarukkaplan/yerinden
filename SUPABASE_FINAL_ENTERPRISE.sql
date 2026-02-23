
create extension if not exists "uuid-ossp";

create table cities (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  premium_slot_limit int default 30,
  premium_slot_used int default 0
);

create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null
);

create table producers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  city_id uuid references cities(id),
  category_id uuid references categories(id),
  premium_type text default 'free',
  premium_until timestamptz,
  created_at timestamptz default now()
);

create table b2b_requests (
  id uuid primary key default uuid_generate_v4(),
  company_name text,
  contact_email text,
  created_at timestamptz default now()
);

alter table producers enable row level security;
create policy "public read" on producers for select using (true);

create or replace function activate_premium(pid uuid, ptype text)
returns void language plpgsql security definer as $$
declare city_uuid uuid;
declare slot_limit int;
declare slot_used int;
begin
  select city_id into city_uuid from producers where id = pid;
  select premium_slot_limit, premium_slot_used
  into slot_limit, slot_used from cities where id = city_uuid;

  if slot_used >= slot_limit then
    raise exception 'Slot dolu';
  end if;

  update producers
  set premium_type = ptype,
      premium_until = now() + interval '30 days'
  where id = pid;

  update cities
  set premium_slot_used = premium_slot_used + 1
  where id = city_uuid;
end;
$$;

create or replace function downgrade_expired_premium()
returns void language plpgsql as $$
declare rec record;
begin
  for rec in select id, city_id from producers
    where premium_until < now() and premium_type != 'free'
  loop
    update producers set premium_type='free' where id=rec.id;
    update cities set premium_slot_used=premium_slot_used-1 where id=rec.city_id;
  end loop;
end;
$$;
