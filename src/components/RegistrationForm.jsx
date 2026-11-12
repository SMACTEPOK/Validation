import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { TextField } from './TextField';
import { AsyncTextField } from './AsyncTextField';
import { Toast } from './Toast';
import { required, minLength, email, minAge, matchPassword, composeValidators } from '../utils/validators';
import { checkUsernameAvailability, mockRegisterUser } from '../services/mockApi';

export const RegistrationForm = () => {
  const [toast, setToast] = useState(null);

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, reset } = useForm({
    initialValues: { username: '', firstName: '', lastName: '', birthDate: '', email: '', password: '', confirmPassword: '' },
    validationRules: {
      username: required,
      firstName: composeValidators(required, minLength(2)),
      lastName: composeValidators(required, minLength(2)),
      birthDate: composeValidators(required, minAge(18)),
      email: composeValidators(required, email),
      password: composeValidators(required, minLength(8)),
      confirmPassword: composeValidators(required, matchPassword('password'))
    },
    onSubmit: async (vals) => {
      try {
        await mockRegisterUser(vals);
        setToast({ msg: 'Реєстрацію завершено успішно!', type: 'success' });
        reset();
      } catch (err) {
        if (err.response?.data?.errors?.general) {
          setToast({ msg: err.response.data.errors.general, type: 'error' });
        } else {
          setToast({ msg: 'Виникла помилка сервера', type: 'error' });
        }
        throw err;
      }
    }
  });

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">02 + 05 / Реєстрація (Async + Server Errors)</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <AsyncTextField label="Ім'я користувача (перевірка на сервері)" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} error={touched.username && errors.username} asyncValidator={checkUsernameAvailability} />
        <TextField label="Email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email && errors.email} />
        
        <TextField label="Ім'я" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={touched.firstName && errors.firstName} />
        <TextField label="Прізвище" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={touched.lastName && errors.lastName} />
        
        <TextField label="Дата народження (18+)" name="birthDate" type="date" value={values.birthDate} onChange={handleChange} onBlur={handleBlur} error={touched.birthDate && errors.birthDate} />
        <div></div> {/* Spacer */}

        <TextField label="Пароль" name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={touched.password && errors.password} />
        <TextField label="Підтвердження пароля" name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} error={touched.confirmPassword && errors.confirmPassword} />

        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
          </button>
        </div>
      </form>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
