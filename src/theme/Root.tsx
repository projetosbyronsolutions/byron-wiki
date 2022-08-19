import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AuthError, createClient, Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import styles from './Root.module.css';
// import { supabase } from '../api/supabaseClient';

const Root = ({ children }) => {
  const { siteConfig } = useDocusaurusContext();
  const supabase = createClient(
    'https://cqtgrkfilefcjwlhtfzc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdGdya2ZpbGVmY2p3bGh0ZnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA5MTIxNTAsImV4cCI6MTk3NjQ4ODE1MH0.p_QYPX5aLQg02Y1fHz7w037d9BPjIffoZ56-B7qi3LU'
  );
  // const supabase = createClient(siteConfig.supabaseUrl, siteConfig.supabaseAnonKey);

  const [success, setSuccess] = useState(false); // When true, will unlock the site
  const [loading, setLoading] = useState(false); // Used to display a loading when handling requisitions
  const [showSignup, setShowSignup] = useState(false); // Controls if login or signup form shows up

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = loginData.email;
    const password = loginData.password;

    try {
      let { error } = await supabase.auth.signInWithOtp({ email });

      if (error) {
        throw error;
      } else {
        setSuccess(true);
      }
    } catch (err) {
      throw err.error_description || err.message;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = loginData.email;
    const password = loginData.password;

    try {
      let { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw error;
      } else {
        setSuccess(true);
      }
    } catch (err) {
      throw err.error_description || err.message;
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {success ? (
        <>{children}</>
      ) : (
        <div className={styles.main}>
          {loading ? (
            'loading...'
          ) : (
            <>
              <form onSubmit={showSignup ? handleSignup : handleLogin} className={styles.form}>
                <div className={styles.inputWrapper}>
                  <div className={styles.formItem}>
                    <label htmlFor='email'>email</label>
                    <input
                      type='email'
                      name='Email'
                      id='email'
                      placeholder='Email'
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData((prev) => {
                          return {
                            ...prev,
                            email: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className={styles.formItem}>
                    <label htmlFor='password'>senha</label>
                    <input
                      type='password'
                      name='Password'
                      id='password'
                      placeholder='Senha'
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => {
                          return {
                            ...prev,
                            password: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                </div>

                <button className={styles.loginButton} type='submit' aria-live='polite'>
                  {showSignup ? 'Cadastrar' : 'Entrar'}
                </button>

                <div>
                  <span>ou você pode </span>
                  <button
                    className={styles.switchButton}
                    type='button'
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSignup((prev) => !prev);
                    }}
                  >
                    {showSignup ? 'fazer login' : 'se cadastrar'}
                  </button>
                  <span>!</span>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Root;
