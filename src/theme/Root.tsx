import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AuthError, AuthResponse, createClient, Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styles from './Root.module.css';
import 'react-toastify/dist/ReactToastify.css';

interface ISession {
  data: {
    session: Session | null;
  };
  error: AuthError | null;
}

const Root = ({ children }) => {
  const { siteConfig }: any = useDocusaurusContext();
  const [success, setSuccess] = useState(false); // When true, will unlock the site
  const [loading, setLoading] = useState(false); // Used to display a loading when handling requisitions
  const [showSignup, setShowSignup] = useState(false); // Controls if login or signup form shows up

  const [loginData, setLoginData] = useState({ email: '', password: '' }); // Stores form data to be later validated


  useEffect(() => {
    if (siteConfig.customFields.devEnv === 'true') {
      console.log("Ambiente de desenvolvimento - pulando autenticação");
      setSuccess(true);
      return;
    }
     const supabase = createClient(siteConfig.customFields.supabaseUrl, siteConfig.customFields.supabaseAnonKey);


    const getSession = async () => {
      console.log('Getting session');

      try {
        const { data, error }: ISession = await supabase.auth.getSession();

        if (error) {
          toast.error(error.message);
          throw error;
        }

        if (data.session !== null) {
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error getting session:", error.message);
      }
    };

    getSession();
  }, [siteConfig.customFields]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = loginData.email;
    const password = loginData.password;

    try {
      let { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        toast.error(error.message);
        throw error;
      }
    } catch (error) {
      throw error.message;
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
      let { error }: AuthResponse = await supabase.auth.signUp({ email, password });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast.error(error.message);
      throw error.message;
    } finally {
      setLoading(false);
      toast.success('Confirme seu email para finalizar seu cadastro!');
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />

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
