CREATE TABLE public.executive_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT '',
  phone_number TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  q1 TEXT NOT NULL DEFAULT '',
  q2 TEXT NOT NULL DEFAULT '',
  q3 TEXT NOT NULL DEFAULT '',
  q4 TEXT NOT NULL DEFAULT '',
  role_answer TEXT NOT NULL DEFAULT '',
  submitted BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.executive_applications TO authenticated;
GRANT ALL ON public.executive_applications TO service_role;

ALTER TABLE public.executive_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Applicants can view their own application"
  ON public.executive_applications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Applicants can create their own application"
  ON public.executive_applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Applicants can update their own application"
  ON public.executive_applications FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER executive_applications_updated_at
  BEFORE UPDATE ON public.executive_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();