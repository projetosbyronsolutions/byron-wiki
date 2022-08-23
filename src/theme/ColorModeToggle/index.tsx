import React from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import { createClient } from '@supabase/supabase-js';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ColorModeToggleWrapper = (props) => {
  const { siteConfig }: any = useDocusaurusContext();
  const supabase = createClient(siteConfig.customFields.supabaseUrl, siteConfig.customFields.supabaseAnonKey);

  return (
    <>
      <a className={styles.link} onClick={() => supabase.auth.signOut().then(() => window.location.reload())}>
        Sair
      </a>
      <ColorModeToggle {...props} />
    </>
  );
};

export default ColorModeToggleWrapper;
