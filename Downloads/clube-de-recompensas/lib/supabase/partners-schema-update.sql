-- Add status field to partners table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'partners' AND column_name = 'status') THEN
    ALTER TABLE partners ADD COLUMN status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));
    ALTER TABLE partners ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE;
    ALTER TABLE partners ADD COLUMN rejected_at TIMESTAMP WITH TIME ZONE;
    ALTER TABLE partners ADD COLUMN rejection_reason TEXT;
  END IF;
END $$;

-- Create index for faster lookups by status
CREATE INDEX IF NOT EXISTS partners_status_idx ON partners(status);
