import React from 'react';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import EmailInput from '../EmailInput/index';
import { ISignupData } from '@site/src/interface/ISignupData';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface IProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signupData: ISignupData;
  setSignupData: React.Dispatch<React.SetStateAction<ISignupData>>;
  showSignup: boolean;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setLoading, signupData, setSignupData, showSignup, setShowSignup }: IProps) => {
  const { siteConfig }: any = useDocusaurusContext();
  const supabase = createClient(siteConfig.customFields.supabaseUrl, siteConfig.customFields.supabaseAnonKey);

  let schema = yup
    .object({
      email: yup.string().required('Email obrigatório'),
      password: yup.string().required('Senha obrigatória').min(8, 'Sua senha conter no mínimo 8 caracteres'),
      passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'As senhas inseridas não são iguais'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupData>({ resolver: yupResolver(schema) });

  const handleSignup: SubmitHandler<any> = async (e) => {
    e.preventDefault();
    console.log('signup');

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
    <form method='POST' onSubmit={(e) => e.preventDefault()} className={styles.form} noValidate>
      <div className={styles.inputWrapper}>
        <div className={styles.formItem}>
          <label htmlFor='email'>email</label>
          <EmailInput data={signupData} setData={setSignupData} {...register('email')} />
        </div>
        <div className={styles.formItem}>
          <label htmlFor='password'>senha</label>
          <input
            type='password'
            name='Password'
            id='signupPassword'
            placeholder='senha'
            {...register('password')}
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
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className={styles.formItem}>
          <label htmlFor='password'>confirmar senha</label>
          <input
            type='password'
            name='Confirm Password'
            id='passwordConfirm'
            placeholder='confirmar senha'
            {...register('passwordConfirm')}
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
          {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
        </div>
      </div>

      <button className={styles.loginButton} type='submit' onClick={handleSubmit(handleSignup)} aria-live='polite'>
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

export default RegisterForm;
