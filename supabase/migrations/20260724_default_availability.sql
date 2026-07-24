-- Insert 24/7 availability (all 7 days x all 24 hours = 168 rows) for every
-- existing profile that does not already have any availability entries.

INSERT INTO availabilities (profile_id, day_of_week, hour)
SELECT
  p.id                        AS profile_id,
  d.day::text                 AS day_of_week,
  h.hour::text                AS hour
FROM profiles p
CROSS JOIN generate_series(0, 6)  AS d(day)
CROSS JOIN generate_series(0, 23) AS h(hour)
WHERE NOT EXISTS (
  SELECT 1
  FROM availabilities a
  WHERE a.profile_id = p.id
);
