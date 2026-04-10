// This client re-exports the main supabase instance.
// All code should import from "@/lib/supabase" directly.
// This file exists for backwards compatibility only.
import { supabase } from '@/lib/supabase';

export { supabase };
