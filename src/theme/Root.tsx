import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AuthError, AuthResponse, createClient, Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styles from './Root.module.css';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { ILoginData } from '../interface/ILoginData';
import { ISignupData } from '../interface/ISignupData';

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

  const [loginData, setLoginData] = useState<ILoginData>({ email: '', password: '' }); // Stores form data to be later validated
  const [signupData, setSignupData] = useState<ISignupData>({ email: '', password: '', passwordConfirm: '' }); // Stores form data to be later validated

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
              {showSignup ? (
                /* ---------------------- REGISTER FORM --------------------- */
                <RegisterForm
                  setLoading={setLoading}
                  signupData={signupData}
                  setSignupData={setSignupData}
                  showSignup={showSignup}
                  setShowSignup={setShowSignup}
                />
              ) : (
                /* ----------------------- LOGIN FORM ----------------------- */
                <LoginForm
                  setLoading={setLoading}
                  loginData={loginData}
                  setLoginData={setLoginData}
                  showSignup={showSignup}
                  setShowSignup={setShowSignup}
                />
              )}
            </>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Root;
