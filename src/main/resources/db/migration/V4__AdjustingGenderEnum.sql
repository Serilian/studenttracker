CREATE TYPE gender as ENUM ('MALE', 'FEMALE', 'UNKNOWN');

ALTER TABLE student ALTER COLUMN gender TYPE gender USING (gender::gender);