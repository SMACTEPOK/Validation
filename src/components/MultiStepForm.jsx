import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { TextField } from './TextField';
import { Toast } from './Toast';
import { required, email, minLength, composeValidators } from '../utils/validators';

const STEPS = ['Особиста інформація', 'Адреса доставки', 'Оплата'];
const STEP_FIELDS = [
  ['firstName', 'email'],
  ['address', 'city'],
  ['cardNumber']
];

export const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, validateStep } = useForm({
    initialValues: { firstName: '', email: '', address: '', city: '', cardNumber: '' },
    validationRules: {
      firstName: composeValidators(required, minLength(2)),
      email: composeValidators(required, email),
      address: required,
      city: required,
      cardNumber: composeValidators(required, minLength(16))
    },
    onSubmit: async (vals) => {
      await new Promise(r => setTimeout(r, 1000));
      setToast({ msg: 'Замовлення успішно оформлено!', type: 'success' });
      setStep(0);
    }
  });

  const handleNext = () => {
    if (validateStep(STEP_FIELDS[step])) {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">ІНДИВІДУАЛЬНЕ / Багатокрокова форма</h2>
      
      <div className="stepper">
        {STEPS.map((s, i) => (
          <div key={i} className={`step-item ${i === step ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}>
            <div className="step-num">{i + 1}</div>
            <div className="step-label">{s}</div>
          </div>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if (step === 2) handleSubmit(); }}>
        {step === 0 && (
          <>
            <TextField label="Ім'я" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={touched.firstName && errors.firstName} />
            <TextField label="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email && errors.email} />
          </>
        )}
        {step === 1 && (
          <>
            <TextField label="Адреса" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} error={touched.address && errors.address} />
            <TextField label="Місто" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} error={touched.city && errors.city} />
          </>
        )}
        {step === 2 && (
          <>
            <TextField label="Номер картки" name="cardNumber" value={values.cardNumber} onChange={handleChange} onBlur={handleBlur} error={touched.cardNumber && errors.cardNumber} placeholder="0000 0000 0000 0000" />
            <div style={{ background: 'var(--color-background)', border: '2px solid var(--color-border)', padding: '16px', marginTop: '16px' }}>
              <h4 style={{ margin: '0 0 10px', color: 'var(--color-white)' }}>Перевірте дані:</h4>
              <p style={{ margin: '4px 0', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Ім'я: {values.firstName}</p>
              <p style={{ margin: '4px 0', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Email: {values.email}</p>
              <p style={{ margin: '4px 0', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Адреса: {values.address}, {values.city}</p>
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
          <button type="button" className="btn" onClick={() => setStep(s => s - 1)} disabled={step === 0}>
            ← Назад
          </button>
          {step < 2 ? (
            <button type="button" className="btn" onClick={handleNext}>
              Далі →
            </button>
          ) : (
            <button type="submit" className="btn" disabled={isSubmitting} style={{ background: 'var(--color-white)', color: 'var(--color-ink)' }}>
              {isSubmitting ? 'Відправка...' : 'Відправити замовлення'}
            </button>
          )}
        </div>
      </form>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
