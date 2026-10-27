/*
 * Public Supabase browser settings for AI Study Assistant.
 * 
 * TO ENABLE LIVE SMS & EMAIL OTP AUTHENTICATION:
 * 1. Create a free project at https://supabase.com
 * 2. In your Supabase project dashboard, navigate to:
 *    Project Settings (gear icon) -> API
 * 3. Copy your "Project URL" and paste into `supabaseUrl` below.
 * 4. Copy your "Project API keys" -> `anon` `public` key and paste into `supabaseAnonKey` below.
 *    (NEVER expose your `service_role` secret key!)
 * 
 * NOTE: If these values are left empty, the app runs in Instant Access / Demo Mode
 * where you can click "Continue as Guest" or enter demo code 123456 to sign in immediately.
 */
window.AUTH_CONFIG = {
  supabaseUrl: '',      // e.g. 'https://xyzabcdefg.supabase.co'
  supabaseAnonKey: '',  // e.g. 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
