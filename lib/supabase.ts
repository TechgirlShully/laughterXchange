import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://oflydtxtjqetemnonxrg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mbHlkdHh0anFldGVtbm9ueHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNzg3NDEsImV4cCI6MjA5MTY1NDc0MX0.mJKcZ9PgqJoeX59gdXQSetQNqHwfWQ3ErVM6AfsWjaY"
);
