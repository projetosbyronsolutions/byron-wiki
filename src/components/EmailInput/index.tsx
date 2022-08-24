import React, { useState } from 'react';
import { ILoginData } from '../../interface/ILoginData';
import styles from './styles.module.css';

interface IProps {
  loginData: ILoginData;
  setLoginData: React.Dispatch<React.SetStateAction<ILoginData>>;
}

const EmailInput = ({ loginData, setLoginData }: IProps) => {
  const [emailValue, setEmailValue] = useState('');
  const [focus, setFocus] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Checks if email contains '@' substring. If so, sets loginData to the target value. Elsewise, appends @byronsolutions.com to the string
    if (e.target.value.includes('@')) {
      setLoginData((prev) => {
        return {
          ...prev,
          email: e.target.value,
        };
      });
    } else {
      setLoginData((prev) => {
        return {
          ...prev,
          email: e.target.value + '@byronsolutions.com',
        };
      });
    }

    setEmailValue(e.target.value);
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.focus);
  };

  return (
    <div className={styles.inputWrapper} style={{ border: focus ? '2px solid var(--ifm-color-primary)' : '' }}>
      <input
        className={styles.input}
        type='email'
        name='Email'
        id='email'
        placeholder='Email'
        value={emailValue}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <span className={styles.emailPreset}>@byronsolutions.com</span>
    </div>
  );
};

export default EmailInput;
