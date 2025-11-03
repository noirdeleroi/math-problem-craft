-- Enable Row Level Security on egemathbase table
ALTER TABLE public.egemathbase ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to egemathbase table
CREATE POLICY "Allow public read access to egemathbase"
ON public.egemathbase
FOR SELECT
USING (true);