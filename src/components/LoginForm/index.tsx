import { ILoginData } from '../../interface/ILoginData';
import React from 'react';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createClient } from '@supabase/supabase-js';
import EmailInput from '../EmailInput/index';

interface IProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loginData: ILoginData;
  setLoginData: React.Dispatch<React.SetStateAction<ILoginData>>;
  showSignup: boolean;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ setLoading, loginData, setLoginData, showSignup, setShowSignup }: IProps) => {
  const { siteConfig }: any = useDocusaurusContext();
  const supabase = createClient(siteConfig.customFields.supabaseUrl, siteConfig.customFields.supabaseAnonKey);

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

  return (
    <form onSubmit={handleLogin} className={styles.form} noValidate>
      <div className={styles.inputWrapper}>
        <div className={styles.formItem}>
          <label htmlFor='email'>email</label>
          <EmailInput data={loginData} setData={setLoginData} />
        </div>
        <div className={styles.formItem}>
          <label htmlFor='password'>senha</label>
          <input
            type='password'
            name='Password'
            id='loginPassword'
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
  );
};

export default LoginForm;
