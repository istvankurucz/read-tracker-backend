import { createClient } from "@supabase/supabase-js";

// Clients
export const supabase = createClient(process.env.SUPABASE_URL!, process.env.ANON_KEY!);
export const supabaseAdmin = createClient(process.env.SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);

// Storage name
export const bookCoverPhotosBucket = "book-cover-photos" as const;
