import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AuthError, AuthResponse, createClient, Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styles from './Root.module.css';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../components/LoginForm';

interface ISession {
  data: {
    session: Session | null;
  };
  error: AuthError | null;
}

const Root = ({ children }) => {
  const { siteConfig }: any = useDocusaurusContext();
  const supabase = createClient(siteConfig.customFields.supabaseUrl, siteConfig.customFields.supabaseAnonKey);

  const [success, setSuccess] = useState(false); // When true, will unlock the site
  const [loading, setLoading] = useState(false); // Used to display a loading when handling requisitions
  const [showSignup, setShowSignup] = useState(false); // Controls if login or signup form shows up

  const [loginData, setLoginData] = useState({ email: '', password: '' }); // Stores form data to be later validated
  const [signupData, setSignupData] = useState({ email: '', password: '', passwordConfirm: '' }); // Stores form data to be later validated

  useEffect(() => {
    const getSession = async () => {
      console.log('getSession');

      try {
        const { data, error }: ISession = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session !== null) setSuccess(true);
      } catch (error) {
        throw error.message;
      }
    };

    getSession();
  }, [loading]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = signupData.email;
    const password = signupData.password;

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
              {/* LOGIN FORM */}

              <LoginForm
                setLoading={setLoading}
                loginData={loginData}
                setLoginData={setLoginData}
                showSignup={showSignup}
                setShowSignup={setShowSignup}
              />

              {/* SIGNUP FORM */}
              <form onSubmit={handleSignup} className={styles.form} style={{ display: showSignup ? 'flex' : 'none' }}>
                <div className={styles.inputWrapper}>
                  <div className={styles.formItem}>
                    <label htmlFor='email'>email</label>
                    <input
                      type='email'
                      name='Email'
                      id='email'
                      placeholder='Email'
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData((prev) => {
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
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData((prev) => {
                          return {
                            ...prev,
                            password: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className={styles.formItem}>
                    <label htmlFor='password'>confirmar senha</label>
                    <input
                      type='password'
                      name='Confirm Password'
                      id='passwordConfirm'
                      placeholder='Senha'
                      value={signupData.passwordConfirm}
                      onChange={(e) =>
                        setSignupData((prev) => {
                          return {
                            ...prev,
                            passwordConfirm: e.target.value,
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
