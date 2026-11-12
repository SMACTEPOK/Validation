import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { TextField } from './TextField';
import { Toast } from './Toast';
import { required, email, minLength, composeValidators } from '../utils/validators';

export const LoginForm = () => {
  const [toast, setToast] = useState(null);

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validationRules: {
      email: composeValidators(required, email),
      password: composeValidators(required, minLength(8))
    },
    onSubmit: async (vals) => {
      await new Promise(r => setTimeout(r, 1000));
      console.log('Login:', vals);
      setToast({ msg: 'Вхід успішний!', type: 'success' });
    }
  });

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">01 / Форма входу (Login)</h2>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email && errors.email} />
        <TextField label="Пароль" name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={touched.password && errors.password} />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Вхід...' : 'Увійти'}
        </button>
      </form>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
