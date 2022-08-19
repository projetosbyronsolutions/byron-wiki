import { createClient } from '@supabase/supabase-js';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const supabase = () => {
  const { siteConfig } = useDocusaurusContext();
  return createClient(
    'https://cqtgrkfilefcjwlhtfzc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdGdya2ZpbGVmY2p3bGh0ZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA5MTIxNTAsImV4cCI6MTk3NjQ4ODE1MH0.p_QYPX5aLQg02Y1fHz7w037d9BPjIffoZ56-B7qi3LU'
  );
};
