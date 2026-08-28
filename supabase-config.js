/* =========================================================
   SUPABASE CONFIG
   ========================================================= */

const SUPABASE_URL =
  "https://qcigatfisvuflkrtheiu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_pGNS6j_l_71WHuMQZdaSYQ_J1EBXfk7";


/* Supabase client */
const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
