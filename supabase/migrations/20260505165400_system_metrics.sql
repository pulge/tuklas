create table system_metrics (
  id uuid primary key default gen_random_uuid(),
  key text not null,        -- 'jsearch_requests'
  value integer default 0,
  month text not null,      -- '2026-05'
  updated_at timestamptz default now(),
  unique(key, month)
);

create or replace function increment_metric(p_key text, p_month text)
returns void as $$
  insert into system_metrics (key, month, value)
  values (p_key, p_month, 1)
  on conflict (key, month)
  do update set value = system_metrics.value + 1, updated_at = now();
$$ language sql;
