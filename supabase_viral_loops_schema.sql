-- 1. Add Viral Loop columns
ALTER TABLE waitlist 
ADD COLUMN referral_code text UNIQUE,
ADD COLUMN referred_by text,
ADD COLUMN referral_count integer DEFAULT 0,
ADD COLUMN position integer;

-- 2. Backfill position for existing users based on when they joined
WITH numbered AS (
  SELECT email, ROW_NUMBER() OVER (ORDER BY created_at ASC) as rnum
  FROM waitlist
)
UPDATE waitlist w
SET position = n.rnum
FROM numbered n
WHERE w.email = n.email;

-- 3. Trigger to automatically assign a position to new signups
CREATE OR REPLACE FUNCTION set_initial_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.position IS NULL THEN
    SELECT COALESCE(MAX(position), 0) + 1 INTO NEW.position FROM waitlist;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_position
BEFORE INSERT ON waitlist
FOR EACH ROW
EXECUTE FUNCTION set_initial_waitlist_position();

-- 4. Trigger to automatically reward referrers and shift others down
CREATE OR REPLACE FUNCTION process_referral_on_insert()
RETURNS TRIGGER AS $$
DECLARE
  old_pos INTEGER;
  new_pos INTEGER;
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    -- Find the referrer's current position
    SELECT position INTO old_pos
    FROM waitlist
    WHERE referral_code = NEW.referred_by;

    IF old_pos IS NOT NULL THEN
      -- Calculate their new position (moving up 5 spots, max 1st place)
      new_pos := GREATEST(1, old_pos - 5);

      -- If they actually moved up, shift everyone else in that gap down by 1
      IF new_pos < old_pos THEN
        UPDATE waitlist
        SET position = position + 1
        WHERE position >= new_pos AND position < old_pos;
      END IF;

      -- Update the referrer's new rank and count
      UPDATE waitlist
      SET 
        referral_count = COALESCE(referral_count, 0) + 1,
        position = new_pos
      WHERE referral_code = NEW.referred_by;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_process_referral
AFTER INSERT ON waitlist
FOR EACH ROW
EXECUTE FUNCTION process_referral_on_insert();
